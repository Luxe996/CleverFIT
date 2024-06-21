import axios from 'axios';
import { Endpoints } from '@constants/endpoint-names';
import { ExerciseType, ParametersType } from '@redux/reducers/calendar-reducer';
import { FormType } from '@pages/profile-page/profile-page';
import { store } from '@redux/configure-store';

export const baseURL = 'https://marathon-api.clevertec.ru';
export const getImageURL = 'https://training-api.clevertec.ru/';

export const instance = axios.create({
    baseURL,
    withCredentials: true,
});

const urlsSkipAuth = [
    Endpoints.auth.login,
    Endpoints.auth.register,
    Endpoints.auth.checkCode,
    Endpoints.auth.checkEmail,
    Endpoints.auth.setNewPass,
];

instance.interceptors.request.use(async (config) => {
    if (config.url && urlsSkipAuth.includes(config.url)) {
        return config;
    }

    const token = localStorage.getItem('token') || store.getState().auth?.storeToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authApi = {
    login(email: string, password: string) {
        return instance.post(Endpoints.auth.login, {
            email,
            password,
        });
    },
    register(email: string, password: string) {
        return instance.post(Endpoints.auth.register, {
            email,
            password,
        });
    },
    checkEmail(email: string) {
        return instance.post(Endpoints.auth.checkEmail, {
            email,
        });
    },
    checkCode(email: string, code: string) {
        return instance.post(Endpoints.auth.checkCode, {
            email,
            code,
        });
    },
    setNewPass(password: string, confirmPassword: string) {
        return instance.post(Endpoints.auth.setNewPass, {
            password,
            confirmPassword,
        });
    },
};
export const feedbacksApi = {
    getFeedbacks() {
        return instance.get(Endpoints.feedBacks);
    },
    postFeedbacks(rating: number, message: string) {
        return instance.post(Endpoints.feedBacks, {
            message,
            rating,
        });
    },
};
export const calendarApi = {
    getTrainings() {
        return instance.get(Endpoints.calendar.training);
    },
    getCatalog() {
        return instance.get(Endpoints.calendar.catalog);
    },
    createTraining(
        name: string,
        date: string,
        exercises: ExerciseType[],
        parameters?: ParametersType,
    ) {
        return instance.post(Endpoints.calendar.training, {
            name,
            date,
            exercises,
            parameters,
        });
    },
    editTraining(
        name: string,
        date: string,
        exercises: ExerciseType[],
        _id: string,
        isImplementation: boolean,
        parameters?: ParametersType,
    ) {
        return instance.put(`${Endpoints.calendar.training}/${_id}`, {
            name,
            date,
            exercises,
            isImplementation,
            parameters,
        });
    },
};
export const userApi = {
    getUserInfo() {
        return instance.get(Endpoints.user.me);
    },
    uploadUserInfo(data: FormType) {
        return instance.put(Endpoints.user.user, data);
    },
};

export const settingsApi = {
    getTariffs() {
        return instance.get(Endpoints.catalogs);
    },
    getCurrentTariff() {
        return instance.get(Endpoints.tariffs.getCurrentTariff);
    },
    payTariff(tariffId: string, days: number) {
        return instance.post(Endpoints.tariffs.payTariff, {
            tariffId,
            days,
        });
    },
};

export const trainingApi = {
    getPartners() {
        return instance.get(Endpoints.trainings.getPartners);
    },
    getJointPartners(training?: string) {
        let url = Endpoints.trainings.getJointPartners;
        if (training) {
            url += `?trainingType=${training}`;
        }
        return instance.get(url);
    },
    sendInvite(to: string, trainingId: string) {
        return instance.post(Endpoints.trainings.invite, {
            to,
            trainingId,
        });
    },
    getInvites() {
        return instance.get(Endpoints.trainings.invite);
    },
    sendResponse(id: string, status: string) {
        return instance.put(Endpoints.trainings.invite, {
            id,
            status,
        });
    },
    deleteTraining(id: string) {
        return instance.delete(`${Endpoints.trainings.invite}/${id}`);
    },
};
