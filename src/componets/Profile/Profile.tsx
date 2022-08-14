import React from "react";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {StoreType} from "../../App";


type PostsPropsType = {
    store: StoreType
}


export const Profile: React.FC<PostsPropsType> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}
            />
        </div>
    )
}

// posts={props.profilePage.posts}
// newPostText={props.profilePage.newPostText}
// dispatch={props.dispatch}
// message={props.profilePage.newPostText}