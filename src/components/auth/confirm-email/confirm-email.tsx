import { useLocation, useNavigate } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Path } from '../../../routes/path';
import { checkCodeTC } from '@redux/reducers/auth-reducer';
import { authSelector } from '../../../selectors';
import { dataTestId } from '@constants/data-test-id';
import s from './confirm.module.scss';

const { Title, Text } = Typography;

export const ConfirmEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [code, setCode] = useState('');
    const { isCodeValid } = useAppSelector(authSelector);

    const email = sessionStorage.getItem('email');
    const onFinish = (code: string) => {
        email && dispatch(checkCodeTC(email, code));
    };

    useEffect(() => {
        isCodeValid === false && setCode('');
    }, [isCodeValid]);

    useEffect(() => {
        if (location.state?.from !== Path.AUTH) {
            navigate(Path.AUTH);
        }
    }, [isCodeValid, location.state?.from, navigate]);

    useEffect(() => {
        if (isCodeValid === true) {
            navigate(Path.CHANGE_PASSWORD, {
                state: { from: location.pathname },
            });
        }
    }, [isCodeValid, location.pathname, navigate]);

    return (
        <div className={s.confirm}>
            {isCodeValid === false ? (
                <CloseCircleFilled
                    style={{ color: '#ff4d4f', fontSize: '80px', marginBottom: '24px' }}
                />
            ) : (
                <ExclamationCircleFilled className={s.icon} />
            )}

            <Title level={3} className={s.title}>
                {isCodeValid === false ? 'Неверный код. ' : ''}Введите код для восстановления
                аккаунта
            </Title>
            <Text className={s.description}>
                Мы отправили вам на e-mail <b>{email}</b> шестизначный код. Введите его в поле ниже.
            </Text>
            <VerificationInput
                value={code}
                placeholder=''
                inputProps={{ 'data-test-id': dataTestId.verificationInput }}
                classNames={{
                    container: `${s.container}`,
                    character: `${isCodeValid === false ? `${s.error}` : `${s.character}`}`,
                    characterInactive: `${s.inactive}`,
                    characterFilled: `${s.filled}`,
                }}
                onChange={(value) => setCode(value)}
                onComplete={onFinish}
            />
            <Text className={s.description}>Не пришло письмо? Проверьте папку Спам.</Text>
        </div>
    );
};
