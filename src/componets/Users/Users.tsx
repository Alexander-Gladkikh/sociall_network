import React from 'react';
import {UsersPageType, UsersType} from "../../redux/users-reducer";

type UsersPropsType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: any) => void
}

const Users = (props: UsersPropsType) => {
    if(props.users.length === 0){
        props.setUsers([
            {
                id: 1,
                fullName: 'Dmitry',
                followed: false,
                status: 'I am a boss',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 2,
                fullName: 'Sasha',
                followed: true,
                status: 'I am a boss too',
                location: {city: 'Moscow', country: 'Russia'}
            },
            {
                id: 3,
                fullName: 'Andrey',
                followed: false,
                status: 'I am a boss too',
                location: {city: 'Kiev', country: 'Ukraine'}
            },
        ])
    }

    return <div>

        {props.users.map((u: UsersType) =>
            <div key={u.id}> )
                <div>
                    <img/>
                    {u.followed
                    ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
                    : <button onClick={() => props.follow(u.id)}>Follow</button>}
                </div>
                <div>
                    <div>
                        <span>{u.fullName}</span>
                        <span>{u.status}</span>
                    </div>
                    <div>
                        <span>{u.location.country}</span>
                        <span>{u.location.city}</span>
                    </div>
                </div>
            </div>
        )}
    </div>
}
export default Users;