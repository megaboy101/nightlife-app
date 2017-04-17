import React from 'react';
import { observer } from 'mobx-react';
import css from '../styles/drip.css';

const Drip = ({ model }) => (
    <li className="column is-one-third has-text-centered">
        <figure className={`image ${css.imageContainerFix} ${model.saving ? '' : css.flick}`}>
            <img
                className={`${css.imageFix} ${model.selected ? css.active : css.inactive} ${model.imageLoaded ? css.appear : css.hide}`}
                onLoad={model.showImage}
                onClick={model.toggleSelected}
                src={model.photo}
                alt="There should be nothing here" />
        </figure>
        <h1 className="title is-4">{model.name}</h1>
        <h2 className="subtitle">{model.dropCount}</h2>
    </li>
);

export default observer(Drip);