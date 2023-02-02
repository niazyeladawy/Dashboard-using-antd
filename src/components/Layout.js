import React, { useContext, useEffect, useState } from 'react'
import Home from '../pages/Home/Home';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    LineChartOutlined,
    LeftOutlined,
    RightOutlined,
    UserOutlined,
    LogoutOutlined,
    DownOutlined,
    BoldOutlined
} from '@ant-design/icons';
import { Avatar, Button, Drawer, Dropdown, Layout, Menu, notification, theme } from 'antd';
import routerLinks from './routerLinks';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import './layout.scss'
import LoginPage from '../pages/login/LoginPage';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import AuthContext from '../context/auth/AuthContext';
import UserContext from '../context/auth/UserProvider';

import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }) => {
    let { pathname } = useLocation();
    const [routeInSidebar, setRouteInSidebar] = useState(false);
    const { logout } = useContext(AuthContext);
    const { user, firestoreUser, setFirestoreUser } = useContext(UserContext);
    const getUserImage = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setFirestoreUser(docSnap.data())
        } else {
            // doc.data() will be undefined in this case
        }
    }




    const [collapsed, setCollapsed] = useState(true);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    let mainLinks = [
        {
            key: '1',
            icon: <HomeOutlined />,
            path: routerLinks.homePage,
            label: 'Home',
        },
        {
            key: '3',
            icon: <BoldOutlined />,
            path: routerLinks.productsPage,
            label: 'Products',
        },
        {
            key: '5',
            icon: <FontAwesomeIcon icon={faUsers} />,
            path: routerLinks.buyersPage,
            label: 'Buyers',
        },
        {
            key: '6',
            icon: <FontAwesomeIcon icon={faCalendarCheck} />,
            path: routerLinks.calendarPage,
            label: 'Calendar',
        },
        {
            key: '4',
            icon: <UserOutlined />,
            path: routerLinks.usersPage,
            label: 'Users',
        }
    ]

    const renderMainLinks = () => {
        return mainLinks.map((link) => (
            <Menu.Item
                size="large"
                key={link.key}
                icon={link.icon}
                className={slugify(pathname) === slugify(link.path) ? 'ant-menu-item-selected' : ''}
                onClick={() => setCollapsed(!collapsed)}
            >
                <NavLink to={link.path}>{link.label}</NavLink>
            </Menu.Item>
        ))
    }

    const renderMainLinksWithoutActive = () => {
        return mainLinks.map((link) => (
            <Menu.Item
                size="large"
                key={link.key}
                icon={link.icon}
                className=""
            >
                <NavLink to={link.path}>{link.label}</NavLink>
            </Menu.Item>
        ))
    }

    const navigate = useNavigate()


    const handleSignout = () => {
        signOut(auth).then(

            () => {
                notification.success({
                    message: 'success',
                    description: ' successfully signed out ',
                    duration: 4,
                })
                localStorage.removeItem('firebaseRemember')
                logout();
                navigate(routerLinks.loginPage)
            }
        ).catch((e) => {
            notification.error({
                message: 'error',
                description: 'invalid Credintials',
                duration: 4,
            });
        })
    }

    useEffect(() => {
        getUserImage()
    }, []);

    
    useEffect(() => {
        const isSelected = mainLinks.find(link => slugify(pathname) === slugify(link.path))
        if (isSelected) {
            setRouteInSidebar(true)
        }
        else {
            setRouteInSidebar(false)
        }

    }, [pathname])




    return (
        <div className='Layout'>
            {
                pathname === routerLinks.loginPage ? <Layout>{children}</Layout> : (
                    <Layout>
                        <Sider 
                            id='main_sidebar'
                            theme='light' className={collapsed ? "collapsed" : "not_collapsed"}   >
                            
                            <Menu
                                theme="light"
                                mode="inline"
                            >
                                {routeInSidebar ? renderMainLinks() : renderMainLinksWithoutActive()}

                            </Menu>
                        </Sider>

                        <Layout className="site-layout">
                            <Header

                                // className={collapsed ? 'w-100' : ""}
                                style={{
                                    padding: 0,
                                    background: colorBgContainer,
                                    display: 'flex',
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 999,
                                    width: '100%',
                                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
                                }}
                            >
                                <div className='d-flex justify-content-between align-items-center leaft_header_container'>
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                        className: 'trigger',
                                        onClick: () => setCollapsed(!collapsed),
                                    })}
                                    <div className="logo me-2" >
                                        <span style={{ fontSize: '1rem' }}>Dashboard</span>
                                    </div>
                                  

                                </div>

                                <div className="avatar-wrapper">
                                    <Dropdown
                                        trigger={['click']}
                                        overlay={
                                            <Menu>
                                                <Menu.Item key='1' icon={<UserOutlined />}>
                                                    <Link to={routerLinks.profilePage}>Profile</Link>
                                                </Menu.Item>
                                                <Menu.Item key='2' icon={<LogoutOutlined />}>
                                                    <a onClick={handleSignout}>SignOut</a>
                                                </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button className="profile-menu-btn" type="text">
                                            <DownOutlined />
                                            <span className="user-name" style={{ marginRight: "10px" }}>{firestoreUser?.username ? firestoreUser.username : user.email}</span>
                                            <Avatar size={38} icon={<UserOutlined />} src={firestoreUser?.img} />
                                        </Button>
                                    </Dropdown>
                                </div>
                            </Header>
                            <Content
                                id='main_content'
                                style={{
                                    minHeight: 280,
                                    background: colorBgContainer,
                                }}
                            >
                                {children}
                            </Content>
                        </Layout>
                    </Layout>
                )
            }

        </div>
    )
}

export default AppLayout