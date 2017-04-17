import React from 'react';
import { observer } from 'mobx-react';
import { NotificationContainer } from 'react-notifications';
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';

const App = ({ model }) => (
    <div>
        <Header
            enterInput={model.updateInput}
            inputValue={model.input}
            submitInput={model.search}
            saveSearch={model.saveSearch}
            username={model.username} />
        <Body model={model} />
        <Footer />

        <NotificationContainer />
    </div>
);

export default observer(App);