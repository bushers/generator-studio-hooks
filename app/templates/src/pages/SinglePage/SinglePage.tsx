import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as ScrollAnimation from 'react-animate-on-scroll';

import { iSinglePageSection, iNavData } from '../../models/models';
import { SCROLL_TO_SECTION } from '../../constants';
import { MenuDialog } from '../../components/ui/Dialog/Utils';
import Header from '../../components/ui/Header/Header';
import { AppState } from '../../controllers/App/StateAndProps';
import Splash from '../Splash/Splash';
import { ACTIONS } from '../../controllers/App/Actions';

export interface SinglePageProps {
    className?: string;
}

// Exmaple sections
const Intro = (props) => (
    <div style={{ background: 'grey', minHeight: 500 }}>
        <h1>Intro section</h1>
    </div>
);
const Commentary = (props) => (
    <div style={{ background: 'coral', minHeight: 800 }}>
        <h1>Commentary section</h1>
    </div>
);

/**
 * Example sections data, replace with real data from Firebase
 */
const dummySections: iSinglePageSection[] = [
    { key: 'splash', componentName: 'Splash', isAnimated: false },
    { key: 'intro', componentName: 'Intro', isAnimated: true },
    { key: 'commentary', componentName: 'Commentary', isAnimated: true },
];

// Import and list all components here that you want to render as a single page section
// The component name must match the componentName property from the iSinglePageSection data
const components = {
    Splash,
    Intro,
    Commentary,
};

const SinglePage: React.FC<SinglePageProps> = (props) => {
    const { app } = useSelector((state: AppState) => state);
    const { key } = useParams();
    const dispatch = useDispatch();

    const renderSections = (sections: iSinglePageSection[]): React.ReactNode[] =>
        sections.map((sec) => {
            if (sec.isAnimated) {
                return (
                    <div id={sec.key} key={sec.key}>
                        <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                            {React.createElement(components[sec.componentName], {
                                data: app.data[`${sec.key}`],
                            })}
                        </ScrollAnimation>
                    </div>
                );
            }
            return (
                <div id={sec.key} key={sec.key}>
                    {React.createElement(components[sec.componentName], { data: app.data[`${sec.key}`] })}
                </div>
            );
        });

    const openBurgerMenu = () => {
        dispatch(ACTIONS.OPEN_DIALOG(<MenuDialog navData={app.navData} currSection={key} isSinglePage={true} />));
    };

    React.useLayoutEffect(() => {
        location.hash &&
            setTimeout(() => {
                SCROLL_TO_SECTION(location.hash.replace('#', ''));
            }, 300);
    }, []);

    return (
        <div className={'single-page '}>
            <div className="single-page__header">
                <Header
                    deeplink={app.deeplink}
                    navData={app.navData}
                    currSection={key}
                    openBurgerMenu={openBurgerMenu}
                    isSinglePage={true}
                />
            </div>

            <div className="single-page__content">{renderSections(dummySections)}</div>
        </div>
    );
};

export default SinglePage;
