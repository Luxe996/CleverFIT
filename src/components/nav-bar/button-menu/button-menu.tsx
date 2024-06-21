import { Button } from 'antd';
import { PropsWithChildren } from 'react';
import s from './button-menu.module.scss';
import ExitIcon from '@public/exit-menu.svg?react';
import { loginAC, setTokenAC } from '@redux/reducers/auth-reducer';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { setUserInfoAC, UserInfoType } from '@redux/reducers/user-reducer';

export const ButtonMenu = ({ children }: PropsWithChildren) => {
    const dispatch = useAppDispatch();
    const breakpoint = useBreakpoint();
    const onClick = () => {
        localStorage.removeItem('token');
        dispatch(setTokenAC(''));
        dispatch(loginAC(null, null));
        dispatch(setUserInfoAC({} as UserInfoType));
    };

    return (
        <Button
            block
            style={breakpoint.xs ? {} : { padding: '0 16px' }}
            size={'large'}
            type={'default'}
            icon={<ExitIcon />}
            className={s['button-menu']}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
