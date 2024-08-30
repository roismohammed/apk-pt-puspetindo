import { Head } from '@inertiajs/react'
import React, { Fragment, useState } from 'react'
import Navbar from '~/components/navbar'
import Sidebar from '~/components/sidebar'
import favIcon from '../img/logo-kecil.png'
export default function Admin({ children }) {
  const [sidebarToggle,setSidebarToggle] = useState(false)
  return (
    <Fragment>
      <Head>
        <link rel="icon" href={favIcon} type="image/x-icon" />
      </Head>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[230px_1fr]">
        <Sidebar sidebarToggle={sidebarToggle}/>
        <div className="flex flex-col">
          <Navbar />
          <main className="flex flex-1 flex-col gap-4 p-4 mt-2 lg:gap-6 lg:p-6 ">{children}</main>
        </div>
      </div>
    </Fragment>
  )
}
