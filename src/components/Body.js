import React from 'react';
import { observer } from 'mobx-react';
import DripList from './DripList.js';

const Body = ({ model }) => (
    <main className="container">
        <div className="section has-text-centered">
            <div className="container">
                <h1 className="title is-spaced">Drop</h1>
                <h2 className="subtitle">
                    Drop on a drip to be included in the dropper list,
                    drop again to be withdrawn.<br/> Note: dropping requires you be logged in.
                </h2>
            </div>
        </div>

        <DripList model={model} />
    </main>
);

export default observer(Body);