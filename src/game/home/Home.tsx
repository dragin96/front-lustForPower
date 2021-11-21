import React from 'react';

import {
    Avatar,
    Button,
    Cell,
    Div,
    Group,
    Header,
    PanelHeader
} from '@vkontakte/vkui';
import './home.css';

const rangs = ['Работяга', 'Успешный работяга']
const Home = (props: IGameProps) => {
    const { fetchedUser: user} = props;
    return (
            <>
                <PanelHeader>Жажда власти</PanelHeader>
                {user &&
                <Group header={<Header mode="secondary">Профиль</Header>}>
                  <Cell className={'my-name'}>
                      {user.avatar ? <Avatar src={user.avatar}/> : null}
                      {user.nickname}
                  </Cell>
                  <Cell>
                    <Div>
                      <b id="balance" className="my-balance">{user.money} монет</b>
                    </Div>
                    <Div>
                      <b id="rang" className="my-rang">{rangs[user.rank]}</b>
                    </Div>
                    <Div>
                      <b id="workег" className="my-mywoker">Рабочие: {user.slave.length} чел.</b>
                    </Div>
                    <Div>
                      {/*<b id="profit" className="my-profit">Прибыль: {user.priceInHourYouSlave} м/ч.</b>*/}
                    </Div>
                  </Cell>
                </Group>}
                <Group header={<Header mode="secondary">Навигация</Header>}>
                    <Div>
                        <Button stretched size="l" mode="secondary" data-to="persik">
                            Собрать прибыль
                        </Button>
                    </Div>
                    <Div>
                        <Button stretched size="l" mode="secondary" data-to="persik">
                            Нанять рабочих
                        </Button>
                    </Div>
                    <Div>
                        <Button stretched size="l" mode="secondary" data-to="persik">
                            Мои друзья
                        </Button>
                    </Div>
                    <Div>
                        <Button stretched size="l" mode="secondary" data-to="top">
                            Рейтинг
                        </Button>
                    </Div>
                    <Div>
                        <Button stretched size="l" mode="secondary" data-to="persik">
                            Ежедневный бонус
                        </Button>
                    </Div>
                    <Div>
                        <Button stretched size="l" mode="secondary" data-to="persik">
                            Получить монеты
                        </Button>
                    </Div>
                </Group>
        </>
    );
}

interface IGameProps {
    fetchedUser: {
        nickname: string;
        rank: number;
        rating: number;
        socialHref: string;
        avatar: string;
        money: number;
        slave: [];
        extras: [];
        vkQuest: number;
        priceInHourYouSlave: number;
    } | null
}

export default Home;
