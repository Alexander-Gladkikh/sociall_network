import React from 'react';
import {FriendsType} from "../../redux/navbar-reducer";


type FriendsPropsType = {
    friendsState: FriendsType[]
}

const Friends: React.FC<FriendsPropsType> = (props) => {
    return (
        <div>
            {props.friendsState.map(el => {
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