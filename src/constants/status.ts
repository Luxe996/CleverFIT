export const Status: Record<string, string> = {
    ACCEPTED: 'accepted',
    PENDING: 'pending',
    REJECTED: 'rejected',
};

export enum StatusTitle {
    'accepted' = 'тренировка одобрена',
    'pending' = 'ожидает подтверждения',
    'rejected' = 'тренировка отклонена',
}
