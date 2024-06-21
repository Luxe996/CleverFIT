type SearchHighlightTextType = {
    searchValue?: string;
    name: string;
};

export const SearchHighlightText = ({ searchValue, name }: SearchHighlightTextType) => {
    if (!searchValue) return <span>{name}</span>;

    const Reg = new RegExp(searchValue, 'gi');
    const match = name.match(Reg);

    if (match) {
        const arr = name.split(Reg).map((l, i, array) => {
            if (i < array.length - 1) {
                const value = match.shift();

                return (
                    <span key={l}>
                        {l}
                        <span style={{ color: '#FF5253' }}>{value}</span>
                    </span>
                );
            }

            return <span>{l}</span>;
        });

        return <span>{arr}</span>;
    }

    return <span>{name} </span>;
};
