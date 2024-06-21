export const getBadgeColor = (name: string) => {
    const color: { [value: string]: string } = {
        ноги: 'red',
        силовая: 'yellow',
        руки: 'blue',
        грудь: 'green',
        спина: 'orange',
        кардио: 'pink',
    };
    return color[name.toLowerCase()];
};
