import React, { ReactNode } from 'react';
import Header from './Header';
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Pokedex' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    {children}
  </div>
)

export default Layout;
