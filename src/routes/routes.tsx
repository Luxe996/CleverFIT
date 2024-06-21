import { Route, Routes } from 'react-router-dom';

import { ConfirmEmail } from '@components/auth/confirm-email/confirm-email';
import { ChangePassword } from '@components/auth/change-password/change-password';
import { FeedbacksPage } from '@pages/feedbacks-page';
import { AppLayout } from '@components/layout/app-layout';
import { AuthWrapper } from '@pages/auth-wrapper';
import { CalendarPage } from '@pages/calendar-page';
import { MainPage } from '@pages/main-page';
import { MainWrapper } from '@pages/main-wrapper';
import { AuthPage } from '@pages/auth-page';
import { Result } from '@components/auth/result/result';
import { Path } from './path';
import { resData } from '@components/auth/result/constants/res-data';
import { ProfilePage } from '@pages/profile-page';
import { SettingsPage } from '@pages/settings-page';
import { NotFoundPage } from '@pages/not-found-page';
import { TrainingsPage } from '@pages/trainings-page';
import {AchievementsPage} from "@pages/achievements-page";

export const routes = (
    <Routes>
        <Route path={Path.INIT} element={<AppLayout />} />
        <Route element={<AuthWrapper />}>
            <Route path={Path.AUTH} element={<AuthPage />} />
            <Route path={Path.REGISTRATION} element={<AuthPage />} />
            <Route
                path={Path.RESULT.LOGIN_ERROR}
                element={
                    <Result
                        icon={resData.error_login.icon}
                        title={resData.error_login.title}
                        text={resData.error_login.text}
                        textBtn={resData.error_login.textBtn}
                        pathBtn={resData.error_login.pathBtn}
                        testData={resData.error_login.testData}
                    />
                }
            />
            <Route
                path={Path.RESULT.REGISTER_SUCCESS}
                element={
                    <Result
                        icon={resData.success_register.icon}
                        title={resData.success_register.title}
                        text={resData.success_register.text}
                        textBtn={resData.success_register.textBtn}
                        testData={resData.success_register.testData}
                        pathBtn={resData.success_register.pathBtn}
                    />
                }
            />
            <Route
                path={Path.RESULT.REGISTER_ERROR}
                element={
                    <Result
                        icon={resData.error_register.icon}
                        title={resData.error_register.title}
                        text={resData.error_register.text}
                        textBtn={resData.error_register.textBtn}
                        pathBtn={resData.error_register.pathBtn}
                        testData={resData.error_register.testData}
                    />
                }
            />

            <Route
                path={Path.RESULT.ERROR_USER_EXIST}
                element={
                    <Result
                        icon={resData.error_user_exist.icon}
                        title={resData.error_user_exist.title}
                        text={resData.error_user_exist.text}
                        textBtn={resData.error_user_exist.textBtn}
                        pathBtn={resData.error_user_exist.pathBtn}
                        testData={resData.error_user_exist.testData}
                    />
                }
            />
            <Route path={Path.CONFIRM_EMAIL} element={<ConfirmEmail />} />
            <Route path={Path.CHANGE_PASSWORD} element={<ChangePassword />} />
            <Route
                path={Path.RESULT.SUCCESS_CHANGE_PASSWORD}
                element={
                    <Result
                        icon={resData.success_change_password.icon}
                        title={resData.success_change_password.title}
                        text={resData.success_change_password.text}
                        textBtn={resData.success_change_password.textBtn}
                        pathBtn={resData.success_change_password.pathBtn}
                        testData={resData.success_change_password.testData}
                    />
                }
            />
            <Route
                path={Path.RESULT.ERROR_EMAIL_NO_EXIST}
                element={
                    <Result
                        icon={resData.error_email_no_exist.icon}
                        title={resData.error_email_no_exist.title}
                        text={resData.error_email_no_exist.text}
                        textBtn={resData.error_email_no_exist.textBtn}
                        pathBtn={resData.error_email_no_exist.pathBtn}
                        testData={resData.error_email_no_exist.testData}
                    />
                }
            />
            <Route
                path={Path.RESULT.ERROR_CHECK_EMAIL}
                element={
                    <Result
                        icon={resData.error_check_email.icon}
                        title={resData.error_check_email.title}
                        text={resData.error_check_email.text}
                        textBtn={resData.error_check_email.textBtn}
                        pathBtn={resData.error_check_email.pathBtn}
                        testData={resData.error_check_email.testData}
                    />
                }
            />
            <Route
                path={Path.RESULT.ERROR_CHANGE_PASSWORD}
                element={
                    <Result
                        icon={resData.error_change_password.icon}
                        title={resData.error_change_password.title}
                        text={resData.error_change_password.text}
                        textBtn={resData.error_change_password.textBtn}
                        pathBtn={resData.error_change_password.pathBtn}
                        testData={resData.error_change_password.testData}
                    />
                }
            />
        </Route>

        <Route element={<MainWrapper />}>
            <Route path={Path.MAIN} element={<MainPage />} />
            <Route path={Path.FEEDBACKS} element={<FeedbacksPage />} />
            <Route path={Path.CALENDAR} element={<CalendarPage />} />
            <Route path={Path.TRAININGS} element={<TrainingsPage />} />
            <Route path={Path.ACHIEVEMENTS} element={<AchievementsPage />} />
            <Route path={Path.PROFILE} element={<ProfilePage />} />
            <Route path={Path.SETTINGS} element={<SettingsPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Route>
    </Routes>
);
