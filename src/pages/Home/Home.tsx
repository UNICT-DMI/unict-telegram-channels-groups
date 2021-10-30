import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home: React.FC = () => (
  <IonGrid fixed className='grid'>
    <IonRow>
      <IonCol className='ion-align-self-center'>
        <Link to='/channels' className='link'>
          <IonCard className='card'>
            <IonCardHeader>
              <IonCardTitle className='card-title'>Canali</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </Link>
      </IonCol>
      <IonCol className='ion-align-self-center'>
        <Link to='/groups' className='link'>
          <IonCard className='card'>
            <IonCardHeader>
              <IonCardTitle className='card-title'>Gruppi</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </Link>
      </IonCol>
    </IonRow>
  </IonGrid>
);

export default Home;
