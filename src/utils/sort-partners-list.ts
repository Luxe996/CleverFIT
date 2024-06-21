import { PartnerType } from '@redux/reducers/trainigs-reducer.ts';

export const sortPartnersList = (partners: PartnerType[]) => {
    const statusOrder: Record<string, number> = {
        accepted: 0,
        pending: 1,
        null: 2,
        rejected: 3,
    };

    return [...partners].sort((a, b) => {
        const status1 = a.status || 'null';
        const status2 = b.status || 'null';

        if (status1 !== status2) {
            return statusOrder[status1] - statusOrder[status2];
        }

        const [name1 = '', lastName1 = ''] = (a.name || '').toLowerCase().split(' ');
        const [name2 = '', lastName2 = ''] = (b.name || '').toLowerCase().split(' ');

        return name1.localeCompare(name2) || lastName1.localeCompare(lastName2);
    });
};
