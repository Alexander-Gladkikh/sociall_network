import React from "react";
import s from './MyPosts.module.css'
import {Posts} from "./Post/Post";
import {PostsType} from "../../../types/types";
import {AddPostFormReduxForm, AddPostFormValuesType} from "./AddPostForm";


type PropsType = {
    addPost: (newPostText: string) => void
    posts: PostsType[]
}



export const MyPosts: React.FC<PropsType> = (props) => {
    const postsElement = [...props.posts]
        .reverse()
        .map((p) => <Posts key={p.id} message={p.message} countLike={p.countLike}/>)

    const addNewPostBody = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return (
        <>
            <div className={`${s.item} ${s.active}`}>My Posts</div>
            <AddPostFormReduxForm onSubmit={addNewPostBody}/>
            {postsElement}
        </>
    )
};

const MyPostMemorized = React.memo(MyPosts)

export default MyPostMemorized


