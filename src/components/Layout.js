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
import { Avatar, Button, Dropdown, Layout, Menu, notification, theme } from 'antd';
import routerLinks from './routerLinks';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import './layout.css'
import LoginPage from '../pages/login/LoginPage';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import AuthContext from '../context/auth/AuthContext';
import UserContext from '../context/auth/UserProvider';


import { doc, getDoc } from "firebase/firestore";


const { Header, Sider, Content } = Layout;




const AppLayout = ({ children }) => {
    let { pathname } = useLocation();
    const { logout } = useContext(AuthContext);
    const { user } = useContext(UserContext);

    const [porfileImage, setporfileImage] = useState(null);

    const getUserImage = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().img);
            setporfileImage(docSnap.data().img)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    console.log("user", user)

    const [collapsed, setCollapsed] = useState(false);
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
            key: '2',
            icon: <LineChartOutlined />,
            path: routerLinks.chartsPage,
            label: 'Charts',
        },
        {
            key: '3',
            icon: <BoldOutlined />,
            path: routerLinks.productsPage,
            label: 'Products',
        },
        {
            key: '4',
            icon: <UserOutlined />,
            path: routerLinks.usersPage,
            label: 'Users',
        },
    ]

    const renderMainLinks = () => {
        return mainLinks.map((link) => (
            <Menu.Item key={link.key} icon={link.icon} className={slugify(pathname) === slugify(link.path) ? 'ant-menu-item-selected' : ''} >
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


    return (
        <div className='Layout'>
            {
                pathname === routerLinks.loginPage ? <Layout>{children}</Layout> : (
                    <Layout>
                        <Sider trigger={null} collapsible
                            theme='light' collapsed={collapsed} style={{
                                minHeight: '100vh'
                            }}>
                            <div className="logo" />
                            <Menu
                                theme="light"
                                mode="inline"
                            >{renderMainLinks()}</Menu>
                        </Sider>
                        <Layout className="site-layout">
                            <Header
                                style={{
                                    padding: 0,
                                    background: colorBgContainer,
                                    display: 'flex',
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: () => setCollapsed(!collapsed),
                                })}
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
                                            {/* {loadingSignout ? <LoadingOutlined /> : <DownOutlined />} */}
                                            <DownOutlined />
                                            <span className="user-name" style={{ marginRight: "10px" }}>{user?.email}</span>
                                            <Avatar size={38} icon={<UserOutlined />} src={porfileImage} />
                                        </Button>
                                    </Dropdown>
                                </div>
                            </Header>
                            <Content
                                style={{
                                    margin: '24px 16px',
                                    padding: 24,
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