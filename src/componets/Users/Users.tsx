import React from "react";
import {Paginator} from "../common/paginator/Paginator";
import {User} from "./User";
import {UserType} from "../../types/types";
import {FilterType} from "../../redux/users-reducer";
import {SearchUsersForm} from "./SearchUsersForm";


type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  onPageChanged: (pageNumber: number) => void
  users: Array<UserType>
  followingInProgress: Array<number>
  onFilterChanged: (filter: FilterType) => void
}

export const Users: React.FC<PropsType> = ({
                                             users,
                                             pageSize,
                                             currentPage,
                                             followingInProgress,
                                             follow,
                                             totalUsersCount,
                                             unfollow,
                                             onPageChanged,
                                             onFilterChanged
                                           }) => {
  return <div>
    <Paginator currentPage={currentPage} onPageChanged={onPageChanged} pageSize={pageSize}
               totalItemCount={totalUsersCount} portionSize={10}/>
    <SearchUsersForm onFilterChanged={onFilterChanged}/>
    {users.map((u) =>
      <User
        user={u}
        followingInProgress={followingInProgress}
        follow={follow}
        unfollow={unfollow}/>
    )}
  </div>
}



