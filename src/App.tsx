import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import DialogsContainer from "./componets/Dialogs/DialogsContainer";
import NavbarContainer from "./componets/Navbar/NavbarContainer";
import UsersContainer from "./componets/Users/UsersContainer";
import ProfileContainer, {withRouter} from "./componets/Profile/ProfileContainer";
import HeaderContainer from "./componets/Header/HeaderContainer";
import LoginPage from "./componets/login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {Preloader} from "./componets/common/preloader/Preloader";



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
                    <Routes>
                        <Route path="/profile/:profileId" element={<ProfileContainer/>}/>
                        <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                        <Route path="/users/*" element={<UsersContainer/>}/>
                        <Route path='/music/*' element={<Music/>}/>
                        <Route path='/settings/*' element={<Settings/>}/>
                        <Route path='/profile' element={<ProfileContainer/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                    </Routes>
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
    connect(mapStateToProps, {initializeApp})) (App);



