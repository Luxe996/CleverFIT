import { AppDispatch } from '@redux/configure-store';
import { loadingAC } from '@redux/reducers/app-reducer';
import { settingsApi } from '@constants/api';

const GET_TARIFFS = 'GET_TARIFFS';
const PAY_TARIFFS = 'PAY_TARIFFS';

type PeriodsType = {
    cost: number;
    days: number;
    text: string;
};

export type TariffType = {
    name: string;
    periods: PeriodsType[];
    _id: string;
};

type InitialStateType = {
    tariffs: TariffType[];
    isPay: boolean;
};

const initialState: InitialStateType = {
    tariffs: [],
    isPay: false,
};

export const SettingsReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case GET_TARIFFS: {
            return {
                ...state,
                tariffs: action.tariffs,
            };
        }
        case PAY_TARIFFS: {
            return {
                ...state,
                isPay: action.isPay,
            };
        }
        default: {
            return state;
        }
    }
};

type ActionType = GetTariffsAT | PayTariffsAT;
type GetTariffsAT = ReturnType<typeof getTariffsAC>;
const getTariffsAC = (tariffs: TariffType[]) => ({ type: GET_TARIFFS, tariffs } as const);
export const getTariffsTC = () => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await settingsApi
        .getTariffs()
        .then((res) => {
            dispatch(getTariffsAC(res.data));
            dispatch(loadingAC(false));
        })
        .catch((rej) => {
            console.error('Данные ошибки:', rej.data);
            dispatch(loadingAC(false));
        });
};

type PayTariffsAT = ReturnType<typeof payTariffsAC>;
export const payTariffsAC = (isPay: boolean) => ({ type: PAY_TARIFFS, isPay } as const);
export const PayTariffsTC = (id: string, days: number) => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await settingsApi
        .payTariff(id, days)
        .then(() => {
            dispatch(payTariffsAC(true));
            dispatch(loadingAC(false));
        })
        .catch((rej) => {
            console.error('Данные ошибки:', rej.data);
            dispatch(loadingAC(false));
        });
};
