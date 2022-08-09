export type RootStateType= {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    friendsPage: FriendsPageType
    navBarPage: NavBarPageType
}
export type ProfilePageType = {
    posts: PostsType[]
}
export type PostsType = {
    message: string
    countLike: number
}
export type DialogsPageType = {
    messages: MessagesType[]
    dialogs: DialogsType[]
}
export type DialogsType = {
    id: string
    name: string
}
export type MessagesType = {
    message: string
}
export type FriendsPageType = {
    friends: FriendsType[]
}
export type FriendsType = {
    id: string
    name: string
}
export type NavBarPageType = {
    titlePage: NavBarType[]
}
export type NavBarType = {
    id: string
    title: string
    link: string
}


export let store = {
    _state: {
        profilePage: {
            posts: [
                {message: 'Hi, how are yuo?', countLike: 15},
                {message: 'It\'s my first post', countLike: 20},
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            messages: [
                {message: 'Hi'},
                {message: 'How is your it-kamasutra'},
                {message: 'Yo'},
            ],
            dialogs: [
                {id: '1', name: 'Dimych'},
                {id: '2', name: 'Andrey'},
                {id: '3', name: 'Sveta'},
                {id: '4', name: 'Sasha'},
                {id: '5', name: 'Victor'},
                {id: '6', name: 'Valera'},
            ]
        },
        friendsPage: {
            friends: [
                {id: '1', name: 'Andrew'},
                {id: '2', name: 'Sasha'},
                {id: '3', name: 'Sveta'},
            ]
        },
        navBarPage: {
            titlePage: [
                {id: '1', title: 'Profile', link: '/profile'},
                {id: '2', title: 'Message', link: '/dialogs'},
                {id: '3', title: 'New Posts', link: '/posts'},
                {id: '4', title: 'Music', link: '/music'},
                {id: '5', title: 'Settings', link: '/settings'},
                {id: '6', title: 'Friends', link: '/friends'},
            ]
        }
    },
    rerenderEntireTree() {
        console.log('State changed')
    },
    addPost(postMessage: string) {
        const newPost = {message: postMessage, countLike: 0 }
        this._state.profilePage.posts.push(newPost)
        this._subscriber()
    },
    updateNewPostText(newText: string) {
        state.profilePage.newPostText = newText;
        rerenderEntireTree(state);
    },
    _subscriber() {
        console.log('no subscribers (observers)')
    },
}

export default store

//window.store = store;
// store._state


