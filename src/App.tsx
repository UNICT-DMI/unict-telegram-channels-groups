import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';
import Base from './pages/Base';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactHashRouter>
      <IonRouterOutlet>
        <Route exact path='/home'>
          <Base page='home' />
        </Route>
        <Route exact path='/channels'>
          <Base page='channels' />
        </Route>
        <Route exact path='/groups'>
          <Base page='groups' />
        </Route>
        <Route exact path='/groups/bachelor'>
          <Base page='bachelor' />
        </Route>
        <Route exact path='/groups/master'>
          <Base page='master' />
        </Route>
        <Route exact path='/bots'>
          <Base page='bots' />
        </Route>
        <Route>
          <Redirect to='/home' />
        </Route>
      </IonRouterOutlet>
    </IonReactHashRouter>
  </IonApp>
);

export default App;
