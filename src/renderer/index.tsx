import { render } from 'react-dom';
import { MetaMaskProvider } from 'metamask-react';
import App from './App';

import './index.css';

render(
  <MetaMaskProvider>
    <App />
  </MetaMaskProvider>,
  document.getElementById('root')
);
