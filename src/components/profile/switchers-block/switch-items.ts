import { dataTestId } from '@constants/data-test-id';

export const switchItem = [
    {
        id: 'readyForJointTraining',
        title: 'Открыт для совместных тренировок',
        tooltip: 'включеная функция позволит участвовать в совместных тренировках',
        iconTestId: dataTestId.tariffTrainingsIcon,
        switchTestId: dataTestId.tariffTrainings,
    },
    {
        id: 'sendNotification',
        title: 'Уведомления',
        tooltip: 'включеная функция позволит получать уведомления об активностях',
        iconTestId: dataTestId.tariffNotificationsIcon,
        switchTestId: dataTestId.tariffNotifications,
    },
    {
        id: 'darkTheme',
        title: 'Тёмная тема',
        tooltip: 'темная тема доступна для PRO tarif',
        iconTestId: dataTestId.tariffThemeIcon,
        switchTestId: dataTestId.tariffTheme,
    },
];
