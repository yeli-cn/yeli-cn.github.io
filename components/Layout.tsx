import Head from 'next/head'
import React, { ReactNode } from 'react'
import blog from './../blog.config'
import { Navigation } from './Navigation'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => (
  <div>
    <Head>
      <title>{blog.title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navigation tabs={blog.tabs} />

    <main>
      {children}
    </main>

  </div>
)
