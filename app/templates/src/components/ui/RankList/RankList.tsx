import React from 'react';

import { ADD_RANKS_TO_DATA } from '../../../constants';

export interface RankListProps {
    className?: string;
    list: iListItem[];
    headers: string[];
}

interface iListItem {
    rank: number;
    label: string;
    value: number;
}

const valueFormatter = (val: number): string => {
    // Format the value as necessary e.g. a percentage value
    return `${(val * 100).toFixed(0)}%`;
};

const valAsPercent = (maxVal: number, val: number): string => {
    return `${(val / maxVal) * 100}%`;
};

const RankList: React.FC<RankListProps> = ({ className, list, headers }) => {
    const cls = className || '';
    // If list data is not already ranked, use add ranks function
    const listData = list[0].rank ? list : ADD_RANKS_TO_DATA(list, 'value');

    return (
        <div className={'rank-list ' + cls}>
            <div className="rank-list__headers rank-list__row">
                {headers.map((e, i) => (
                    <span key={`header-${i + 1}`}>{e}</span>
                ))}
            </div>

            <ol className="rank-list__list">
                {listData.map((e, i) => (
                    <div className="rank-list__item" key={`list-item-${i + 1}`}>
                        <div className="rank-list__row">
                            <span className="rank">{e.rank}</span>
                            <span className="label">{e.label}</span>
                            <div className="value">{valueFormatter(e.value)}</div>
                        </div>
                        <div className="rank-list__bar">
                            <div className="inner" style={{ width: valAsPercent(list[0].value, e.value) }}></div>
                        </div>
                    </div>
                ))}
            </ol>
        </div>
    );
};

export default RankList;
