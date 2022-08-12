import React from 'react';
import './App.css';
import {Header} from "./componets/Header/Header";
import {Navbar} from "./componets/Navbar/Navbar";
import {Profile} from "./componets/Profile/Profile";
import {Dialogs} from "./componets/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import { store, StoreType} from "./redux/state";


type appPropsType = {
    store: StoreType
}


function App(props: appPropsType) {
    const state = props.store.getState();
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar state={state} />
                <div className={'app-wrapper-content'}>
                    <Routes>
                        <Route  path="/profile/*" element={<Profile profilePage={state.profilePage}
                                                                    dispatch={props.store.dispatch.bind(store)}/>}/>
                        <Route  path="/dialogs/*" element={<Dialogs state={state} dispatch={props.store.dispatch.bind(store)}/>}/>
                        <Route  path={'/music/*'} element={<Music/>}/>
                        <Route  path={'/settings/*'} element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
