import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { SCROLL_TO_SECTION } from '../../../constants';
import { ACTIONS } from '../../../controllers/App/Actions';

export interface ScrollLinkProps {
    className?: string;
    id: string;
}

const ScrollLink: React.FC<ScrollLinkProps> = (props) => {
    const cls = props.className || '';
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <a
            href={`#${props.id}`}
            className={'scroll-link ' + cls}
            onClick={(e) => {
                e.preventDefault();

                dispatch(ACTIONS.CLOSE_DIALOG());

                SCROLL_TO_SECTION(props.id);
                setTimeout(() => {
                    history.push(props.id);
                }, 300);
            }}
        >
            {props.children}
        </a>
    );
};

export default ScrollLink;
