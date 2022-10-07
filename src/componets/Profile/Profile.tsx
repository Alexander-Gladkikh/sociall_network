import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

export const Profile = (props: any) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    )
}
