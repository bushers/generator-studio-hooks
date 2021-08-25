import * as React from 'react';

import I18n from '../../../services/I18n';

export interface IntroProps {
    className?: string;
}

const Intro: React.FC<IntroProps> = ({ className }) => {
    const cls = className || '';

    return (
        <div className={'intro ' + cls}>
            <div className="intro__content">
                <div className="intro__copy" dangerouslySetInnerHTML={{ __html: I18n.t('introCopy') }}></div>
                INTRO
            </div>
        </div>
    );
};

export default Intro;
