import './index.css';
import { RecoilRoot } from 'recoil';
import { AppWrapper } from './packages';
import { Router } from './components/routes';
import { GlobalErrorModal } from './components/modal/GlobalErrorModal';

function App() {

  return (
    <RecoilRoot>
      <AppWrapper>
        <Router />
      </AppWrapper>
      <GlobalErrorModal />
    </RecoilRoot>
  );
}

export default App;
