import React from 'react';
import css from '../styles/popup.css';

const Popup = ({ content }) => (
    <article id='popup' className={`message is-danger ${css.popup}`}>
        <div className="message-header">
            <p><strong>Error!</strong></p>
            <button className="delete"></button>
        </div>
        <div className="message-body">
            {content}
        </div>
    </article>
);

export default Popup;