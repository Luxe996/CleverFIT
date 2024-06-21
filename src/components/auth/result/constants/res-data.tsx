import { ResTypes } from '@components/auth/result/constants/res-types';
import { CheckCircleFilled, CloseCircleFilled, WarningFilled } from '@ant-design/icons';
import { Path } from '../../../../routes/path';
import Error from '@public/error.svg?react';
import { dataTestId } from '@constants/data-test-id';

export const resData: ResTypes = {
    error_login: {
        icon: (
            <WarningFilled style={{ color: '#faad14', fontSize: '80px', marginBottom: '24px' }} />
        ),
        title: 'Вход не выполнен',
        text: 'Что-то пошло не так. Попробуйте еще раз',
        textBtn: 'Повторить',
        pathBtn: Path.AUTH,
        testData: dataTestId.loginRetryButton,
    },
    error_register: {
        icon: (
            <CloseCircleFilled
                style={{ color: '#ff4d4f', fontSize: '80px', marginBottom: '24px' }}
            />
        ),
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        textBtn: 'Повторить',
        pathBtn: Path.REGISTRATION,
        testData: dataTestId.registrationRetryButton,
    },
    success_register: {
        icon: (
            <CheckCircleFilled
                style={{ color: '#52c41a', fontSize: '80px', marginBottom: '24px' }}
            />
        ),
        title: 'Регистрация успешна',
        text: 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
        textBtn: 'Войти',
        pathBtn: Path.AUTH,
        testData: dataTestId.registrationEnterButton,
    },
    error_user_exist: {
        icon: (
            <CloseCircleFilled
                style={{ color: '#ff4d4f', fontSize: '80px', marginBottom: '24px' }}
            />
        ),
        title: 'Данные не сохранились',
        text: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        textBtn: 'Назад к регистрации',
        pathBtn: Path.REGISTRATION,
        testData: dataTestId.registrationBackButton,
    },
    success_change_password: {
        icon: (
            <CheckCircleFilled
                style={{ color: '#52c41a', fontSize: '80px', marginBottom: '24px' }}
            />
        ),
        title: 'Пароль успешно изменен',
        text: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
        textBtn: 'Вход',
        pathBtn: Path.AUTH,
        testData: dataTestId.changeEntryButton,
    },
    error_email_no_exist: {
        icon: (
            <CloseCircleFilled
                style={{ color: '#ff4d4f', fontSize: '80px', marginBottom: '24px' }}
            />
        ),
        title: 'Такой e-mail не зарегистрирован',
        text: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
        textBtn: 'Попробовать снова',
        pathBtn: Path.AUTH,
        testData: dataTestId.checkRetryButton,
    },
    error_check_email: {
        icon: <Error />,
        title: 'Что-то пошло не так',
        text: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
        textBtn: 'Назад',
        pathBtn: Path.AUTH,
        testData: dataTestId.checkBackButton,
    },
    error_change_password: {
        icon: (
            <CloseCircleFilled
                style={{ color: '#ff4d4f', fontSize: '80px', marginBottom: '24px' }}
            />
        ),
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так попробуйте ещё раз.',
        textBtn: 'Повторить',
        pathBtn: Path.CHANGE_PASSWORD,
        testData: dataTestId.changeRetryButton,
    },
};
