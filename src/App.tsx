import React, {lazy, Suspense} from 'react';
import './App.css';
import {withRouter} from "./componets/Profile/ProfileContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {Preloader} from "./componets/common/preloader/Preloader";
import {RootState} from "./redux/redux-store";
import {Avatar, Breadcrumb, Col, Layout, Menu, Row} from "antd";
import {Link, NavLink, Route, Routes} from "react-router-dom";
import {UsersPage} from "./componets/Users/UsersContainer";
import {Settings} from "./componets/Settings/Settings";
import Login from "./componets/login/Login";
import {Music} from "./componets/Music/Music";
import {UserOutlined} from '@ant-design/icons';
import {Header} from "./componets/Header/Header";

const {SubMenu} = Menu
const {Content, Sider} = Layout;

const DialogsContainer = lazy(() => import('./componets/Dialogs/DialogsContainer'));
const ProfileContainer = lazy(() => import('./componets/Profile/ProfileContainer'));
const ChatPage = lazy(() => import('./componets/pages/Chat/ChatPage'));


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
    //ts-ignore
    if (!this.props.initialized) {
      return <Preloader/>
    }

    return (
      <Layout>
        <Header/>
        <Layout>
          <Sider width={200} style={{background: "cyan"}}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              // defaultOpenKeys={['sub1']}
              style={{height: '100%', borderRight: 0}}
            >
              <SubMenu key='sub1' icon={<UserOutlined/>} title='My Profile'>
                <Menu.Item key='1'><Link to='/profile'>Profile</Link></Menu.Item>
                <Menu.Item key='2'><Link to='/dialogs'>Messages</Link></Menu.Item>
              </SubMenu>
              <SubMenu key='sub2' icon={<UserOutlined/>} title='Developers'>
                <Menu.Item key='3'><Link to='/users'>Developers</Link></Menu.Item>
                <Menu.Item key='3'><Link to='/chat'>Chat</Link></Menu.Item>

              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{padding: '0 24px 24px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: "cyan",
              }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/profile/:profileId" element={<ProfileContainer/>}/>
                  <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                  <Route path="/users/*" element={<UsersPage/>}/>
                  <Route path='/music/*' element={<Music/>}/>
                  <Route path='/settings/*' element={<Settings/>}/>
                  <Route path='/profile' element={<ProfileContainer/>}/>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/chat' element={<ChatPage/>}/>
                </Routes>
              </Suspense>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  initialized: state.app.initialized
})

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);



