import React from 'react';
import {FriendsPageType} from "../../redux/state";

type FriendsPropsType = {
    friendsState: FriendsPageType
}

const Friends: React.FC<FriendsPropsType> = (props) => {
    return (
        <div>
            {props.friendsState.friends.map(el => {
                return (
                    <div key={el.id}>
                        <div className={'friendsAvatar'}></div>
                        <div className={'friendsName'}>{el.name}</div>
                    </div>
                )
            })}
        </div>
    );
};

export default Friends;