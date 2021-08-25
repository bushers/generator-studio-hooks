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
    scrollToAnchor?: (id: string) => void;
}

export interface HeaderState {}

const Header: React.FC<HeaderProps> = ({
    className,
    deeplink,
    navData,
    currSection,
    openBurgerMenu,
    scrollToAnchor,
}) => {
    const cls = className || '';

    return (
        <div className={'header ' + cls}>
            <div dangerouslySetInnerHTML={{ __html: deeplink }} className={`header__block header__client-logo `}></div>
            <div className={`header__block header__campaign-logo `}>
                <a href={`/`}>
                    <img src={RES_URL + 'img/_logos/campaign-logo.svg'} alt={I18n.t('altText')} />
                </a>
            </div>
            <div className={'header__block header__burger '} onClick={openBurgerMenu}>
                <i className="icon-burger" />
                BURGER
            </div>
            <div className={`header__block header__menu ${currSection == 'splash' ? 'header__block--hidden ' : ''}`}>
                {navData.length > 0 && (
                    <NavMenu currSection={currSection} navData={navData} handleClick={scrollToAnchor} />
                )}
            </div>
            <div className="header__block header__socials">
                <SocialButtons />
            </div>
        </div>
    );
};

export default Header;
