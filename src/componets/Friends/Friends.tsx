import React from 'react';
import {FriendsPageType} from "../../store";

type FriendsPropsType = {
    friendsState: FriendsPageType
}

const Friends: React.FC<FriendsPropsType> = (props) => {
    return (
        <div>
            {props.friendsState.friends.map(el => {
                return (
                    <>
                        <div className={'friendsAvatar'}></div>
                        <div className={'friendsName'}>{el.name}</div>
                    </>
                )
            })}
        </div>
    );
};

export default Friends;