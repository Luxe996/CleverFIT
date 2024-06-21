import { Button, Form, Input, Typography } from 'antd';
import { changePassTC, resetStoreAC } from '@redux/reducers/auth-reducer';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../../routes/path';
import { authSelector } from '../../../selectors';
import { dataTestId } from '@constants/data-test-id';
import s from './change.module.scss';

const { Title } = Typography;

export type ChangePasswordFormType = {
    password: string;
    confirmPassword: string;
};

export const ChangePassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { isChanged } = useAppSelector(authSelector);
    const { pass, confPass } = useAppSelector(authSelector).recInfo;

    const onFinish = (values: ChangePasswordFormType) => {
        dispatch(changePassTC(values.password, values.confirmPassword));
    };

    useEffect(() => {
        if (
            location.state?.from !== Path.CONFIRM_EMAIL &&
            location.state?.from !== Path.RESULT.ERROR_CHANGE_PASSWORD
        ) {
            navigate(Path.AUTH);
        }
    }, [location.state?.from, navigate]);

    useEffect(() => {
        if (isChanged) {
            navigate(Path.RESULT.SUCCESS_CHANGE_PASSWORD);
            dispatch(resetStoreAC());
        } else {
            isChanged === false && navigate(Path.RESULT.ERROR_CHANGE_PASSWORD);
        }
    }, [dispatch, isChanged, navigate]);

    useEffect(() => {
        if (pass && confPass) {
            dispatch(changePassTC(pass, confPass));
        }
    }, [confPass, dispatch, pass]);

    return (
        <Form className={s.form} initialValues={{ remember: true }} onFinish={onFinish}>
            <Title level={3} className={s.title}>
                Восстановление аккаунта
            </Title>
            <Form.Item
                name='password'
                help={
                    <span style={{ fontSize: '12px' }}>
                        Пароль не менее 8 символов, с заглавной буквой и цифрой
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: '',
                    },
                    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ },
                ]}
            >
                <Input.Password
                    type='password'
                    placeholder='Пароль'
                    data-test-id={dataTestId.changePasswordInput}
                />
            </Form.Item>
            <Form.Item
                name='confirmPassword'
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: 'Пароли не совпадают',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Пароли не совпадают'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    type='password'
                    placeholder='Повторите пароль'
                    data-test-id={dataTestId.changeConfirmInput}
                />
            </Form.Item>

            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        type='primary'
                        data-test-id={dataTestId.changeSubmitButton}
                        htmlType='submit'
                        className={s.button}
                    >
                        Сохранить
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};
