import React from 'react';
import { render } from 'react-dom';
import 'bulma';
import 'react-notifications/lib/notifications.css';
import App from './components/App.js';
import AppModel from './models/AppModel.js';
import { loadSearchImage } from './api.js';

render(
    <App model={new AppModel()} />,
    document.getElementById('app')
);