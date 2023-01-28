import React from "react";
import {initialStateType} from "../../redux/users-reducer";
import {Paginator} from "../common/paginator/Paginator";
import {User} from "./User";


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    usersPage: initialStateType
    followingInProgress: []
}

export const Users: React.FC<UsersPropsType> = ({
                                                    usersPage, pageSize, currentPage,
                                                    followingInProgress, follow, totalUsersCount, unfollow
                                                    , onPageChanged
                                                }) => {



    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} pageSize={pageSize} totalItemCount={totalUsersCount} portionSize={10}/>
        {usersPage.users.map((u) =>
                <User user={u} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow}/>
        )}
    </div>
}

