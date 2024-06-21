import { AppDispatch } from '@redux/configure-store.ts';
import { loadingAC } from '@redux/reducers/app-reducer.ts';
import { calendarApi, trainingApi } from '@constants/api.ts';
import { ExerciseType, TrainingType } from '@redux/reducers/calendar-reducer.ts';

const GET_PARTNERS = 'GET_PARTNERS';
const GET_JOINT_PARTNERS = 'GET_JOINT_PARTNERS';
const GET_INVITES = 'GET_INVITES';
const SET_ERROR = 'SET_ERROR';
const SET_RESPONSE = 'SET_RESPONSE';
const SEND_INVITE = 'SEND_INVITE';
const DELETE_TRAINING = 'DELETE_TRAINING';
export type PartnerType = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: string | null;
    avgWeightInWeek: number;
    inviteId: string | null;
    status: string | null;
};
export type InviteType = {
    _id: string;
    from: {
        _id: string;
        firstName: string | null;
        lastName: string | null;
        imageSrc: string | null;
    };
    training: TrainingType;
    status: string;
    createdAt: string;
};

type ResponseInviteType = InviteType & {
    exercises: ExerciseType[];
    to: {
        _id: string;
        firstName: string | null;
        lastName: string | null;
        imageSrc: string | null;
    };
};

type InitialStateType = {
    partners: PartnerType[];
    jointPartners: PartnerType[];
    invites: InviteType[];
    isError: boolean;
    isAccept: boolean | null;
};

const initialState: InitialStateType = {
    partners: [] as PartnerType[],
    jointPartners: [] as PartnerType[],
    invites: [],
    isError: false,
    isAccept: null,
};

export const TrainigsReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case GET_PARTNERS: {
            return {
                ...state,
                partners: action.partners,
            };
        }
        case GET_JOINT_PARTNERS: {
            return {
                ...state,
                jointPartners: action.jointPartners,
                isError: action.isError,
            };
        }
        case GET_INVITES: {
            return {
                ...state,
                invites: action.invites,
            };
        }
        case SET_RESPONSE: {
            const id = action.partner._id || action.partner.id;
            const inviteIndex = state.invites.findIndex((invite) => invite._id === id);
            if (inviteIndex !== -1) {
                const invite = state.invites[inviteIndex];
                if (action.partner.status === 'accepted') {
                    const newPartner = {
                        id: invite._id,
                        name: invite.from.lastName + ' ' + invite.from.firstName,
                        trainingType: invite.training.name,
                        imageSrc: invite.from.imageSrc,
                        avgWeightInWeek: 0,
                        inviteId: invite._id,
                        status: invite.status,
                    };
                    const updatedInvites = state.invites.filter(
                        (_, index) => index !== inviteIndex,
                    );
                    return {
                        ...state,
                        partners: [...state.partners, newPartner],
                        invites: updatedInvites,
                    };
                } else {
                    const updatedInvites = state.invites.filter(
                        (_, index) => index !== inviteIndex,
                    );
                    return {
                        ...state,
                        invites: updatedInvites,
                    };
                }
            }
            return state;
        }
        case SEND_INVITE: {
            return {
                ...state,
                jointPartners: state.jointPartners.map((partner) =>
                    partner.id === action.partner.to._id
                        ? { ...partner, status: action.partner.status }
                        : partner,
                ),
            };
        }
        case DELETE_TRAINING: {
            return {
                ...state,
                partners: state.partners.filter((partner) => partner.id !== action.id),
            };
        }
        case SET_ERROR: {
            return {
                ...state,
                isError: action.isError,
            };
        }
        default: {
            return state;
        }
    }
};

type ActionTypes =
    | GetPartnersAT
    | GetJointPartnersAT
    | GetInvitesAT
    | SetErrorAT
    | SendResponseAT
    | SendInviteAT
    | DeleteTrainingAT;

