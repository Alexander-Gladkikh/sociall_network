import {addPostAC, profileReducer} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are yuo?', countLike: 15},
        {id: 2, message: 'It\'s my first post', countLike: 20},
    ],
    newPostText: '',
    profile: null,
    status: ''
}

it('length of posts should be incremented', () => {
    let action = addPostAC('new text')

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})

it('message of new post should be correct', () => {
    let action = addPostAC('new text')

    let newState = profileReducer(state, action)

    expect(newState.posts[2].message).toBe('new text')
})