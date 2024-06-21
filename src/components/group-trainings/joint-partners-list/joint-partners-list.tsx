import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingsSelector } from '../../../selectors/selectors.ts';
import { Button, Input, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getJointPartnersAC, PartnerType } from '@redux/reducers/trainigs-reducer.ts';
import { useState } from 'react';
import { PartnersCard } from '@components/group-trainings/partners-card';
import { sortPartnersList } from '@utils/sort-partners-list.ts';
import { TrainingsDrawer } from '@components/my-tainings/trainings-drawer';
import s from './join-partners-list.module.scss';
import { dataTestId } from '@constants/data-test-id.ts';

const { Search } = Input;

export const JointPartnersList = () => {
    const dispatch = useAppDispatch();

    const [searchValue, setSearchValue] = useState('');

    const [isCreateTraining, setIsCreateTraining] = useState(false);
    const [selectPartner, setSelectPartner] = useState<PartnerType | null>(null);

    const searchHandler = (value: string) => {
        setSearchValue(value);
    };
    const { jointPartners } = useAppSelector(trainingsSelector);
    const onBackClick = () => {
        dispatch(getJointPartnersAC([], false));
    };

    const filteredPartnersList = sortPartnersList(jointPartners).filter((partner) =>
        partner.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (
        <div className={s.container}>
            <div className={s.searchBlock}>
                <Button
                    className={s.back}
                    icon={<ArrowLeftOutlined />}
                    type='link'
                    onClick={onBackClick}
                >
                    Назад
                </Button>
                <Search
                    data-test-id={dataTestId.searchInput}
                    className={s.search}
                    placeholder='Поиск по имени'
                    onSearch={searchHandler}
                />
            </div>
            <List
                dataSource={filteredPartnersList}
                renderItem={(partner, index) => (
                    <PartnersCard
                        partner={partner}
                        isMyPartner={false}
                        searchValue={searchValue}
                        index={index}
                        setIsCreateTraining={setIsCreateTraining}
                        setSelectPartner={setSelectPartner}
                    />
                )}
                pagination={{
                    pageSize: 12,
                }}
            />
            <TrainingsDrawer
                isCreateTraining={isCreateTraining}
                setIsCreateTraining={setIsCreateTraining}
                selectPartner={selectPartner}
            />
        </div>
    );
};
