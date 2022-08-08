import React from "react";
import s from './MyPosts.module.css'
import {PostPropsType, Posts} from "./Post/Post";
import {addPosts} from "../../../redux/state";

type MyPostsPropsType = {
    posts: Array<PostPropsType>
    addPosts: (postMessage: string) => void
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    let newPostElement: any = React.createRef()

    let addText = () => {
        let text: string = newPostElement.current.value
        props.addPosts(text)

    }

    let postsElement = props.posts.map( p => <Posts message={p.message} countLike={p.countLike}/>)
    return (
        <>
            <div className={`${s.item} ${s.active}`}>My Posts</div>
            <textarea ref={newPostElement}></textarea>
            <button onClick={addText}>Add post</button>

            {postsElement}
        </>
    )
}