import { ActionsTypes} from "../App";


export type ProfilePageType = {
    posts: PostsType[]
    newPostText: string
}
export type PostsType = {
    id: number
    message: string
    countLike: number
}

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are yuo?', countLike: 15},
        {id: 2, message: 'It\'s my first post', countLike: 20},
    ],
    newPostText: '',
}

export const profileReducer = (state = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case "ADD-POST":
            let newPost: PostsType = {
                id: new Date().getTime(),
                message: action.postText,
                countLike: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case "UPDATE-NEW-POST-TEXT":
            return {
                ...state,
                newPostText: action.newText
            }
        default :
            return {...state}
    }

}

