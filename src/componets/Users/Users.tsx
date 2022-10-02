import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import axios from 'axios'
import userPhoto from '../../assets/images/pngtree-users-vector-icon-png-image_3725294.jpg'

const Users = (props: UsersPropsType) => {

    const getUsers = () => {
        if (props.usersPage.users.length === 0) {

            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            })

        }
    }




    return (
        <>
            <button onClick={getUsers}>GET USERS</button>
            {props.usersPage.users.map((u) =>
                <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                 style={{width: '60px', height: '60px', borderRadius: '50%'}}/>
                        </div>

                        {u.followed
                            ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
                            : <button onClick={() => props.follow(u.id)}>Follow</button>}
                    </span>
                    <div>
                        <div>
                            <span>{u.name}</span>
                            <span>{u.status}</span>
                        </div>
                        <div>
                            <span>{"u.location.country"}</span>
                            <span>{"u.location.city"}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default Users;