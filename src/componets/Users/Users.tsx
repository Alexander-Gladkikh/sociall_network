import React from 'react';
import {UsersPageType, UsersType} from "../../redux/users-reducer";

type UsersPropsType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: any) => void
}

const Users = (props: UsersPropsType) => {

    return (
        <>
        {props.users.map((u: UsersType) =>
            <div key={u.id}>
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
    </>
    )
}
export default Users;