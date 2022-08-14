import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Posts} from "./Post/Post";
import {PostsType} from "../../../App";

type MyPostsPropsType = {
    updateNewPostText: (text: string) => void
    addPost: (text: string) => void
    posts: PostsType[]
    newPostText: string
}


export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    const postsElement = props.posts.map((p) => <Posts key={p.id} message={p.message}
                                                          countLike={p.countLike}/>)

    const addPost = () => {
        props.addPost(props.newPostText);
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)
    }

    return (
        <>
            <div className={`${s.item} ${s.active}`}>My Posts</div>
            <textarea  value={props.newPostText} onChange={onPostChange}
            />
            <button onClick={addPost}>Add post</button>

            {postsElement}
        </>
    )
}