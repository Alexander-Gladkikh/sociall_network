import React, {lazy, Suspense} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Music} from "./componets/Music/Music";
import {Settings} from "./componets/Settings/Settings";
import NavbarContainer from "./componets/Navbar/NavbarContainer";
import {UsersPage} from "./componets/Users/UsersContainer";
import {withRouter} from "./componets/Profile/ProfileContainer";
import HeaderContainer from "./componets/Header/HeaderContainer";
import LoginPage from "./componets/login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {Preloader} from "./componets/common/preloader/Preloader";
import {RootState} from "./redux/redux-store";


const DialogsContainer = lazy(() => import('./componets/Dialogs/DialogsContainer'));
const ProfileContainer = lazy(() => import('./componets/Profile/ProfileContainer'));


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
class App extends React.Component<MapPropsType & DispatchPropsType> {

    catchAllUnhandledErrors = (e: Event) => {
        alert('Some error occured')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandlerejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandlerejection', this.catchAllUnhandledErrors)
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
                                <Route path="/users/*" element={<UsersPage/>}/>
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

const mapStateToProps = (state: RootState) => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);



