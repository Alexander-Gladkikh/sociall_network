import React from "react";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {addPostAC, AppStateType, updateNewPostTextAC} from "../../../redux/redux-store";
import {ProfilePageType} from "../../../redux/profile-reducer";

const mapStateToProps = (state: AppStateType): ProfilePageType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (text: string) => dispatch(addPostAC(text)),
        updateNewPostText: (text: string) => dispatch(updateNewPostTextAC(text))
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
