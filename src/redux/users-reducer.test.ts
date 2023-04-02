import {actions, InitialStateType, usersReducer} from "../redux/users-reducer";


let state: InitialStateType

beforeEach(() => {
  state = {
    users: [
      {
        id: 0, name: 'User 0', followed: false,
        photos: { small: '', large: ''}, status: 'status 0',
        location: {city: '1', country: '1'}
      },
      {
        id: 1, name: 'User 1', followed: false,
        photos: { small: '', large: ''}, status: 'status 1',
        location: {city: '1', country: '1'}
      },
      {
        id: 2, name: 'User 2', followed: true,
        photos: { small: '', large: ''}, status: 'status 2',
        location: {city: '1', country: '1'}
      },
      {
        id: 3, name: 'User 3', followed: true,
        photos: { small: '', large: ''}, status: 'status 3',
        location: {city: '1', country: '1'}
      }
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
  }
})
test('follow success', () => {

  const newState = usersReducer(state, actions.followSuccess(1))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {

  const newState = usersReducer(state, actions.unfollowSuccess(3))

  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()
})