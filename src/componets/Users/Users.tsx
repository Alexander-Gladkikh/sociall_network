import React, {useEffect} from "react";
import {Paginator} from "../common/paginator/Paginator";
import {User} from "./User";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer";
import {SearchUsersForm} from "./SearchUsersForm";
import {useSelector} from "react-redux";
import {
  getCurrentPage,
  getFilterSearch,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers
} from "../../redux/users-selectors";
import {useAppDispatch} from "../../hook/hook";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {
  const users = useSelector(getUsers)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const followingInProgress = useSelector(getFollowingInProgress)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const filter = useSelector(getFilterSearch)

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams({term: filter.term, friend: String(filter.friend), page: String(currentPage)})
  }, [filter, currentPage])

  const dispatch = useAppDispatch()

  useEffect(() => {
    const actualTerm = searchParams.get('term')
    const actualFriend = searchParams.get('friend')
    const actualPage = searchParams.get('page')
    const startFilter =  {
      term: actualTerm,
      friend: actualFriend
    }
    let startPage
    Number(actualPage) === 0 ? startPage = 1 : startPage = Number(actualPage)
    actualTerm === null ? startFilter.term = '' : startFilter.term = actualTerm
    dispatch(requestUsers(startPage, pageSize, startFilter as any))
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }

  const followHandler = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollowHandler = (userId: number) => {
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
        follow={followHandler}
        unfollow={unfollowHandler}/>
    )}
  </div>
}



