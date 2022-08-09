import React from "react";
import s from './MyPosts.module.css'
import { Posts} from "./Post/Post";

type MyPostsPropsType = {
    store: any
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    let newPostElement: any = React.createRef()

    let addText = () => {
        let text: string = newPostElement.current.value
        props.store.setAddPosts(text)

    }

    let postsElement = props.store._state.profilePage.posts.map( (p: any) => <Posts message={p.message} countLike={p.countLike}/>)
    return (
        <>
            <div className={`${s.item} ${s.active}`}>My Posts</div>
            <textarea ref={newPostElement}/>
            <button onClick={addText}>Add post</button>

            {postsElement}
        </>
    )
}