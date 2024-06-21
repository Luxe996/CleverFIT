export const Endpoints = {
    auth: {
        login: '/auth/login',
        register: '/auth/registration',
        checkEmail: '/auth/check-email',
        checkCode: '/auth/confirm-email',
        setNewPass: '/auth/change-password',
    },
    feedBacks: '/feedback',
    google: '/auth/google',
    calendar: {
        training: '/training',
        catalog: '/catalogs/training-list',
    },
    user: {
        user: '/user',
        me: '/user/me',
        upload: '/upload-image',
    },
    catalogs: '/catalogs/tariff-list',
    tariffs: {
        getCurrentTariff: '/tariff/checkout',
        payTariff: '/tariff',
    },
    trainings: {
        getPartners: '/catalogs/training-pals',
        getJointPartners: '/catalogs/user-joint-training-list',
        invite: '/invite',
    },
};
