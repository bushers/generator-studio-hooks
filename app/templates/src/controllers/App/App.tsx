import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import * as throttle from 'lodash.throttle';
import * as smoothscroll from 'smoothscroll-polyfill';

import { ACTIONS } from './Actions';
import { AppState } from './StateAndProps';
import Splash from '../../pages/Splash/Splash';
import SinglePage from '../../pages/SinglePage/SinglePage';
import { Spinner } from '../../components/ui/Spinner/Spinner';
import MobLandScreen from '../../components/ui/MobLandScreen/MobLandScreen';
import { IS_MOB_LANDSCAPE } from '../../config';
import { GET_FIREBASE_DATA } from '../../constants';
import Dialog from '../../components/ui/Dialog/Dialog';

export const STATE_KEY = 'app';

const App: React.FC = () => {
    const appState = useSelector((state: AppState) => state);
    const dispatch = useDispatch();
    const [_, setUpdateView] = React.useState(0);

    React.useEffect(() => {
        // Add smooth scroll polyfill
        smoothscroll.polyfill();

        // Get deeplink & store in state
        const el = document.getElementById('SiteDeeplink');
        (el.firstElementChild as HTMLElement).style.width = null;
        dispatch(ACTIONS.GET_DEEPLINK(el.outerHTML));
        el.parentNode.removeChild(el);

        // Get data from Firebase
        GET_FIREBASE_DATA()
            .then((e) => dispatch(ACTIONS.DATA_LOADED(e)))
            .catch((err) => console.log(`Firebasee error: ${err}`));

        // Add resize listener to force re-render
        window.addEventListener(
            'resize',
            throttle(() => setUpdateView((updateView) => ++updateView), 300),
        );
        return () =>
            window.removeEventListener(
                'resize',
                throttle(() => setUpdateView((updateView) => ++updateView), 300),
            );
    }, []);

    if (!appState.app.data) {
        return <Spinner />;
    }
    if (IS_MOB_LANDSCAPE()) {
        return <MobLandScreen />;
    }
    return (
        <div className={`app`}>
            <Router hashType="noslash">
                <Switch>
                    <Route exact path="/" component={Splash} />
                    {/* <Route exact path="/:key?" component={SinglePage} /> */}
                </Switch>
            </Router>
            {appState.app.isDialogOpen && <Dialog>{appState.app.dialogContent}</Dialog>}
        </div>
    );
};

export default App;
