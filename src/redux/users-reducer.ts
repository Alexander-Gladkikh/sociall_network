import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {AppThunk, BaseThunkType, InferActionsType} from "./redux-store";
import {usersAPI} from "../api/usersAPI";
import {updateObjectInArray} from "../utils/objects-helpers";
import {APIResponseType} from "../api/api";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0, // нужно 0
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
  filter: {
    term: '',
    friend: null as null | boolean
  }
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
export const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SN/USERS/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
      }
    case 'SN/USERS/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
      }
    case 'SN/USERS/SET-USERS':
      return {
        ...state,
        users: [...action.users]
      }
      case 'SN/USERS/SET-FILTER-USER':
      return {
        ...state,
        filter: action.payload
      }
    case "SN/USERS/SET-CURRENT-PAGE":
      return {...state, currentPage: action.currentPage}
    case "SN/USERS/SET-TOTAL-USER-COUNT":
      return {...state, totalUsersCount: action.count}
    case "SN/USERS/TOGGLE-IS-FETCHING":
      return {...state, isFetching: action.isFetching}
    case "SN/USERS/TOGGLE-IS-FOLLOWING-PROGRESS":
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id: number) => id != action.userId)
      }
    default:
      return {
        ...state
      }
  }

}

export const actions = {
  followSuccess: (userId: number) => {
    return {
      type: 'SN/USERS/FOLLOW',
      userId
    } as const
  },
  unfollowSuccess: (userId: number) => {
    return {
      type: 'SN/USERS/UNFOLLOW',
      userId
    } as const
  },
  setUsers: (users: UserType[]) => {
    return {
      type: 'SN/USERS/SET-USERS',
      users
    } as const
  },
  setCurrentPage: (currentPage: number) => {
    return {
      type: 'SN/USERS/SET-CURRENT-PAGE',
      currentPage
    } as const
  },
  setFilter: (filter: FilterType) => {
    return {
      type: 'SN/USERS/SET-FILTER-USER',
      payload: filter
    } as const
  },
  setTotalUserCount: (count: number) => {
    return {
      type: 'SN/USERS/SET-TOTAL-USER-COUNT',
      count
    } as const
  },
  toggleIsFetching: (isFetching: boolean) => {
    return {
      type: 'SN/USERS/TOGGLE-IS-FETCHING',
      isFetching
    } as const
  },
  toggleFollowingProgress: (isFetching: boolean, userId: number) => {
    return {
      type: 'SN/USERS/TOGGLE-IS-FOLLOWING-PROGRESS',
      isFetching, userId
    } as const
  }
}



export const requestUsers = (page: number, pageSize: number, filter: FilterType): AppThunk =>
   async dispatch => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page))
    dispatch(actions.setFilter(filter))

    const data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUserCount(data.totalCount))
  }


const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number,
                                   apiMethod: (userId: number) => Promise<APIResponseType>,
                                   action: (userId: number) => ActionsTypes) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  const data = await apiMethod(userId)
  if (data.resultCode == 0) {
    dispatch(action(userId))
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): AppThunk => async dispatch => {
     await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), actions.followSuccess)
  }

export const unfollow = (userId: number): AppThunk => async dispatch => {
     await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), actions.unfollowSuccess)
  }


export type ActionsTypes = InferActionsType<typeof actions>
type DispatchType = Dispatch<ActionsTypes>






