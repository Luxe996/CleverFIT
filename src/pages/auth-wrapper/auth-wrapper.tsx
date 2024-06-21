import { useEffect } from 'react';
import s from './auth-wrapper.module.scss';
import { Card, Layout } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector } from '../../selectors';
import { loginAC } from '@redux/reducers/auth-reducer';
import { Path } from '../../routes/path';
import { Outlet, useNavigate } from 'react-router-dom';

const { Content } = Layout;
export const AuthWrapper = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { storeToken } = useAppSelector(authSelector);

    const token = localStorage.getItem('token') || storeToken;

    useEffect(() => {
        if (token) {
            dispatch(loginAC(true, null));
            navigate(Path.MAIN);
        }
    }, [dispatch, navigate, token]);

    return (
        <>
            <div className={s.wrapper}>
                {!token && (
                    <Content>
                        <Card className={s.card}>
                            <Outlet />
                        </Card>
                    </Content>
                )}
            </div>
        </>
    );
};
