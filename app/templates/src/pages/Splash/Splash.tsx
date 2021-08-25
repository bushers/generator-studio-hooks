import * as React from 'react';

import { Translation, iNavData } from '../../models/models';
import { RES_URL } from '../../config';
import I18n from '../../services/I18n';
import { LinkButton } from '../../components/ui/Button/Button';

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
            <LinkButton className="splash__block splash__button" href={`/`} />
        </div>
    );
};

export default Splash;
