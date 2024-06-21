import { Button, DatePicker, Form, Input, Layout } from 'antd';
import { CustomUpload } from '@components/custom-upload/custom-upload';
import { locale } from '@constants/locale';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { userSelector } from '../../selectors/selectors';
import { useEffect, useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import moment, { Moment } from 'moment';
import { dayFormat } from '@constants/date';
import { updateUserInfoTC } from '@redux/reducers/user-reducer';
import { dataTestId } from '@constants/data-test-id';
import { formatSelectDate } from '@utils/format-select-date';
import { ErrorModal } from '@components/modals/error-modal';
import s from './profile-page.module.scss';

export type FormType = {
    email?: string;
    firstName?: string;
    lastName?: string;
    birthday?: Moment | string;
    password?: string;
    confirmPassword?: string;
    readyForJointTraining?: boolean;
    sendNotification?: boolean;
};

export const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const { xs } = useBreakpoint();
    const { userInfo } = useAppSelector(userSelector);

    const [form] = Form.useForm();

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isImageError, setIsImageError] = useState(false);

    const [formData, setFormData] = useState<FormType>({
        email: '',
        firstName: '',
        lastName: '',
        birthday: '',
        password: '',
        confirmPassword: '',
    });

    const onSave = (data: FormType) => {
        const { birthday } = formData;
        let fullData = {
            ...data,
            birthday,
        };
        if (fullData.password === '') {
            fullData = {
                ...fullData,
                password: undefined,
            };
        }
        dispatch(updateUserInfoTC(fullData));
        setIsButtonDisabled(true);
    };

    useEffect(() => {
        setFormData(userInfo);
        form.setFieldsValue(userInfo);
    }, [form, userInfo]);

    return (
        <Layout className={s.container}>
            <Form
                layout='vertical'
                form={form}
                initialValues={userInfo}
                onFinish={onSave}
                onValuesChange={() => setIsButtonDisabled(false)}
            >
                <Form.Item label='Личная информация' style={{ marginBottom: xs ? '36px' : '40px' }}>
                    <div className={s.info}>
                        <Form.Item name='imgSrc' data-test-id={dataTestId.profileAvatar}>
                            <CustomUpload
                                setIsButtonDisabled={setIsButtonDisabled}
                                newAvatar={(url) => form.setFieldsValue({ imgSrc: url })}
                                modalError={setIsImageError}
                            />
                        </Form.Item>
                        <div>
                            <Form.Item
                                name='firstName'
                                style={{ marginBottom: '16px', width: '100%' }}
                            >
                                <Input
                                    placeholder='Имя'
                                    value={formData.firstName}
                                    data-test-id={dataTestId.profileNameInput}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            firstName: e.target.value.trim(),
                                        });
                                    }}
                                />
                            </Form.Item>

                            <Form.Item name='lastName' style={{ marginBottom: '16px' }}>
                                <Input
                                    placeholder='Фамилия'
                                    value={formData.lastName}
                                    data-test-id={dataTestId.profileSurnameInput}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            lastName: e.target.value.trim(),
                                        });
                                    }}
                                />
                            </Form.Item>

                            <DatePicker
                                format={dayFormat}
                                placeholder='Дата рождения'
                                locale={locale}
                                style={{ width: '100%' }}
                                value={formData.birthday ? moment.utc(formData.birthday) : null}
                                data-test-id='profile-birthday'
                                onChange={(date) => {
                                    setFormData({
                                        ...formData,
                                        birthday: formatSelectDate(date),
                                    });
                                    setIsButtonDisabled(false);
                                }}
                            />
                        </div>
                    </div>
                </Form.Item>
                <Form.Item label='Приватность и авторизация'>
                    <Form.Item name='email' rules={[{ type: 'email', message: '' }]}>
                        <Input
                            style={{ marginBottom: '32px' }}
                            addonBefore='e-mail:'
                            value={formData.email}
                            data-test-id='profile-email'
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    email: e.target.value.trim(),
                                });
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        rules={[{ pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ }]}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        style={{ marginBottom: '46px' }}
                    >
                        <Input.Password
                            placeholder='Пароль'
                            data-test-id='profile-password'
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    password: e.target.value.trim(),
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name='confirmPassword'
                        dependencies={['password']}
                        style={{ marginBottom: xs ? '50px' : '54px' }}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value && getFieldValue('password')) {
                                        return Promise.reject(new Error('Пароли не совпадают'));
                                    }
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            data-test-id='profile-repeat-password'
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    confirmPassword: e.target.value.trim(),
                                });
                            }}
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={isButtonDisabled}
                        data-test-id='profile-submit'
                    >
                        Сохранить изменения
                    </Button>
                </Form.Item>
            </Form>
            <ErrorModal
                title={
                    isImageError
                        ? 'Файл слишком большой'
                        : 'При сохранении данных произошла ошибка '
                }
                description={
                    isImageError
                        ? 'Выберите файл размером до 5 МБ.'
                        : 'Придётся попробовать ещё раз'
                }
                dataTestContent={dataTestId.modalErrorUserTrainingTitle}
                dataTestDescription={dataTestId.modalErrorUserTrainingSubtitle}
                dataTestButton={dataTestId.bigFileErrorClose}
                isImageError={isImageError}
                setIsImageError={setIsImageError}
            />
        </Layout>
    );
};
