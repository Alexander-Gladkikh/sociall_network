import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/pngtree-users-vector-icon-png-image_3725294.jpg";
import {initialStateType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    usersPage: initialStateType
}

export const Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        {pages.map(p => <span className={props.currentPage === p ? s.selectedPage : ''}
                              onClick={() => props.onPageChanged(p)}>{p}</span>)}

        {props.usersPage.users.map((u) =>
            <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                 style={{width: '60px', height: '60px', borderRadius: '50%'}}/>
                                </NavLink>
                        </div>

                        {u.followed
                            ? <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/unfollow/${u.id}`,
                                    {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": "4cbc2eb2-7280-4c19-b411-06affe5406dc"
                                        }
                                    }
                                ).then(response => {
                                    if (response.data.resultCode == 0) {
                                        props.unfollow(u.id)
                                    }
                                })
                            }

                            }>Unfollow</button>
                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/unfollow/${u.id}`, {},
                                    {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": "4cbc2eb2-7280-4c19-b411-06affe5406dc"
                                        }
                                    }
                                ).then(response => {
                                    if (response.data.resultCode == 0) {
                                        props.follow(u.id)
                                    }
                                })
                            }

                            }>Follow</button>}
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
    </div>
}