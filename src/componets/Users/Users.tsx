import React, {useEffect} from "react";
import {Paginator} from "../common/paginator/Paginator";
import {User} from "./User";
import {FilterType, requestUsers} from "../../redux/users-reducer";
import {SearchUsersForm} from "./SearchUsersForm";
import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentPage,
  getFilterSearch,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers
} from "../../redux/users-selectors";

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {
  const users = useSelector(getUsers)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const followingInProgress = useSelector(getFollowingInProgress)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const filter = useSelector(getFilterSearch)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter))
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }

  const follow = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

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



