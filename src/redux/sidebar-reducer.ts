export type FriendsType = {
    id: string
    name: string
}
export type NavBarType = {
    id: string
    title: string
    link: string
}

type initialStateType = typeof initialState

let initialState = {
    titlePage: [
        {id: '1', title: 'Profile', link: '/profile'},
        {id: '2', title: 'Message', link: '/dialogs'},
        {id: '3', title: 'New Posts', link: '/posts'},
        {id: '4', title: 'Music', link: '/music'},
        {id: '5', title: 'Settings', link: '/settings'},
        {id: '6', title: 'Friends', link: '/friends'},
        {id: '7', title: 'Users', link: '/users'},
    ] as Array<NavBarType>,
    friends: [
        {id: '1', name: 'Andrew'},
        {id: '2', name: 'Sasha'},
        {id: '3', name: 'Sveta'},
    ] as Array<FriendsType>
}



export const navbarReducer = (state = initialState, action:  any): initialStateType => {

    return {...state}
}