import * as React from 'react';

import { iNavData } from '../../../models/models';

export interface NavMenuProps {
    className?: string;
    navData: iNavData[];
    currSection: string;
    handleClick: (id: string) => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ className, navData, currSection, handleClick }) => {
    const cls = className || '';

    return (
        <ul className={'nav-menu ' + cls}>
            {navData.map((item: iNavData) => (
                <li
                    key={item.key}
                    className={`nav-menu__item ${currSection == item.key ? 'nav-menu__item--active ' : ''}`}
                >
                    <a
                        className="nav-menu__link"
                        href={item.url}
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick(item.key);
                        }}
                    >
                        {item.title}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default NavMenu;
