import * as React from 'react';
import { useDispatch } from 'react-redux';

import { iNavData } from '../../../models/models';
import ScrollLink from '../ScrollLink/ScrollLink';
import { ACTIONS } from '../../../controllers/App/Actions';

export interface NavMenuProps {
    className?: string;
    navData: iNavData[];
    currSection: string;
    /**
     *  If single page layout, render scrolling hash links
     */
    isSinglePage: boolean;
}

const NavMenu: React.FC<NavMenuProps> = (props) => {
    const cls = props.className || '';
    const dispatch = useDispatch();

    return (
        <ul className={'nav-menu ' + cls}>
            {props.navData.map((item: iNavData, i) => (
                <li
                    key={item.key}
                    className={`nav-menu__item ${props.currSection == item.key ? 'nav-menu__item--active ' : ''}`}
                >
                    {props.isSinglePage ? (
                        <ScrollLink id={item.key}>{item.title}</ScrollLink>
                    ) : (
                        <a className="nav-menu__link" href={item.url} onClick={() => dispatch(ACTIONS.CLOSE_DIALOG)}>
                            {item.title}
                        </a>
                    )}

                    {item.children && item.children.length > 0 && (
                        <ul className="nav-menu__sub-list">
                            {item.children.map((subItem) => (
                                <li
                                    key={subItem.key}
                                    className="nav-menu__sub-item"
                                    onClick={() => dispatch(ACTIONS.CLOSE_DIALOG)}
                                >
                                    <a href={subItem.url} className="nav-menu__sub-item-link">
                                        {subItem.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavMenu;
