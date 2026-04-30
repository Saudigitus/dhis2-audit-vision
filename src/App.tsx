import './index.css';
import { RecoilRoot } from 'recoil';
import { AppWrapper } from './packages';
import { Router } from './components/routes';

function App() {

  return (
    <RecoilRoot>
      <AppWrapper>
        <Router />
      </AppWrapper>
    </RecoilRoot>
  );
}

export default App;
