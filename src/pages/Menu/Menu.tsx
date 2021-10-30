import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';
import './Menu.scss';

const Home: React.FC = () => (
  <IonGrid fixed className='grid'>
    <IonRow>
      <IonCol className='ion-align-self-center'>
        <IonCard color='primary' button href='/channels'>
          <IonCardHeader>
            <IonCardTitle>Canali</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonCol>
      <IonCol className='ion-align-self-center'>
        <IonCard color='primary' button href='/groups'>
          <IonCardHeader>
            <IonCardTitle>Gruppi</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonCol>
    </IonRow>
  </IonGrid>
);

export default Home;