type SetErrorAT = ReturnType<typeof setErrorAC>;
export const setErrorAC = (isError: boolean) => ({ type: SET_ERROR, isError } as const);

type GetPartnersAT = ReturnType<typeof getPartnersAC>;
const getPartnersAC = (partners: PartnerType[]) => ({ type: GET_PARTNERS, partners } as const);
export const getPartnersTC = () => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await trainingApi
        .getPartners()
        .then((response) => {
            dispatch(getPartnersAC(response.data));
            dispatch(loadingAC(false));
        })
        .catch((rej) => {
            console.error('Данные ошибки:', rej.data);
            dispatch(loadingAC(false));
        });
};

type GetJointPartnersAT = ReturnType<typeof getJointPartnersAC>;
export const getJointPartnersAC = (jointPartners: PartnerType[], isError: boolean) =>
    ({ type: GET_JOINT_PARTNERS, jointPartners, isError } as const);
export const getJointPartnersTC = (training?: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await trainingApi
        .getJointPartners(training)
        .then((response) => {
            dispatch(getJointPartnersAC(response.data, false));
            dispatch(loadingAC(false));
        })
        .catch(() => {
            dispatch(getJointPartnersAC([], true));
            dispatch(loadingAC(false));
        });
};

export const createJointTrainingTC =
    (newTraining: TrainingType, userId: string) => async (dispatch: AppDispatch) => {
        const { name, date, exercises, parameters } = newTraining;
        dispatch(loadingAC(true));
        await calendarApi
            .createTraining(name, date, exercises, parameters)
            .then((res) => {
                dispatch(sendInviteTC(res.data._id, userId));
            })
            .catch(() => {
                dispatch(loadingAC(false));
            });
    };

type SendInviteAT = ReturnType<typeof SendInviteAC>;
const SendInviteAC = (partner: ResponseInviteType) => ({ type: SEND_INVITE, partner } as const);

const sendInviteTC = (trainingId: string, userId: string) => async (dispatch: AppDispatch) => {
    await trainingApi
        .sendInvite(userId, trainingId)
        .then((res) => {
            dispatch(SendInviteAC(res.data));
            dispatch(loadingAC(false));
        })
        .catch((rej) => {
            console.error('Данные ошибки:', rej.data);
            dispatch(loadingAC(false));
        });
};

type GetInvitesAT = ReturnType<typeof getInvitesAC>;
const getInvitesAC = (invites: InviteType[]) => ({ type: GET_INVITES, invites } as const);
export const getInvitesTC = () => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await trainingApi
        .getInvites()
        .then((res) => {
            dispatch(getInvitesAC(res.data));
            dispatch(loadingAC(false));
        })
        .catch((rej) => {
            console.error('Данные ошибки:', rej.data);
            dispatch(loadingAC(false));
        });
};

type SendResponseAT = ReturnType<typeof sendResponseAC>;
const sendResponseAC = (partner: ResponseInviteType) => ({ type: SET_RESPONSE, partner } as const);

export const sendResponseTC = (id: string, status: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await trainingApi
        .sendResponse(id, status)
        .then((response) => {
            if (response.data) {
                dispatch(sendResponseAC(response.data));
            } else {
                dispatch(getInvitesTC());
            }
            dispatch(loadingAC(false));
        })
        .catch((rej) => {
            console.error('Данные ошибки:', rej.data);
            dispatch(loadingAC(false));
        });
};

type DeleteTrainingAT = ReturnType<typeof deleteTrainingAC>;
const deleteTrainingAC = (id: string) => ({ type: DELETE_TRAINING, id } as const);

export const deleteTrainingTC = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingAC(true));
    await trainingApi
        .deleteTraining(id)
        .then(() => {
            dispatch(deleteTrainingAC(id));
            dispatch(loadingAC(false));
        })
        .catch((rej) => {
            console.error('Данные ошибки:', rej.data);
            dispatch(loadingAC(false));
        });
};
