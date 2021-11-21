// noinspection TypeScriptUnresolvedReactComponent

import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    AdaptivityProvider,
    AppRoot,
    Epic,
    Panel,
    PanelHeader,
    ScreenSpinner,
    SizeType,
    Tabbar,
    TabbarItem,
    View
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import axios from 'axios';
import Home from "./game/home/Home";
import {
    Icon28ClipOutline,
    Icon28MessageOutline,
    Icon28NewsfeedOutline,
    Icon28ServicesOutline,
    Icon28UserCircleOutline
} from "@vkontakte/icons";

axios.defaults.baseURL = 'http://localhost:3000/api';

function App() {
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [activeStory, setActiveStory] = useState('home');
    const onStoryChange = (e: any) => {
        console.log(e.currentTarget.dataset.story)
        setActiveStory(e.currentTarget.dataset.story)
    };

    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                // @ts-ignore
                schemeAttribute.value = data?.scheme || 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function getAuthKey() {
            // eslint-disable-next-line no-restricted-globals
            const {data} = await axios.get('/auth' + location.search);
            // @ts-ignore
            axios.defaults.headers.common['Key'] = data.access_token;
        }

        async function fetchUser() {
            const {data} = await axios.get('/auth/getMyInfo');
            if (data.hasOwnProperty('_id')) {
                setUser(data);
                setActiveStory('home');
                setPopout(<div/>);
            } else {

            }
        }

        getAuthKey().then(async () => {
            await fetchUser();
        });


    }, []);


    return (
        <AdaptivityProvider sizeX={SizeType.COMPACT}>
            <AppRoot>
                <Epic activeStory={activeStory} tabbar={<Tabbar>
                    <TabbarItem
                        onClick={onStoryChange}
                        selected={activeStory === 'top'}
                        data-story="top"
                        text="ТОП"
                    ><Icon28NewsfeedOutline/></TabbarItem>
                    <TabbarItem
                        onClick={onStoryChange}
                        selected={activeStory === 'services'}
                        data-story="services"
                        text="Сервисы"
                    ><Icon28ServicesOutline/></TabbarItem>
                    <TabbarItem
                        onClick={onStoryChange}
                        selected={activeStory === 'messages'}
                        data-story="messages"
                        label="12"
                        text="Сообщения"
                    ><Icon28MessageOutline/></TabbarItem>
                    <TabbarItem
                        onClick={onStoryChange}
                        selected={activeStory === 'clips'}
                        data-story="clips"
                        text="Клипы"
                    ><Icon28ClipOutline/></TabbarItem>
                    <TabbarItem
                        onClick={onStoryChange}
                        selected={activeStory === 'home'}
                        data-story="home"
                        text="Профиль"
                    ><Icon28UserCircleOutline/></TabbarItem>
                </Tabbar>}>
                    <View popout={popout} id='home' activePanel={'home'}>
                        <Panel id='home'>
                            <Home fetchedUser={fetchedUser}/>
                        </Panel>
                    </View>
                    <View id='top' activePanel={'top'}>
                        <Panel id='top'>
                            <PanelHeader>TOP</PanelHeader>
                        </Panel>
                    </View>
                </Epic>
            </AppRoot>
        </AdaptivityProvider>
    );
}

export default App;
