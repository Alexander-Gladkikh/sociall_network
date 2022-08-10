import React from "react";
import s from './MyPosts.module.css'
import {Posts} from "./Post/Post";

type MyPostsPropsType = {
    posts: any
    newPostText: any
    updateNewPostText: any
    addPost: any
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    let postsElement = props.posts.map((p: any) => <Posts message={p.message}
                                                          countLike={p.countLike}/>)

    let newPostElement: any = React.createRef()

    let addPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }


    return (
        <>
            <div className={`${s.item} ${s.active}`}>My Posts</div>
            <textarea onChange={onPostChange}
                      ref={newPostElement} value={props.newPostText}/>
            <button onClick={addPost}>Add post</button>

            {postsElement}
        </>
    )
}