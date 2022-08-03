import React from "react";

import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {PostPropsType} from "./MyPosts/Post/Post";

type PostsPropsType = {
    posts: Array<PostPropsType>
}


export const Profile: React.FC<PostsPropsType> = (props) => { 
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts}/>
        </div>
    )
}