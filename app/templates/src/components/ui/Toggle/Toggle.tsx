import * as React from 'react';

export interface ToggleProps {
    className?: string;
    labels: string[];
    toggleIdx: number;
    setToggleIdx: (idx: number) => void;
}

const Toggle: React.FC<ToggleProps> = ({ className, labels = ['toggle2', 'toggle2'], toggleIdx, setToggleIdx }) => {
    const cls = className || '';

    return (
        <div className={'toggle ' + cls}>
            {labels?.map((label, idx) => (
                <div
                    key={label}
                    className={`toggle__item ${toggleIdx === idx ? 'toggle__item--active' : ''}`}
                    onClick={() => setToggleIdx(idx)}
                    onKeyDown={(e) => (e.key === 'Enter' ? setToggleIdx(idx) : null)}
                    aria-label={label}
                    role="button"
                    tabIndex={0}
                >
                    {label}
                </div>
            ))}
        </div>
    );
};

export default Toggle;
