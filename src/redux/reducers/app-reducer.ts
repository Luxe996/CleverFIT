const LOADING = 'LOADING';
const ALERT = 'ALERT';

type initialStateType = {
    isLoading: boolean;
    isAlert: string;
};

const initialState: initialStateType = {
    isLoading: false,
    isAlert: '',
};

export const AppReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                isLoading: action.loading,
            };
        }
        case ALERT: {
            return {
                ...state,
                isAlert: action.value,
            };
        }
        default: {
            return state;
        }
    }
};

type ActionType = LoadingAT | AlertAT;
type LoadingAT = ReturnType<typeof loadingAC>;
export const loadingAC = (loading: boolean) => ({ type: LOADING, loading } as const);
type AlertAT = ReturnType<typeof alertAC>;
export const alertAC = (value: string) => ({ type: ALERT, value } as const);
