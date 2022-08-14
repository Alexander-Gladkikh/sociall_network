import React from "react";
import {addPostAC, RootStateType, updateNewPostTextAC,} from "../../../App";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

const mapStateToProps = (state:  AppStateType) => {
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
