import React from "react";
import s from './MyPosts.module.css'
import {PostPropsType, Posts} from "./Post/Post";

type MyPostsPropsType = {
    posts: Array<PostPropsType>
}



export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    let postsElement = props.posts.map( p => <Posts message={p.message} countLike={p.countLike}/>)

    return (
        <>
            <div className={`${s.item} ${s.active}`}>My Posts</div>
            <textarea></textarea>
            <button>Add post</button>

            {postsElement}
        </>
    )
}