import React from "react";
import s from './MyPosts.module.css'
import {Posts} from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {PostsType} from "../../../types/types";


type MyPostsPropsType = {
    addPost: (text: string) => void
    posts: PostsType[]
    newPostText: string
}


export const MyPosts = React.memo((props: MyPostsPropsType) => {
    console.log('Render')
    const postsElement = props.posts.map((p) =>
        <Posts
            key={p.id}
            message={p.message}
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
});

const maxLength10 = maxLengthCreator(10)

const AddPostMessage: React.FC = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component={Textarea} placeholder='Add text'
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostMessageRedux = reduxForm({form: 'MyPostsAddMessageBody'})(AddPostMessage)

