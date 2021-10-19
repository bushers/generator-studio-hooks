import React, { useState, useRef, useEffect } from 'react';

import { IS_MOBILE, SCREEN_WIDTH } from '../../../config';
import Pagination from '../Pagination/Pagination';

export interface CarouselProps {
    className?: string;
    items: JSX.Element[];
    data?: any;
}

const CARD_WIDTH = IS_MOBILE && SCREEN_WIDTH.IS_SMALL() ? 320 : 800; // Must match card width set in card.scss

const Carousel: React.FC<CarouselProps> = ({ className, items, data }) => {
    const cls = className || '';
    const [itemIdx, setItemIdx] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const itemRef = useRef(null);

    let xDown: number,
        yDown: number = null;

    const onPageChange = (idx) => {
        setTranslateX(-CARD_WIDTH * (idx - 1));
        setItemIdx(idx);
    };

    const handleTouchStart = (evt: any) => {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    };

    const handleTouchEnd = (evt: any) => {
        xDown = evt.changedTouches[0].clientX;
        yDown = evt.changedTouches[0].clientY;
    };

    const handleTouchMove = (evt: any) => {
        if (!xDown || !yDown) {
            return;
        }
        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;

        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                /* left swipe */
                if (itemIdx < items.length) onPageChange(itemIdx + 1);
            } else {
                /* right swipe */
                if (itemIdx > 1) onPageChange(itemIdx - 1);
            }
        } else {
            if (yDiff > 0) {
            } else {
            }
        }
        xDown = null;
        yDown = null;
    };

    useEffect(() => {
        return () => {
            setItemIdx(1);
            setTranslateX(0);
        };
    }, [items]);

    return (
        <div className={'carousel ' + cls}>
            <div
                className="carousel__items-wrapper"
                style={{ width: `calc(100vw * ${items.length + 1}`, transform: `translateX(${translateX}px)` }}
            >
                {items.map((e, i) => (
                    <div
                        className="carousel__item"
                        ref={i === 0 ? itemRef : null}
                        key={`carousel-item-${i}`}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onTouchMove={handleTouchMove}
                    >
                        {e}
                    </div>
                ))}
            </div>
                <Pagination
                    key={items[0].props.data.value}
                    pageCount={items.length}
                    onPageChange={onPageChange}
                    passIdx={itemIdx}
                />
        </div>
    );
};

export default Carousel;
