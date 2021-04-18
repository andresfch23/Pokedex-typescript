import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import store from '../redux/store';
import InitializeState from '../components/InitializeState';
import '../styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <InitializeState>
        <Component {...pageProps} />
      </InitializeState>
    </Provider>
  )
};