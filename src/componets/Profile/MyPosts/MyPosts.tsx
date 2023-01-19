import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Posts} from "./Post/Post";
import {PostsType} from "../../../redux/profile-reducer";
import {Field, reduxForm} from "redux-form";


type MyPostsPropsType = {
    addPost: (text: string) => void
    posts: PostsType[]
    newPostText: string
}


export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    const postsElement = props.posts.map((p) => <Posts key={p.id} message={p.message}
                                                          countLike={p.countLike}/>)

    const addNewPostBody = (values: any) => {
        props.addPost(values.newPostText);
    }

    return (
        <>
            <div className={`${s.item} ${s.active}`}>My Posts</div>
            <AddPostMessageRedux onSubmit={addNewPostBody}/>
            {postsElement}
        </>
    )
}

const AddPostMessage: React.FC = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component='textarea' placeholder='Add text'/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostMessageRedux = reduxForm({form: 'MyPostsAddMessageBody'})(AddPostMessage)

