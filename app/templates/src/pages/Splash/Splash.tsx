import * as React from 'react';

import { Translation, iNavData } from '../../models/models';
import { RES_URL } from '../../config';
import I18n from '../../services/I18n';
import { Button } from '../../components/ui/Button/Button';
import { SCROLL_TO_SECTION } from '../../constants';
import { SCROLL_OFFSET } from '../SinglePage/SinglePage';

export interface SplashProps {
    className?: string;
    locale: Translation;
    deeplink: string;
    navData: iNavData[];
}

const Splash: React.FC<SplashProps> = ({ className, deeplink }) => {
    const cls = className || '';

    return (
        <div className={'splash ' + cls}>
            <h1>Splash</h1>
            <div className="splash__block splash__campaign-logo">
                <img src={`${RES_URL}img/campaign-logo.png`} alt={I18n.t('campaignName')} />
            </div>
            <div className="splash__block splash__copy">
                <p>{I18n.t('splashIntro')}</p>
            </div>
            <Button
                className="splash__button"
                onClick={() => SCROLL_TO_SECTION('intro', SCROLL_OFFSET)}
            >
                <i className="icon-scroll-down" /> {I18n.t('begin')}
            </Button>
        </div>
    );
};

export default Splash;
