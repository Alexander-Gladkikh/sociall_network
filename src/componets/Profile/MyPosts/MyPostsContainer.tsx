import React from "react";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {actions} from "../../../redux/profile-reducer";
import {ProfilePageType} from "../../../types/types";

const mapStateToProps = (state: AppStateType): ProfilePageType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPostText: string) => dispatch(actions.addPostAC(newPostText)),
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
