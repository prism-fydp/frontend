import { render } from 'react-dom';
import { MetaMaskProvider } from 'metamask-react';
import App from './App';

render(
  <MetaMaskProvider>
    <App />
  </MetaMaskProvider>,
  document.getElementById('root')
);
