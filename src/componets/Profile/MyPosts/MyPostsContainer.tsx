import React from "react";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {addPostAC, ProfilePageType, updateNewPostTextAC} from "../../../redux/profile-reducer";

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
