import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Path } from '../../routes/path';

export const AppLayout = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const googleAuth = params.get('accessToken');
        if (googleAuth) {
            localStorage.setItem('token', googleAuth);
            navigate(Path.MAIN);
        } else {
            navigate(Path.AUTH);
        }
    }, [navigate, params]);

    return <Outlet />;
};
