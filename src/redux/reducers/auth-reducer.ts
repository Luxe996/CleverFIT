import { AppDispatch } from '@redux/configure-store';
import { loadingAC } from '@redux/reducers/app-reducer';
import { authApi } from '@constants/api';

const RESET_STORE = 'RESET_STORE';
const LOGIN = 'LOGIN';
const SET_TOKEN = 'SET_TOKEN';
const REGISTER = 'REGISTER';
const CHECK_EMAIL = 'CHECK_EMAIL';
const CHECK_CODE = 'CHECK_CODE';
const CHANGE_PASS = 'CHANGE_PASS';

type initialState = {
    isRegister: boolean;
    isAuth: boolean | null;
    isCheckSuccess: boolean;
    regInfo: {
        email: string | null;
        password: string | null;
    };
    authError: {
        statusCode: number | null;
        message: string | null;
    };
    isCodeValid: boolean | null;
    isChanged: boolean | null;
    recInfo: {
        pass: string | null;
        confPass: string | null;
    };
    storeToken: string;
};

const initialState: initialState = {
    isRegister: false,
    isAuth: null,
    regInfo: {
        email: null,
        password: null,
    },
    isCheckSuccess: false,
    authError: {
        statusCode: null,
        message: null,
    },
    isCodeValid: null,
    isChanged: null,
    recInfo: {
        pass: null,
        confPass: null,
    },
    storeToken: '',
};

export const AuthReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case RESET_STORE: {
            return {
                ...state,
                isRegister: false,
                recEmail: null,
                authError: {
                    statusCode: null,
                },
                isChanged: null,
                isCodeValid: null,
            };
        }

        case LOGIN: {
            return {
                ...state,
                isAuth: action.isAuth,
                authError: {
                    statusCode: action.statusCode,
                },
            };
        }

        case SET_TOKEN: {
            return {
                ...state,
                storeToken: action.token,
            };
        }
        case REGISTER: {
            return {
                ...state,
                isRegister: action.isRegister,
                regInfo: {
                    email: action.email,
                    password: action.password,
                },
                authError: {
                    statusCode: action.statusCode,
                },
            };
        }
        case CHECK_EMAIL: {
            return {
                ...state,
                isCheckSuccess: action.isCheckSuccess,
                authError: {
                    statusCode: action.statusCode,
                    message: action.message,
                },
            };
        }
        case CHECK_CODE: {
            return {
                ...state,
                isCodeValid: action.code,
            };
        }
        case CHANGE_PASS: {
            return {
                ...state,
                isChanged: action.isChanged,
                recInfo: {
                    pass: action.pass,
                    confPass: action.confPass,
                },
            };
        }

        default: {
            return state;
        }
    }
};

type ActionType =
    | LoginAT
    | SetTokenAT
    | ResetStoreAT
    | RegisterAT
    | CheckEmailAT
    | CheckCodeAT
    | ChangePassAT;

//Reset Store
type ResetStoreAT = ReturnType<typeof resetStoreAC>;
export const resetStoreAC = () => ({ type: RESET_STORE });
//Login
type LoginAT = ReturnType<typeof loginAC>;
export const loginAC = (isAuth: boolean | null, statusCode?: number | null) =>
    ({ type: LOGIN, isAuth, statusCode } as const);
export const loginTC =
    (email: string, password: string, remember?: boolean) => async (dispatch: AppDispatch) => {
        dispatch(loadingAC(true));
        await authApi
            .login(email, password)
            .then((res) => {
                remember
                    ? localStorage.setItem('token', res.data.accessToken)
                    : dispatch(setTokenAC(res.data ? res.data.accessToken : res.accessToken));
                dispatch(loginAC(true, null));
                dispatch(loadingAC(false));
            })
            .catch((rej) => {
                dispatch(loginAC(false, rej.response.status));
                dispatch(loadingAC(false));
            });
    };
// Set Token
type SetTokenAT = ReturnType<typeof setTokenAC>;
export const setTokenAC = (token: string) => ({ type: SET_TOKEN, token } as const);
//Registration
type RegisterAT = ReturnType<typeof registerAC>;
const registerAC = (
    isRegister: boolean,
    statusCode: number | null,
    email: string | null,
    password: string | null,
) =>
    ({
        type: REGISTER,
        isRegister,
        statusCode,
        email,
        password,
    } as const);
export const registerTC = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await authApi
        .register(email, password)
        .then(() => {
            dispatch(registerAC(true, null, null, null));
            dispatch(loadingAC(false));
        })
        .catch((rej) => {
            dispatch(registerAC(false, rej.response.status, email, password));
            dispatch(loadingAC(false));
        });
};

//Check Email
type CheckEmailAT = ReturnType<typeof checkEmailAC>;
const checkEmailAC = (isCheckSuccess: boolean, statusCode: number | null, message: string | null) =>
    ({ type: CHECK_EMAIL, isCheckSuccess, statusCode, message } as const);
export const checkEmailTC = (email: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await authApi
        .checkEmail(email)
        .then(() => {
            dispatch(checkEmailAC(true, null, null));
            dispatch(loadingAC(false));
        })
        .catch((rej) => {
            dispatch(checkEmailAC(false, rej.response.status, rej.response.data.message));
            dispatch(loadingAC(false));
        });
};

//Check Code
type CheckCodeAT = ReturnType<typeof checkCodeAC>;
const checkCodeAC = (code: boolean) => ({ type: CHECK_CODE, code } as const);
export const checkCodeTC = (email: string, code: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await authApi
        .checkCode(email, code)
        .then(() => {
            dispatch(checkCodeAC(true));
            dispatch(loadingAC(false));
        })
        .catch(() => {
            dispatch(checkCodeAC(false));
            dispatch(loadingAC(false));
        });
};

//Change Password
type ChangePassAT = ReturnType<typeof changePassAC>;
const changePassAC = (isChanged: boolean, pass?: string, confPass?: string) =>
    ({ type: CHANGE_PASS, isChanged, pass, confPass } as const);
export const changePassTC = (pass: string, confPass: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await authApi
        .setNewPass(pass, confPass)
        .then(() => {
            dispatch(changePassAC(true));
            dispatch(loadingAC(false));
        })
        .catch(() => {
            dispatch(changePassAC(false, pass, confPass));
            dispatch(loadingAC(false));
        });
};
