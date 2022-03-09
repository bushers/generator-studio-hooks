import React, { useState, FC, useRef } from 'react';

import { useOutsideAlerter } from '../../../hooks';
import { iValue } from '../../../models/models';

interface DropdownProps {
    className?: string;
    items: iValue[];
    onChange?: (item?) => void;
    label?: React.ReactNode;
    customArrow?: React.ReactNode;
}

const Dropdown: FC<DropdownProps> = ({ className, items, onChange, label, customArrow }) => {
    const cls = className || '';
    const [optionSelected, setOptionSelected] = useState<iValue>(null);
    const [isListExpanded, setIsListExpanded] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>();

    const onItemSelect = (item: iValue) => {
        if (onChange) {
            onChange();
        }
        setOptionSelected(item);
        setIsListExpanded(false);
    };

    useOutsideAlerter(wrapperRef, () => setIsListExpanded(false));

    return (
        <div className={`dropdown__wrapper ${cls}`} ref={wrapperRef}>
            {label && (
                <label className="dropdown__label" id="dropdown-label">
                    {label}
                </label>
            )}
            <ul className="dropdown__list">
                <li
                    className="dropdown__list-item dropdown__list-item--selected"
                    onClick={() => setIsListExpanded(!isListExpanded)}
                    role="button"
                    aria-labelledby="dropdown-label"
                    aria-expanded={isListExpanded}
                    tabIndex={0}
                >
                    {optionSelected ? optionSelected.value : 'Choose'}
                    <div className={`dropdown__arrow ${isListExpanded ? 'dropdown__arrow--open' : ''}`}>
                        {customArrow || <DropdownArrow />}
                    </div>
                </li>
                {isListExpanded && (
                    <ul className="dropdown__options" role="list">
                        {items.map((item, idx) => (
                            <li
                                key={item.key}
                                className="dropdown__list-item"
                                id={`option-${idx + 1}`}
                                tabIndex={0}
                                role="listitem"
                                onClick={() => onItemSelect(item)}
                                onKeyDown={(e) => (e.keyCode === 13 ? onItemSelect(item) : null)}
                            >
                                {item.value}
                            </li>
                        ))}
                    </ul>
                )}
            </ul>
        </div>
    );
};

export default Dropdown;

const DropdownArrow = (props) => (
    <svg width="10" height="5" viewBox="0 0 10 5" fillRule="evenodd">
        <title>Open drop down</title>
        <path d="M10 0L5 5 0 0z"></path>
    </svg>
);
