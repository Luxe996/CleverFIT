import { Layout } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useEffect, useState } from 'react';
import { Path } from '../../routes/path';
import s from './main-wrapper.module.scss';
import { Logo } from '@components/logo/logo';
import { NavBar } from '@components/nav-bar';
import { Switcher } from '@components/nav-bar/switcher';
import { ButtonMenu } from '@components/nav-bar/button-menu/button-menu';
import { authSelector } from '../../selectors';
import { getUserInfoTC } from '@redux/reducers/user-reducer';
import { userSelector } from '../../selectors/selectors';
import { AppHeader } from '@components/layout/app-header';
import { loginAC } from '@redux/reducers/auth-reducer';
import { getInvitesTC } from '@redux/reducers/trainigs-reducer.ts';

export const MainWrapper = () => {
    const dispatch = useAppDispatch();
    const { xs } = useBreakpoint();
    const navigate = useNavigate();
    const { isAuth, storeToken } = useAppSelector(authSelector);
    const { userInfo } = useAppSelector(userSelector);

    const [collapsed, setCollapsed] = useState(false);
    const collapseHandler = () => setCollapsed((pervState) => !pervState);

    const { Sider } = Layout;
    const token = localStorage.getItem('token') || storeToken;

    useEffect(() => {
        if (!isAuth && !token) {
            navigate(Path.AUTH);
        } else {
            Object.keys(userInfo).length === 0 && dispatch(getUserInfoTC());
            dispatch(loginAC(true, null));
            dispatch(getInvitesTC());
        }
    }, [dispatch, isAuth, navigate, token, userInfo]);
    useEffect(() => {
        setCollapsed(!!xs);
    }, [xs]);

    return (
        <>
            {isAuth && (
                <Layout className={s.container}>
                    <Sider
                        className={s.sider}
                        width={`${xs ? 106 : 208}`}
                        collapsedWidth={`${xs ? 0 : 64}`}
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                    >
                        <Logo isCollapsed={collapsed} />
                        <NavBar setCollapsed={setCollapsed} />
                        <Switcher isCollapsed={collapsed} onSwitch={collapseHandler} />
                        <ButtonMenu>{collapsed ? '' : 'Выход'}</ButtonMenu>
                    </Sider>
                    <Layout>
                        <AppHeader />
                        <Outlet />
                    </Layout>
                </Layout>
            )}
        </>
    );
};
