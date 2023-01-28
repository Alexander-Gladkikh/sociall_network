import React, {Suspense, lazy} from 'react';
import './App.css';
import { Route, Routes} from "react-router-dom";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import NavbarContainer from "./componets/Navbar/NavbarContainer";
import UsersContainer from "./componets/Users/UsersContainer";
import {withRouter} from "./componets/Profile/ProfileContainer";
import HeaderContainer from "./componets/Header/HeaderContainer";
import LoginPage from "./componets/login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {Preloader} from "./componets/common/preloader/Preloader";


const DialogsContainer = lazy(() => import('./componets/Dialogs/DialogsContainer'));
const ProfileContainer = lazy(() => import('./componets/Profile/ProfileContainer'));

class App extends React.Component {
    componentDidMount() {

        // @ts-ignore
        this.props.initializeApp()
    }

    render() {
        // @ts-ignore
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
                <div className={'app-wrapper'}>
                    <HeaderContainer/>
                    <NavbarContainer/>
                    <div className={'app-wrapper-content'}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>
                                <Route path="/profile/:profileId" element={<ProfileContainer/>}/>
                                <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                                <Route path="/users/*" element={<UsersContainer/>}/>
                                <Route path='/music/*' element={<Music/>}/>
                                <Route path='/settings/*' element={<Settings/>}/>
                                <Route path='/profile' element={<ProfileContainer/>}/>
                                <Route path='/login' element={<LoginPage/>}/>
                            </Routes>
                        </Suspense>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);



