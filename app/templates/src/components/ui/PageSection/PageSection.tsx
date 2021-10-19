import React, { useState } from 'react';

import Toggle from '../Toggle/Toggle';
import { iData } from '../../../models/models';

export interface PageSectionProps {
    className?: string;
    data: iData;
}

const PageSection: React.FC<PageSectionProps> = ({ className, data }) => {
    const cls = className || '';
    const [toggleIdx, setToggleIdx] = useState(0);

    const { title, copy, footnote, graphType, toggle } = data;

    const showDataViz = () => {
        switch (graphType) {
            case 'data-type-here':
                return '';

            default:
                return <h2>No data found</h2>;
        }
    };

    return (
        <div className={'page-section ' + cls}>
            <h1 className="page-section__title">{title}</h1>
            <p className="page-section__copy">{copy}</p>
            <Toggle toggleIdx={toggleIdx} setToggleIdx={(idx: number) => setToggleIdx(idx)} labels={toggle} />
            PAGE SECTION
            <div className="page-section__dataviz">{showDataViz()}</div>
            <p className="page-section__footnote footnote">{footnote}</p>
        </div>
    );
};

export default React.memo(PageSection);
