import { Portal } from '@components/portal/portal';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Alert } from 'antd';
import s from './custom-alert.module.scss';
import { appSelector } from '../../../selectors';
import { dataTestId } from '@constants/data-test-id';
import { alertAC } from '@redux/reducers/app-reducer';
import { AlertData } from '@constants/alert-data';

export const CustomAlert = () => {
    const dispatch = useAppDispatch();
    const { isAlert } = useAppSelector(appSelector);
    if (!isAlert.length) {
        return null;
    }
    let testID;
    if (isAlert === AlertData.updateUserInfo) {
        testID = dataTestId.alert;
    } else {
        testID = dataTestId.alertTrainingSuccess;
    }

    return (
        <Portal>
            <div className={s.container}>
                <Alert
                    data-test-id={testID}
                    className={s.alert}
                    message={isAlert}
                    type='success'
                    showIcon={true}
                    closable={true}
                    onClose={() => dispatch(alertAC(''))}
                />
            </div>
        </Portal>
    );
};
