import {
    BoldOutlined, DownOutlined, HomeOutlined, LogoutOutlined, MenuFoldOutlined,
    MenuUnfoldOutlined, UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, notification, Select, theme } from 'antd';
import { signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import AuthContext from '../context/auth/AuthContext';
import UserContext from '../context/auth/UserProvider';
import { auth, db } from './firebase';
import './layout.scss';
import routerLinks from './routerLinks';
import { FiUsers } from 'react-icons/fi';
import { SlCalender } from 'react-icons/sl';
import { MdProductionQuantityLimits } from 'react-icons/md';

import { doc, getDoc } from "firebase/firestore";
import LanguageContext from '../context/language/LanguageProvider';
import { changeLanguage } from 'i18next';
import { useTranslation } from 'react-i18next';
const { Header, Sider, Content } = Layout;



const AppLayout = ({ children }) => {

    let { pathname } = useLocation();

    const [routeInSidebar, setRouteInSidebar] = useState(false);

    const { logout } = useContext(AuthContext);
    const { user, firestoreUser, setFirestoreUser } = useContext(UserContext);
    const { appLang, setAppLang } = useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    

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
            label: t('sidebar.home'),
        },
        {
            key: '3',
            icon: <MdProductionQuantityLimits />,
            path: routerLinks.productsPage,
            label: t('sidebar.products'),
        },
        {
            key: '5',
            icon: <FiUsers />,
            path: routerLinks.buyersPage,
            label: t('sidebar.buyers'),
        },
        {
            key: '6',
            icon: <SlCalender />,
            path: routerLinks.calendarPage,
            label: t('sidebar.calendar'),
        },
        {
            key: '4',
            icon: <UserOutlined />,
            path: routerLinks.usersPage,
            label: t('sidebar.users'),
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

    const handleLanguageChange = (value) => {
        setAppLang(value)
        localStorage.setItem('lang', value)
        changeLanguage(value)
    };

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
                                    zIndex: 920,
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
                                        <Link to={routerLinks.homePage}><span style={{ fontSize: '1rem', color: '#000' }}>{t('title')}</span></Link>
                                    </div>
                                </div>

                                <div className='d-flex align-items-center'>
                                    <Select
                                        className='languageSelector'
                                        defaultValue={appLang}
                                        onChange={handleLanguageChange}
                                        style={{
                                            width: 100,
                                        }}
                                        options={[
                                            {
                                                value: 'en',
                                                label: 'English',
                                            },
                                            {
                                                value: 'ar',
                                                label: 'عربي',
                                            },
                                        ]}
                                    />
                                    <div className="avatar-wrapper " style={i18n.dir() === "ltr" ? {marginLeft:"15px"} : {marginRight:"15px"}}>
                                        <Dropdown
                                            className='avatar-dropdown'
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
                                </div>
                            </Header>
                            <Content
                                id='main_content'
                                style={{
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