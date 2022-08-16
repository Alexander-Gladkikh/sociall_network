import React from 'react';
import './App.css';
import {Header} from "./componets/Header/Header";
import {Profile} from "./componets/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import DialogsContainer from "./componets/Dialogs/DialogsContainer";
import NavbarContainer from "./componets/Navbar/NavbarContainer";
import Users from "./componets/Users/Users";
import UsersContainer from "./componets/Users/UsersContainer";


function App() {
    return (
            <div className={'app-wrapper'}>
                <Header/>
                <NavbarContainer/>
                <div className={'app-wrapper-content'}>
                    <Routes>
                        <Route  path="/profile/*" element={<Profile />}/>
                        <Route  path="/dialogs/*" element={<DialogsContainer/>}/>
                        <Route  path="/users/*" element={<UsersContainer/>}/>
                        <Route  path={'/music/*'} element={<Music/>}/>
                        <Route  path={'/settings/*'} element={<Settings/>}/>
                    </Routes>
                </div>
            </div>

    );
}

export default App;
