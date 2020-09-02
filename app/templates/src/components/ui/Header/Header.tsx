import * as React from 'react';

import { SocialButtons } from '../SocialButtons/SocialButtons';
import NavMenu from '../NavMenu/NavMenu';
import { iNavData } from '../../../models/models';
import { RES_URL } from '../../../config';
import I18n from '../../../services/I18n';

export interface HeaderProps {
    className?: string;
    deeplink: string;
    navData: iNavData[];
    currSection: string;
    openBurgerMenu?: (e: any) => void;
    isSplash?: boolean;
    isSinglePage: boolean;
}

export interface HeaderState {}

const Header: React.FC<HeaderProps> = (props) => {
    const cls = props.className || '';

    return (
        <div className={'header ' + cls} ref={(e) => (this.el = e)}>
            <div
                dangerouslySetInnerHTML={{ __html: props.deeplink }}
                className={`header__block header__client-logo ${!props.isSplash ? 'header__block--hidden ' : ''}`}
            ></div>
            <div className={`header__block header__campaign-logo ${props.isSplash ? 'header__block--hidden ' : ''}`}>
                <a href={`/`}>
                    <img src={RES_URL + 'img/_logos/campaign-logo.svg'} alt={I18n.t('altText')} />
                </a>
            </div>
            <div className={'header__block header__burger '} onClick={props.openBurgerMenu}>
                <i className="icon-burger" />
                BURGER
            </div>
            <div
                className={`header__block header__menu ${
                    props.currSection == 'splash' ? 'header__block--hidden ' : ''
                }`}
            >
                {props.navData.length > 0 && (
                    <NavMenu
                        isSinglePage={props.isSinglePage}
                        currSection={props.currSection}
                        navData={props.navData}
                    />
                )}
            </div>
            <div className="header__block header__socials">
                <SocialButtons />
            </div>
        </div>
    );
};

export default Header;
