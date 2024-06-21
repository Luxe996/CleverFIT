import { Button, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { registerTC } from '@redux/reducers/auth-reducer';
import { useEffect } from 'react';
import { Path } from '../../../routes/path';
import { useLocation, useNavigate } from 'react-router-dom';
import { authSelector } from '../../../selectors';
import { baseURL } from '@constants/api';
import { Endpoints } from '@constants/endpoint-names';
import { dataTestId } from '@constants/data-test-id';

type RegisterFormType = {
    email: string;
    password: string;
    confirmPass: string;
};

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { statusCode } = useAppSelector(authSelector).authError;
    const { email, password } = useAppSelector(authSelector).regInfo;
    const { isRegister } = useAppSelector(authSelector);

    const onFinish = (values: RegisterFormType) => {
        dispatch(registerTC(values.email, values.password));
    };

    const onGoogleRegister = () => {
        window.location.href = `${baseURL}${Endpoints.Google}`;
    };

    useEffect(() => {
        if (email && statusCode) {
            if (statusCode !== 409) {
                navigate(Path.RESULT.REGISTER_ERROR, { state: { from: location.pathname } });
            } else {
                navigate(Path.RESULT.ERROR_USER_EXIST, { state: { from: location.pathname } });
            }
        }

        if (email && location.state?.from === Path.RESULT.REGISTER_ERROR) {
            dispatch(registerTC(email, password));
        }
    }, [statusCode, navigate, email, password, dispatch, location.state, location.pathname]);

    useEffect(() => {
        isRegister &&
            navigate(Path.RESULT.REGISTER_SUCCESS, { state: { from: location.pathname } });
    }, [isRegister, location.pathname, navigate]);

    return (
        <Form onFinish={onFinish}>
            <div>
                <Form.Item
                    rules={[
                        { required: true, message: '' },
                        { type: 'email', message: '' },
                    ]}
                    name={'email'}
                >
                    <Input
                        addonBefore='e-mail:'
                        size={'large'}
                        data-test-id={dataTestId.registrationEmailInput}
                    />
                </Form.Item>

                <Form.Item
                    name={'password'}
                    rules={[
                        {
                            required: true,
                            message: '',
                        },
                        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ },
                    ]}
                    help={
                        <span style={{ fontSize: '0.75rem' }}>
                            Пароль не менее 8 символов, с заглавной буквой и цифрой
                        </span>
                    }
                >
                    <Input.Password
                        size={'large'}
                        placeholder='Пароль'
                        data-test-id={dataTestId.registrationPasswordInput}
                    ></Input.Password>
                </Form.Item>

                <Form.Item
                    name={'confirmPass'}
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
                        size={'large'}
                        placeholder='Повторите пароль'
                        data-test-id={dataTestId.registrationConfirmInput}
                    ></Input.Password>
                </Form.Item>
            </div>

            <div>
                <Form.Item>
                    <Button
                        htmlType='submit'
                        block
                        type={'primary'}
                        size={'large'}
                        data-test-id={dataTestId.registrationSubmitButton}
                    >
                        Войти
                    </Button>
                </Form.Item>
                <Button
                    block
                    type={'default'}
                    size={'large'}
                    icon={<GooglePlusOutlined />}
                    onClick={onGoogleRegister}
                >
                    Регистрация через Google
                </Button>
            </div>
        </Form>
    );
};
