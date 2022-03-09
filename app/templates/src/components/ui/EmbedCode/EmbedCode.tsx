import React, { FC, useRef } from 'react';

import { Button } from '../Button/Button';
import I18n from '../../../services/I18n';

export interface EmbedCodeProps {
    embedded?: string;
    height: number;
}

const EmbedCode: FC<EmbedCodeProps> = ({ embedded, height }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>();

    const onCopyToClipboard = (evt: any) => {
        textAreaRef.current.select();
        try {
            document.execCommand && document.execCommand('copy');
        } catch (err) {}
    };

    const specificHash = '#embed';

    //make sure url has no hash and other vars
    let url = document.URL.split('#')[0];

    url += specificHash;
    const campaignName = I18n.t('campaignName').split(' ').join('-').toLocaleLowerCase();
    const a: string = [
        '<div class="test-app" style="width:100%;height:',
        height,
        'px;margin:0 auto;background:#fff;position:relative;">',
        '<iframe data-url="',
        url,
        '" src="',
        url,
        '" style="position:absolute;top:0;left:0;width:100%;height:100%; border:1px solid #ccc;"></iframe></div>',
        '<div class="meframe"></div>',
        '<br/>',
        '<div>',
        '<a href="',
        document.URL.split('#')[0],
        '" target="_blank">',
        I18n.t('campaignName'),
        '</a> by ',
        '<a href="',
        I18n.t('clientUrl'),
        '" target="_blank">',
        I18n.t('clientTitle'),
        '</a>',
        '</div>',
        '</div>',
        '<br/>',
    ].join('');

    return (
        <div className="embed-code-container">
            <div className="embed-copy-container">
                <p>{I18n.t('embedCopy')}</p>
            </div>

            <textarea readOnly={true} className="embed-textarea center" value={a} ref={textAreaRef} />
            <div className="button-wrapper center">
                <Button className="embed-copy-btn main black-text" onClick={onCopyToClipboard}>
                    {I18n.t('copyToClipboard')}
                </Button>
            </div>
        </div>
    );
};

export default EmbedCode;
