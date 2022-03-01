import React, { useState } from 'react';

interface iCommentaryData {
    key: string;
    question: string;
    answer: string;
}

export interface CommentaryProps {
    className?: string;
    data: iCommentaryData[];
}

const Commentary: React.FC<CommentaryProps> = ({ className, data }) => {
    const cls = className || '';
    const [activeIdx, setActiveIdx] = useState(0);

    return (
        <div className={`commentary ${cls}`}>
            <div className="commentary__content">
                {data.map((item, idx) => (
                    <div key={item.key} className="commentary__item">
                        <div className="commentary__question" dangerouslySetInnerHTML={{ __html: item.question }} />
                        <div
                            className={`commentary__icon${activeIdx === idx ? ' commentary__icon--active' : ''}`}
                            onClick={() => {
                                if (activeIdx === idx) setActiveIdx(-1);
                                else setActiveIdx(idx);
                            }}
                        >
                            <Arrow />
                        </div>

                        {activeIdx === idx ? (
                            <div className="commentary__answer" dangerouslySetInnerHTML={{ __html: item.answer }} />
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Commentary;

const Arrow = () => {
    return (
        <svg width="13" height="9" viewBox="0 0 13 9" fill="none">
            <path d="M6.69937 9L0.897392 0L12.5014 0L6.69937 9Z" fill="#000" />
        </svg>
    );
};
