import {PostsType, ProfilePageType, ActionsTypes} from "./state";

export const profileReducer = (state: ProfilePageType, action: ActionsTypes) => {
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

