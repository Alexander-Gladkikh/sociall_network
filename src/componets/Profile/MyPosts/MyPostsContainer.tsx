import React from "react";
import {addPostAC, updateNewPostTextAC,} from "../../../App";
import {MyPosts} from "./MyPosts";
import {StoreType} from "../../../App";

type MyPostsPropsType = {
    store: StoreType
}


export const MyPostsContainer: React.FC<MyPostsPropsType> = (props) => {
    let state = props.store.getState();

    const addPost = (text: string) => {
        props.store.dispatch(addPostAC(text));
    }

    const onPostChange = (text: string) => {
        props.store.dispatch(updateNewPostTextAC(text))
    }

    return (
        <>
            <MyPosts updateNewPostText={onPostChange} addPost={addPost} posts={state.profilePage.posts}
                     newPostText={state.profilePage.newPostText}/>
        </>
    )
}