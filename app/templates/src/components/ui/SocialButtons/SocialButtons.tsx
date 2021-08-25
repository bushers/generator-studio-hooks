import * as React from 'react';
import { useDialog } from '../../../hooks';

import { EmbedComponent, InfoComponent } from '../Dialog/Utils';

export interface SocialButtonsProps {}

export interface SocialButtonsState {
    twitterLink: string;
    facebookLink: string;
}

export const SocialButtons: React.FC<SocialButtonsProps> = (props) => {
    const [twitterLink, setTwitterLink] = React.useState('');
    const [facebookLink, setFacebookLink] = React.useState('');
    const { setDialog } = useDialog();

    const getTwitterText = () => {
        const metas = document.getElementsByTagName('meta');

        for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') == 'twitter:description') {
                return metas[i].getAttribute('content');
            }
        }

        return '';
    };

    React.useLayoutEffect(() => {
        const tw = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(getTwitterText());
        const fb = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL);

        setTwitterLink(tw);
        setFacebookLink(fb);
    }, []);

    const onEmbedClick = () => {
        setDialog(<EmbedComponent />);
    };

    const onInfoClick = () => {
        setDialog(<InfoComponent />);
    };

    return (
        <div className="social-buttons-container">
            <a className="share-button facebook hide-on-embed" href={facebookLink} target="_blank">
                <i className="icon-facebook"></i>
            </a>
            <a className="share-button twitter hide-on-embed" href={twitterLink} target="_blank">
                <i className="icon-twitter"></i>
            </a>
            <div className="share-button embed hide-on-embed" onClick={onEmbedClick}>
                <i className="icon-embed"></i>
            </div>
            <div className="share-button info" onClick={onInfoClick}>
                <i className="icon-info"></i>
            </div>
        </div>
    );
};
