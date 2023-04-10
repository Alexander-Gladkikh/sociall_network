const subscribers = {
  'messages-received': [] as MessagesReceivedSubscribeType[],
  'status-changed': [] as StatusChangedSubscribeType[]
}

let ws: WebSocket | null = null
type EventsNamesType = 'messages-received' | 'status-changed'

const closeHandler = () => {
  notifySubscribersAboutStatus('pending')
  setTimeout(createChannel, 3000)
}

const openHandler = () => {
  notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
  notifySubscribersAboutStatus('error')
  console.error('REFRESH PAGE')
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers['messages-received'].forEach(s => s(newMessages))
}

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers["status-changed"].forEach(s => s(status))
}

function createChannel() {
  if (ws !== null) {
    ws.removeEventListener('close', closeHandler)
    ws.removeEventListener('message', messageHandler)
    ws.removeEventListener('open', openHandler)
    ws.removeEventListener('error', errorHandler)
    ws.close()
  }
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifySubscribersAboutStatus('pending')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}

export const chatApi = {
  start() {
    createChannel()
  },
  stop() {
    subscribers["messages-received"] = []
    subscribers["status-changed"] = []
    if (ws !== null) {
      ws.removeEventListener('close', closeHandler)
      ws.removeEventListener('message', messageHandler)
      ws.close()
    }
  },
  subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscribeType | StatusChangedSubscribeType) {
    // @ts-ignore
    subscribers[eventName].push(callback)
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    }
  },
  unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscribeType | StatusChangedSubscribeType) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
  },
  sendMessage(message: string) {
    if (ws !== null) {
      ws.send(message)
    }
  }

}


type MessagesReceivedSubscribeType = (messages: ChatMessageType[]) => void
type StatusChangedSubscribeType = (status: StatusType) => void

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

export type StatusType = 'pending' | 'ready' | 'error';