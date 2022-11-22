import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import DialogsContainer from "./componets/Dialogs/DialogsContainer";
import NavbarContainer from "./componets/Navbar/NavbarContainer";
import UsersContainer from "./componets/Users/UsersContainer";
import ProfileContainer from "./componets/Profile/ProfileContainer";
import HeaderContainer from "./componets/Header/HeaderContainer";
import LoginPage from "./componets/login/Login";
import {Dialogs} from "./componets/Dialogs/Dialogs";


function App() {
    return (
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <NavbarContainer/>
                <div className={'app-wrapper-content'}>
                    <Routes>
                        <Route  path="/profile/:profileId" element={<ProfileContainer />}/>
                        <Route  path="/dialogs/*" element={<DialogsContainer/>}/>
                        <Route  path="/users/*" element={<UsersContainer/>}/>
                        <Route  path={'/music/*'} element={<Music/>}/>
                        <Route  path={'/settings/*'} element={<Settings/>}/>
                        <Route path='/profile' element={<ProfileContainer />} />
                        <Route path='/login' element={<LoginPage />} />
                    </Routes>
                </div>
            </div>

    );
}

export default App;
