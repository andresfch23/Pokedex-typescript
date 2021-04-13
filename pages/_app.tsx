import { Provider } from 'react-redux'
import type { AppProps } from 'next/app';
import configureStore from '../redux/store';

export default function App({ Component, pageProps }: AppProps) {
  const store = configureStore();

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}