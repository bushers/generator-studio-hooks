import * as React from 'react';
import { useParams } from 'react-router-dom';

import { iAppData } from '../../models/models';
import { SCROLL_TO_SECTION } from '../../constants';
import { MenuDialog } from '../../components/ui/Dialog/Utils';
import Header from '../../components/ui/Header/Header';
import Splash from '../Splash/Splash';
import ScrollableAnchor from '../../components/ui/ScrollableAnchor/ScrollableAnchor';
import AnimateOnScroll from '../../components/ui/AnimateOnScroll/AnimateOnScroll';
import { useDialog } from '../../hooks';
import { Button } from '../../components/ui/Button/Button';
import I18n from '../../services/I18n';
import PageSection from '../../components/ui/PageSection/PageSection';
import Intro from '../../components/ui/Intro/Intro';

export interface SinglePageProps {
    className?: string;
    appData: iAppData;
    deeplink: string;
}

interface PageParams {
    key: string;
}

export const SCROLL_OFFSET = 0;

const SinglePage: React.FC<SinglePageProps> = ({ appData, deeplink }) => {
    const { key } = useParams<PageParams>();
    const { setDialog, unSetDialog } = useDialog();

    const scrollToAnchor = (id: string) => {
        SCROLL_TO_SECTION(id, SCROLL_OFFSET);
        location.hash = id;
        unSetDialog();
    };

    const openBurgerMenu = () => {
        setDialog(<MenuDialog navData={appData.navData} currSection={key} handleClick={scrollToAnchor} />);
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
                    deeplink={deeplink}
                    navData={appData.navData}
                    currSection={key}
                    openBurgerMenu={openBurgerMenu}
                    scrollToAnchor={scrollToAnchor}
                />
            </div>

            <div className="single-page__content">
                <ScrollableAnchor hashId="home">
                    <Splash locale={appData.locale} deeplink={deeplink} navData={appData.navData} />
                </ScrollableAnchor>

                <ScrollableAnchor hashId="intro">
                    <Intro />
                </ScrollableAnchor>

                {appData.data &&
                    Object.keys(appData.data)
                        .sort((a, b) => appData.data[`${a}`].order - appData.data[`${b}`].order)
                        .map((key) => (
                            <ScrollableAnchor hashId={key} key={key}>
                                <section className={`single-page__section single-page__section--${key}`}>
                                    <AnimateOnScroll triggerOnce={true}>
                                        <PageSection data={appData.data[`${key}`]} />
                                    </AnimateOnScroll>
                                </section>
                            </ScrollableAnchor>
                        ))}
            </div>

            <Button className="back-to-top" onClick={() => SCROLL_TO_SECTION('home', 0)}>
                {I18n.t('backToTop')}
            </Button>
        </div>
    );
};

export default SinglePage;
