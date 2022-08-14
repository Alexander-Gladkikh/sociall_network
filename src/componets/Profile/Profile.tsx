import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

export const Profile = () => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
}

// posts={props.profilePage.posts}
// newPostText={props.profilePage.newPostText}
// dispatch={props.dispatch}
// message={props.profilePage.newPostText}