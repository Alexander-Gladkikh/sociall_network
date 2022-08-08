import React from 'react';
import './App.css';
import {Header} from "./componets/Header/Header";
import {Navbar} from "./componets/Navbar/Navbar";
import {Profile} from "./componets/Profile/Profile";
import {Dialogs} from "./componets/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NewPosts} from "./componets/NewPosts/NewPosts";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import {RootStateType} from "./redux/state";
import Friends from "./componets/Friends/Friends";

type appPropsType = {
    state: RootStateType
    addPosts: (postMessage: string) => void
}


function App(props: appPropsType) {
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar navBarState={props.state.navBarPage}
                        friendsState={props.state.friendsPage}/>
                <div className={'app-wrapper-content'}>
                    <Routes>
                        <Route  path="/profile/*" element={<Profile posts={props.state.profilePage.posts} addPosts={props.addPosts}/>}/>
                        <Route  path="/dialogs/*" element={<Dialogs dialogsPage={props.state.dialogsPage}/>}/>
                        <Route  path={'/posts/*'} element={<NewPosts/>}/>
                        <Route  path={'/music/*'} element={<Music/>}/>
                        <Route  path={'/settings/*'} element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
