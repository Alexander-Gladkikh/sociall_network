import {PostsType, ProfilePageType, ActionsTypes} from "../App";

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are yuo?', countLike: 15},
        {id: 2, message: 'It\'s my first post', countLike: 20},
    ],
    newPostText: '',
}

export const profileReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case "ADD-POST":
            let newPost: PostsType = {
                id: new Date().getTime(),
                message: action.postText,
                countLike: 0
            }
            state.posts.push(newPost);
            state.newPostText = '';
            return state
        case "UPDATE-NEW-POST-TEXT":
            state.newPostText = action.newText;
            return state
        default :
            return state
    }

}

