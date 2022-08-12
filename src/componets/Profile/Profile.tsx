import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, ProfilePageType} from "../../redux/state";

type PostsPropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes) => void
}


export const Profile: React.FC<PostsPropsType> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch}
                     message={props.profilePage.newPostText}
            />
        </div>
    )
}