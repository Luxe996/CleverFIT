import { AppDispatch } from '@redux/configure-store';
import { alertAC, loadingAC } from '@redux/reducers/app-reducer';
import { userApi } from '@constants/api';
import { FormType } from '@pages/profile-page/profile-page';
import { AlertData } from '@constants/alert-data';

const USER_INFO = 'USER_INFO';
const SET_SUCCESS = 'SET_SUCCESS';

type TariffType = {
    tariffId: string;
    expired: string;
};

export type UserInfoType = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff: TariffType;
};
type InitialStateType = {
    userInfo: UserInfoType;
    isSaveSuccess: boolean | null;
};
const initialState: InitialStateType = {
    userInfo: {} as UserInfoType,
    isSaveSuccess: null,
};

export const UserReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case USER_INFO: {
            return {
                ...state,
                userInfo: action.info,
            };
        }
        case SET_SUCCESS: {
            return {
                ...state,
                isSaveSuccess: action.isSaveSuccess,
            };
        }
        default: {
            return state;
        }
    }
};

type ActionType = SetUserInfoAT | isSuccessAT;
//Get user info
type SetUserInfoAT = ReturnType<typeof setUserInfoAC>;
export const setUserInfoAC = (info: UserInfoType, isSaveSuccess?: boolean) =>
    ({ type: USER_INFO, info, isSaveSuccess } as const);
export const getUserInfoTC = () => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await userApi
        .getUserInfo()
        .then((res) => {
            dispatch(setUserInfoAC(res.data));
            dispatch(loadingAC(false));
        })
        .catch((rej) => {
            console.error('Данные ошибки:', rej.data);
            dispatch(loadingAC(false));
        });
};

//UpdateUserInfo
export const updateUserInfoTC = (data: FormType) => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await userApi
        .uploadUserInfo(data)
        .then((res) => {
            dispatch(setUserInfoAC(res.data));
            dispatch(loadingAC(false));
            dispatch(alertAC(AlertData.updateUserInfo));
        })
        .catch((rej) => {
            console.error('Данные ошибки:', rej.data);
            dispatch(isSuccessAC(false));
            dispatch(loadingAC(false));
        });
};

type isSuccessAT = ReturnType<typeof isSuccessAC>;
export const isSuccessAC = (isSaveSuccess: boolean | null) =>
    ({ type: SET_SUCCESS, isSaveSuccess } as const);
