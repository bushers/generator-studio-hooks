import React, { useState } from 'react';

import { SocialButtons } from '../SocialButtons/SocialButtons';
import NavMenu from '../NavMenu/NavMenu';
import { iNavData } from '../../../models/models';

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
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY === 0) {
            setIsScrolled(false);
        } else if (window.scrollY > 0 && !isScrolled) {
            setIsScrolled(true);
        }
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`header ${!isScrolled ? 'header--initial' : ''} ${cls}`}>
            <div className={'header__burger'} onClick={openBurgerMenu}>
                <BurgerIcon />
            </div>
            <div className={`header__menu`}>
                {navData?.length > 0 && (
                    <NavMenu currSection={currSection} navData={navData} handleClick={scrollToAnchor} />
                )}
            </div>
            <div className="header__socials">
                <SocialButtons />
            </div>
        </div>
    );
};

export default Header;

const BurgerIcon = () => {
    return (
        <svg width="31" height="16" viewBox="0 0 31 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 16H31V13.3333H0V16ZM0 9.33333H31V6.66667H0V9.33333ZM0 0V2.66667H31V0H0Z" fill="#153574" />
        </svg>
    );
};
