import * as React from 'react';

import { EmbedCode } from '../EmbedCode/EmbedCode';
import { RES_URL } from '../../../config';
import I18n from '../../../services/I18n';
import NavMenu from '../NavMenu/NavMenu';
import { iNavData } from '../../../models/models';

interface MenuDialogProps {
    navData: iNavData[];
    currSection: string;
    handleClick: (id: string) => void;
}

export const MenuDialog: React.FC<MenuDialogProps> = ({ navData, currSection, handleClick }) => {
    return (
        <>
            <div className="nav-menu__campaign-logo ">
                <a href="/">
                    <img src={RES_URL + 'img/campaign-logo.svg'} alt={I18n.t('altText')} />
                </a>
            </div>
            <NavMenu navData={navData} currSection={currSection} handleClick={handleClick} />
        </>
    );
};

export const InfoComponent: React.FC<any> = (props) => {
    const infoHtml = { __html: I18n.t('informationCopy') };
    return (
        <div className="info-container container">
            <h1 className="center dialog__header">{I18n.t('infoTitle')}</h1>
            <div className="center" dangerouslySetInnerHTML={infoHtml}></div>
        </div>
    );
};

export const EmbedComponent: React.FC<any> = (props) => {
    return (
        <div className="embed-container container">
            <h1 className="dialog__header center">{I18n.t('embedCopyTitle')}</h1>
            <EmbedCode height={600} />
        </div>
    );
};
