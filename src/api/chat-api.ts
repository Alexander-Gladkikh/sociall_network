let subscribers = [] as SubscribeType[]

let ws: WebSocket | null = null

const closeHandler = () => {
  console.log('Close WS')
  setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers.forEach(s => s(newMessages))
}

function createChannel() {
  if (ws !== null) {
    ws.removeEventListener('close', closeHandler)
    ws.close()
  }
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
}

export const chatApi = {
  start() {
    createChannel()
  },
  stop() {
    subscribers = []
    if (ws !== null) {
      ws.removeEventListener('close', closeHandler)
      ws.removeEventListener('message', messageHandler)
      ws.close()
    }
  },
  subscribe(callback: SubscribeType) {
    subscribers.push(callback)
    return () => {
      subscribers = subscribers.filter(s => s !== callback)
    }
  },
  unsubscribe(callback: SubscribeType) {
    subscribers = subscribers.filter(s => s !== callback)
  },
  sendMessage(message: string) {
    if (ws !== null) {
      ws.send(message)
    }
  }

}


type SubscribeType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}