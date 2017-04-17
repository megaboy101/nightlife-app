import React from 'react';
import { observer } from 'mobx-react';
import Drip from './Drip.js';
import DripModel from '../models/DripModel.js';

const DripList = ({ model }) => (
    <ul className="columns is-multiline">
        {
            model.drips.map(drip => (
                <Drip
                    key={Math.floor(Math.random()*100000)}
                    model={new DripModel(drip.id, drip.name, drip.photoRef, drip.username, drip.droppers)} />
            ))
        }
    </ul>
);

export default observer(DripList);