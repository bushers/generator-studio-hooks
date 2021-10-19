import React, { useEffect } from 'react';

export interface PaginationProps {
    className?: string;
    pageCount: number;
    onPageChange: (idx: number) => void;
    passIdx?: number;
}

const Pagination: React.FC<PaginationProps> = ({ className, pageCount, onPageChange, passIdx }) => {
    const cls = className || ``;
    const [currPage, setCurrPage] = React.useState(1);

    useEffect(() => {
        if (passIdx) setCurrPage(passIdx);
    }, [passIdx]);

    const handleClick = (idx: number) => {
        if (idx >= 1 && idx <= pageCount && idx !== currPage) {
            setCurrPage(idx);
            onPageChange(idx);
        }
    };

    return (
        <div className={`pagination ${cls}`}>
            <button
                className="pagination__previous"
                onClick={() => handleClick(currPage - 1)}
                onKeyDown={(e) => (e.key === 'Enter' ? handleClick(currPage - 1) : null)}
                aria-label="button-arrow-left"
                disabled={currPage === 1}
            >
                <i className="icon-arrow-left" />
            </button>
            <div className="pagination__list">
                {Array.from(new Array(pageCount), (empty, idx) => {
                    const currIdx = idx + 1;
                    return (
                        <div
                            key={currIdx}
                            className={`pagination__item${currPage === currIdx ? ' pagination__item--active' : ''}`}
                            onClick={() => handleClick(currIdx)}
                        >
                            <div className="pagination__item--inner" />
                        </div>
                    );
                })}
            </div>
            <button
                className="pagination__next"
                onClick={() => handleClick(currPage + 1)}
                onKeyDown={(e) => (e.key === 'Enter' ? handleClick(currPage + 1) : null)}
                aria-label="button-arrow-right"
                disabled={currPage === pageCount}
            >
                <i className="icon-arrow-right" />
            </button>
        </div>
    );
};

export default Pagination;
