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


type appPropsType = {
    state: any
    addPost: any
    updateNewPostText: any
}


function App(props: appPropsType) {
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar state={props.state} />
                <div className={'app-wrapper-content'}>
                    <Routes>
                        <Route  path="/profile/*" element={<Profile profilePage={props.state.profilePage}
                                                                    addPost={props.addPost}
                                                                    updateNewPostText={props.updateNewPostText}/>}/>
                        <Route  path="/dialogs/*" element={<Dialogs state={props.state}/>}/>
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
