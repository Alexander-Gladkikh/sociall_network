import React from "react";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/pngtree-users-vector-icon-png-image_3725294.jpg";

type UserPropsType = {
    user: any
    followingInProgress: []
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User: React.FC<UserPropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
                <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                 style={{width: '60px', height: '60px', borderRadius: '50%'}}/>
                                </NavLink>
                        </div>

                    {user.followed
                        ? <button disabled={followingInProgress.some((id: any) => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }

                        }>Unfollow</button>
                        : <button disabled={followingInProgress.some((id: any) => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}>Follow</button>}
                    </span>
            <div>
                <div>
                    <span>{user.name}</span>
                    <span>{user.status}</span>
                </div>
                <div>
                    <span>{"u.location.country"}</span>
                    <span>{"u.location.city"}</span>
                </div>
            </div>
        </div>
    )
}