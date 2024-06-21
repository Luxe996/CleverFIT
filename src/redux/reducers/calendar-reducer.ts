import { AppDispatch } from '@redux/configure-store';
import { alertAC, loadingAC } from '@redux/reducers/app-reducer';
import { calendarApi } from '@constants/api';
import { AlertData } from '@constants/alert-data';

const GET_TRAINING = 'GET_TRAINING';
const GET_CATALOG = 'GET_CATALOG';
const SET_NEW_TRAINING = 'SET_NEW_TRAINING';
const SET_EDIT_TRAINING = 'SET_EDIT_TRAINING';
const NEW_TRAINING = 'CREATE_TRAINING';
const EDIT_TRAINING = 'EDIT_TRAINING';
const NEW_TRAINING_ERROR = 'CREATE_TRAINING_ERROR';
const IS_LOADING = 'IS_LOADING';

const RESET_STATE = 'RESET_STATE';

export type ExerciseInputType = Omit<ExerciseType, '_id'>;

export type ParametersType = {
    repeat: boolean;
    period: number | null;
    jointTraining: boolean;
    participants: string[];
};
export type ExerciseType = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
    _id?: string;
};
export type TrainingType = {
    name: string;
    date: string;
    exercises: ExerciseType[];
    _id?: string;
    isImplementation?: boolean;
    userId?: string;
    parameters?: ParametersType;
};
export type CatalogType = {
    name: string;
    key: string;
};

export type NewTrainingType = Omit<
    TrainingType,
    '_id' | 'isImplementation' | 'userId' | 'parameters'
> | null;
type InitialStateType = {
    trainings: TrainingType[] | null;
    catalogList: CatalogType[];
    isTrainingsError: boolean | null;
    isCatalogError: boolean | null;
    editTraining: TrainingType | null;
    newTraining: NewTrainingType;
    createError: boolean | null;
    isLoading: boolean;
};

const initialState: InitialStateType = {
    trainings: null,
    isTrainingsError: null,
    catalogList: [] as CatalogType[],
    isCatalogError: null,
    editTraining: null,
    newTraining: null,
    createError: null,
    isLoading: false,
};
export const CalendarReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case RESET_STATE: {
            return {
                ...state,
                isTrainingsError: null,
                isCatalogError: null,
                createError: null,
            };
        }
        case GET_TRAINING: {
            return {
                ...state,
                trainings: action.trainings,
                isTrainingsError: action.error,
            };
        }
        case GET_CATALOG: {
            return {
                ...state,
                catalogList: action.values,
                isCatalogError: action.error,
            };
        }
        case SET_NEW_TRAINING: {
            return {
                ...state,
                newTraining: action.training,
            };
        }
        case SET_EDIT_TRAINING: {
            return {
                ...state,
                editTraining: action.training,
            };
        }
        case NEW_TRAINING: {
            return {
                ...state,
                trainings: [...state.trainings, action.training],
            };
        }
        case EDIT_TRAINING: {
            const updatedTrainings = state.trainings.map((t) =>
                t._id === action._id
                    ? {
                          ...t,
                          exercises: action.training.exercises,
                          parameters: action.training.parameters,
                          isImplementation: action.training.isImplementation,
                      }
                    : t,
            );
            return {
                ...state,
                trainings: updatedTrainings,
            };
        }
        case NEW_TRAINING_ERROR: {
            return {
                ...state,
                createError: action.error,
            };
        }
        case IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading,
            };
        }
        default: {
            return state;
        }
    }
};

type ActionType =
    | ResetStateAT
    | GetTrainingAT
    | CatalogAT
    | SetNewTrainingAT
    | SetEditTrainingAT
    | NewTrainingAT
    | EditTrainingAT
    | NewNewTrainingErrorAT
    | SetLoadingAT;
