import React from 'react';
import { observer } from 'mobx-react';
import I from 'react-fontawesome';
import css from '../styles/header.css';
import D from '../assets/dripD2.svg';

const Header = ({ enterInput, submitInput, saveSearch, inputValue, username }) => (
    <header className={`hero is-fullheight is-primary ${css.headerColor}`}>
        <div className="hero-body">
            <div className="container has-text-centered">
                <h1 className={`title ${css.title}`}><D className={css.d} width="125" height="125" />rip</h1>
                <div className="container">
                    <div className={`field ${css.inputField}`}>
                        <div className="control is-expanded">
                            <input className={`input is-medium ${css.curveMod}`} onChange={enterInput} value={inputValue} type="text" placeholder="Drop it!" />
                        </div>
                    </div>
                    <div className="field is-horizontal has-addons has-addons-centered">
                        <div className={`control ${css.buttonContainer}`}>
                            <button className={`button is-medium ${css.curveMod}`} onClick={submitInput}>Drop</button>
                        </div>
                        <div className={`control ${css.buttonContainer}`}>
                            {
                                username === 'Guest' ?
                                    <a href="/api/login"><button className={`button is-medium ${css.curveMod}`} onMouseDown={saveSearch}><I className={css.twitterColor} name="twitter" /></button></a> :
                                    <button className={`button is-medium ${css.curveMod}`}>Yo {username}!</button>
                            }
                        </div>
                    </div>
                </div>
                <p className="subtitle">
                    Drop a location in the search bar to see local bars drip down.<br/>
                    Click the the twitter icon to login via Twitter.
                </p>
            </div>
        </div>
    </header>
);

export default observer(Header);