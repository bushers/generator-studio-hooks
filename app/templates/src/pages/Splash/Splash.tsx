import * as React from 'react';

import { Translation } from '../../models/models';
import I18n from '../../services/I18n';
import { SCROLL_TO_SECTION } from '../../constants';
import { SCROLL_OFFSET } from '../SinglePage/SinglePage';

export interface SplashProps {
    className?: string;
    locale: Translation;
    deeplink: string;
}

// Add key of section that scroll btn will click to
const introSectionKey = '';

const Splash: React.FC<SplashProps> = ({ className, deeplink }) => {
    const cls = className || '';

    return (
        <div className={'splash ' + cls}>
            <div className="splash__container">
                <h1 className="splash__title">{I18n.t('campaignName')}</h1>

                <div className="splash__copy">
                    <p>{I18n.t('splashIntro')}</p>
                </div>
                <div className="splash__client-logo" dangerouslySetInnerHTML={{ __html: deeplink }}></div>

                <button className="splash__scroll-btn" onClick={() => SCROLL_TO_SECTION(introSectionKey, SCROLL_OFFSET)}>
                    {I18n.t('begin')}
                    <Arrow />
                </button>
            </div>
        </div>
    );
};

export default Splash;

export const Arrow = () => {
    return (
        <svg viewBox="0 0 13 8" fill="none">
            <path
                d="M11.2813 7.93457L6.5 3.16373L1.71875 7.93457L0.25 6.46582L6.5 0.215817L12.75 6.46582L11.2813 7.93457Z"
                fill="#000000"
            />
        </svg>
    );
};