type ResetStateAT = ReturnType<typeof ResetStateAC>;
export const ResetStateAC = () => ({ type: RESET_STATE });
// Get Trainings
type GetTrainingAT = ReturnType<typeof getTrainingAC>;
const getTrainingAC = (trainings: TrainingType[] | null, error: boolean | null) =>
    ({ type: GET_TRAINING, trainings, error } as const);
export const getTrainingTC = () => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await calendarApi
        .getTrainings()
        .then((res) => {
            dispatch(getTrainingAC(res.data, false));
            dispatch(loadingAC(false));
        })
        .catch(() => {
            dispatch(getTrainingAC(null, true));
            dispatch(loadingAC(false));
        });
};
// Get trainings names
type CatalogAT = ReturnType<typeof catalogAC>;
const catalogAC = (values: CatalogType[] | null, error: boolean | null) =>
    ({ type: GET_CATALOG, values, error } as const);
export const catalogTC = () => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await calendarApi
        .getCatalog()
        .then((res) => {
            dispatch(catalogAC(res.data, false));
            dispatch(loadingAC(false));
        })
        .catch(() => {
            dispatch(catalogAC(null, true));
            dispatch(loadingAC(false));
        });
};

//Set Edit Training
type SetEditTrainingAT = ReturnType<typeof setEditTrainingAC>;
export const setEditTrainingAC = (training: TrainingType | null) =>
    ({ type: SET_EDIT_TRAINING, training } as const);

//Set New Training
type SetNewTrainingAT = ReturnType<typeof setNewTrainingAC>;
export const setNewTrainingAC = (training: NewTrainingType | null) =>
    ({ type: SET_NEW_TRAINING, training } as const);

//set loading
type SetLoadingAT = ReturnType<typeof setLoadingAC>;
const setLoadingAC = (isLoading: boolean) => ({ type: IS_LOADING, isLoading } as const);

//Create training
type NewTrainingAT = ReturnType<typeof newTrainingAC>;
const newTrainingAC = (training: TrainingType | null) =>
    ({ type: NEW_TRAINING, training } as const);

type NewNewTrainingErrorAT = ReturnType<typeof newTrainingErrorAC>;
const newTrainingErrorAC = (error: boolean | null) =>
    ({ type: NEW_TRAINING_ERROR, error } as const);

export const createTrainingTC =
    (newTraining: TrainingType, isAlert: boolean) => async (dispatch: AppDispatch) => {
        const { name, date, exercises, parameters } = newTraining;
        dispatch(loadingAC(true));
        await calendarApi
            .createTraining(name, date, exercises, parameters)
            .then((res) => {
                dispatch(newTrainingErrorAC(null));
                dispatch(newTrainingAC(res.data));
                dispatch(loadingAC(false));
                if (isAlert) {
                    dispatch(alertAC(AlertData.newTraining));
                }
            })
            .catch(() => {
                dispatch(newTrainingErrorAC(true));
                dispatch(loadingAC(false));
            });
    };
// Edit training
type EditTrainingAT = ReturnType<typeof editTrainingAC>;
const editTrainingAC = (training: TrainingType, _id: string) =>
    ({ type: EDIT_TRAINING, training, _id } as const);
export const editTrainingTC =
    (editedTraining: TrainingType, isAlert: boolean) => async (dispatch: AppDispatch) => {
        const { name, date, exercises, _id, parameters, isImplementation } = editedTraining;
        dispatch(setLoadingAC(true));
        await calendarApi
            .editTraining(name, date, exercises, _id, isImplementation, parameters)
            .then((res) => {
                dispatch(newTrainingErrorAC(null));
                if (res.data) {
                    dispatch(editTrainingAC(res.data, _id));
                } else {
                    dispatch(getTrainingTC());
                }
                dispatch(setLoadingAC(false));
                if (isAlert) {
                    dispatch(alertAC(AlertData.updateTraining));
                }
            })
            .catch(() => {
                dispatch(newTrainingErrorAC(true));
                dispatch(setLoadingAC(false));
            });
    };
