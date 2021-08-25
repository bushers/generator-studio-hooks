import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './controllers/App/App';
import { IS_MOBILE, IS_EMBED } from './config';
import './main.scss';

(function () {
    if (IS_MOBILE) {
        document.querySelector('body').classList.add('mobile');
    }
    if (IS_EMBED) {
        document.querySelector('body').classList.add('embed');
    }
    if (typeof document !== 'undefined') {
        ReactDOM.render(<App />, document.getElementById('SiteContainer'));
    } else {
        return App;
    }
})();
