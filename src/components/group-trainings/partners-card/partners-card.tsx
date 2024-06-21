import { Avatar, Button, Card, Col, Row, Tooltip } from 'antd';
import { deleteTrainingTC, PartnerType } from '@redux/reducers/trainigs-reducer.ts';
import s from './partners-card.module.scss';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { CheckCircleTwoTone, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { dataTestId } from '@constants/data-test-id.ts';
import { SearchHighlightText } from '@components/group-trainings/search-highlight-text';
import { useCallback } from 'react';
import { Status, StatusTitle } from '@constants/status.ts';

type PartnersCardType = {
    partner: PartnerType;
    index: number;
    isMyPartner: boolean;
    setIsCreateTraining?: (value: boolean) => void;
    setSelectPartner?: (partner: PartnerType) => void;
    searchValue?: string;
};

export const PartnersCard = ({
    partner,
    index,
    isMyPartner,
    setIsCreateTraining,
    setSelectPartner,
    searchValue,
}: PartnersCardType) => {
    const dispatch = useAppDispatch();

    const highlight = useCallback(
        (name: string) => <SearchHighlightText searchValue={searchValue} name={name} />,
        [searchValue],
    );

    const onCreateHandler = () => {
        setIsCreateTraining(true);
        setSelectPartner(partner);
    };
    const deleteTraining = (id: string) => {
        dispatch(deleteTrainingTC(id));
    };
    const onClickHandler = () => {
        setSelectPartner?.(partner);
    };

    return (
        <Card
            data-test-id={`${dataTestId.jointTrainingCards}${index}`}
            key={partner.id}
            className={`${s.card} ${isMyPartner ? s.white : s.blue}`}
            onClick={onClickHandler}
        >
            <Row className={s.userInfo}>
                <Col>
                    <Avatar src={partner.imageSrc} alt={partner.name} icon={<UserOutlined />} />
                </Col>
                <Col style={{ marginLeft: '8px' }}>
                    <div style={{ width: '50px' }}>{highlight(partner.name)}</div>
                </Col>
            </Row>
            <Row className={s.trainingInfo}>
                <Col span={14}>
                    <div>Тип тренировки:</div>
                    <div style={{ marginTop: '5px' }}>Средняя нагрузка:</div>
                </Col>
                <Col className={s.trainingValues}>
                    <div>{partner.trainingType}</div>
                    <div style={{ marginTop: '5px' }}>{partner.avgWeightInWeek} кг/нед</div>
                </Col>
            </Row>
            {!isMyPartner && (
                <>
                    {partner.status === null ? (
                        <Button
                            type='primary'
                            style={{ marginTop: '16px' }}
                            size='small'
                            onClick={onCreateHandler}
                        >
                            Создать тренировку
                        </Button>
                    ) : (
                        <Button
                            type='primary'
                            style={{ marginTop: '16px' }}
                            size='small'
                            onClick={() => deleteTraining(partner.inviteId)}
                            disabled={
                                partner.status === Status.PENDING ||
                                partner.status === Status.REJECTED
                            }
                        >
                            {partner.status === Status.ACCEPTED
                                ? 'Отменить тренировку'
                                : 'Создать тренировку'}
                        </Button>
                    )}
                    {partner.status && (
                        <div className={s.status}>
                            {StatusTitle[partner.status as keyof typeof StatusTitle]}
                            {partner.status === Status.REJECTED && (
                                <Tooltip
                                    placement='topRight'
                                    overlayStyle={{ width: '150px' }}
                                    title='Попробуй недельки через 2'
                                >
                                    <InfoCircleOutlined style={{ marginLeft: '8px' }} />
                                </Tooltip>
                            )}
                            {partner.status === Status.ACCEPTED && (
                                <CheckCircleTwoTone
                                    twoToneColor='#52C41A'
                                    style={{ marginLeft: '8px' }}
                                />
                            )}
                        </div>
                    )}
                </>
            )}
        </Card>
    );
};
