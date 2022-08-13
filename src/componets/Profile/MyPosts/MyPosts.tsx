import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Posts} from "./Post/Post";
import {ActionsTypes, addPostAC, PostsType, updateNewPostTextAC,} from "../../../redux/state";

type MyPostsPropsType = {
    posts: PostsType[]
    newPostText: string
    dispatch: (action: ActionsTypes) => void
    message: string
}


export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    const postsElement = props.posts.map((p) => <Posts key={p.id} message={p.message}
                                                          countLike={p.countLike}/>)

    const addPost = () => {

        props.dispatch(addPostAC(props.message));
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewPostTextAC(e.currentTarget.value))
    }

    return (
        <>
            <div className={`${s.item} ${s.active}`}>My Posts</div>
            <textarea  value={props.message} onChange={onPostChange}
            />
            <button onClick={addPost}>Add post</button>

            {postsElement}
        </>
    )
}