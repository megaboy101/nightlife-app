import React from 'react';
import I from 'react-fontawesome';

const Footer = () => (
    <footer className="footer" style={{marginTop: 60}}>
        <div className="content has-text-centered">
            <p>
                <strong>Drip</strong> by <a target="_blank" href="https://twitter.com/_megaboi">@_megaboi</a>. The source
                code and this website are licensed <a target="_blank" href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            </p>
            <div>
                <a className="icon" target="_blank" href="https://github.com/megaboy101">
                    <I name="github" />
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;

