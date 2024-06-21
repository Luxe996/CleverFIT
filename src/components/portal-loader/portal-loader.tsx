import { Portal } from '@components/portal/portal';
import s from './portal-loader.module.scss';
import Lottie from 'lottie-react';
import loader from './loader.json';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appSelector } from '../../selectors';
import { useEffect } from 'react';
import { dataTestId } from '@constants/data-test-id';

export const PortalLoader = () => {
    const { isLoading } = useAppSelector(appSelector);

    useEffect(() => {
        window.scroll(0, 0);
        document.body.style.overflow = isLoading ? 'hidden' : '';
    }, [isLoading]);

    if (!isLoading) {
        return null;
    }

    return (
        <Portal>
            <div className={s.loader}>
                <Lottie
                    className={s.spin}
                    animationData={loader}
                    style={{ width: '150px' }}
                    loop
                    data-test-id={dataTestId.loader}
                />
            </div>
        </Portal>
    );
};
