import React from "react";
import {MapDispatchType, MapPropsType, MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {RootState} from "../../../redux/redux-store";
import {actions} from "../../../redux/profile-reducer";

const mapStateToProps = (state: RootState) => {
    return {
        posts: state.profilePage.posts,
    }
}

const MyPostsContainer = connect<MapPropsType, MapDispatchType, {}, RootState>(mapStateToProps, {addPost: actions.addPostAC})(MyPosts)

export default MyPostsContainer
