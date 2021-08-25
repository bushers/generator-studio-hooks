import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import SinglePage from '../../pages/SinglePage/SinglePage';
import { Spinner } from '../../components/ui/Spinner/Spinner';
import { GET_FIREBASE_DATA } from '../../constants';
import { DialogProvider } from '../../hooks';
import { iAppData } from '../../models/models';
import I18n from '../../services/I18n';

export const STATE_KEY = 'app';

// When going live, move Firebase json data into src/ and call this func
// instead of GET_FIREBASE_DATA

// const getJsonData = async () => {
//     const data = await import('../../data.json');
//     return data;
// };

const App: React.FC = () => {
    const [appData, setAppData] = React.useState<iAppData>(null);
    const [deeplink, setDeeplink] = React.useState(null);

    React.useEffect(() => {
        // Get deeplink & store in state
        const el = document.getElementById('SiteDeeplink');
        if (el) {
            (el.firstElementChild as HTMLElement).style.width = null;
            setDeeplink(el.outerHTML);
            el.parentNode.removeChild(el);
        }

        // Get data from Firebase
        GET_FIREBASE_DATA()
            .then((e: iAppData) => {
                I18n.setLocale(e.locale);
                setAppData(e);
            })
            .catch((err) => {
                console.log(`There was a problem: ${err}`);
            });
    }, []);

    if (!appData) {
        return <Spinner />;
    }

    return (
        <div className={`app`}>
            <DialogProvider>
                <Router hashType="noslash">
                    <Switch>
                        <Route exact path="/:key?">
                            <SinglePage appData={appData} deeplink={deeplink} />
                        </Route>
                    </Switch>
                </Router>
                <div id="dialog-root"></div>
            </DialogProvider>
        </div>
    );
};

export default App;
