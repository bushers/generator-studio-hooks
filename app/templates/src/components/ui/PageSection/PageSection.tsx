import * as React from 'react';

import { iData } from '../../../models/models';

export interface PageSectionProps {
    className?: string;
    data: iData;
}

const PageSection: React.FC<PageSectionProps> = ({ className, data }) => {
    const cls = className || '';

    const { title, copy, footnote, graphType } = data;

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
            PAGE SECTION
            <div className="page-section__dataviz">{showDataViz()}</div>
            <p className="page-section__footnote footnote">{footnote}</p>
        </div>
    );
};

export default PageSection;
