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

    <div className="envelop-stripes"></div>
    <Navigation tabs={blog.tabs} />

    <div className="max-w-screen-lg m-auto">
      <main>
        {children}
      </main>
    </div>

  </div>
)
