import React from 'react';
import './App.css';
import {Header} from "./componets/Header/Header";
import {Navbar} from "./componets/Navbar/Navbar";
import {Profile} from "./componets/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import {EmptyObject, Store} from "redux";
import DialogsContainer from "./componets/Dialogs/DialogsContainer";

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    navBarPage: NavBarPageType
}
export type ProfilePageType = {
    posts: PostsType[]
    newPostText: string
}
export type PostsType = {
    id: number
    message: string
    countLike: number
}
export type DialogsPageType = {
    messages: MessagesType[]
    dialogs: DialogsType[]
    newMessageBody: string
}
export type DialogsType = {
    id: string
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type FriendsType = {
    id: string
    name: string
}
export type NavBarPageType = {
    titlePage: NavBarType[]
    friends: FriendsType[]
}
export type NavBarType = {
    id: string
    title: string
    link: string
}
export type StoreType = Store<EmptyObject & {profilePage: ProfilePageType, dialogsPage: DialogsPageType, navBarPage: NavBarPageType}, ActionsTypes>

export type ActionsTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof addMessageAC>

export const addPostAC = (text: string) => {
    return {
        type: "ADD-POST",
        postText: text
    } as const
}
export const updateNewPostTextAC = (text: string) => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: text
    } as const
}
export const updateNewMessageBodyAC = (message: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        body: message
    } as const
}
export const addMessageAC = (text: string) => {
    return {
        type: "ADD-MESSAGE",
        textMessage: text
    } as const
}

type appPropsType = {
    store: StoreType
}


function App(props: appPropsType) {
    const state = props.store.getState();
    return (

            <div className={'app-wrapper'}>
                <Header/>
                <Navbar state={state} />
                <div className={'app-wrapper-content'}>
                    <Routes>
                        <Route  path="/profile/*" element={<Profile />}/>
                        <Route  path="/dialogs/*" element={<DialogsContainer/>}/>
                        <Route  path={'/music/*'} element={<Music/>}/>
                        <Route  path={'/settings/*'} element={<Settings/>}/>
                    </Routes>
                </div>
            </div>

    );
}

export default App;
