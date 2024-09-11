import { Head } from '@inertiajs/react'
import React, { Fragment, useState } from 'react'
import Navbar from '~/components/navbar'
import Sidebar from '~/components/sidebar'
import favIcon from '../img/logo-kecil.png'

export default function Admin({ children }) {
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const toggleSidebar = () => {
    setSidebarHidden(!isSidebarHidden);
  };

  return (
    <Fragment>
      <Head>
        <link rel="icon" href={favIcon} type="image/x-icon" />
      </Head>
      
      <div className={`grid min-h-screen  ${isSidebarHidden ? 'grid-cols-[64px_1fr]' : 'md:grid-cols-[220px_1fr]'} lg:grid-cols-[230px_1fr]`}>
        <div className="hidden text-slate-800 md:block">
          <div className="flex md:max-w-[220px] lg:max-w-[260px] w-[227px] fixed h-full max-h-screen flex-col gap-2">
            <Sidebar  isSidebarHidden={isSidebarHidden} toggleSidebar={toggleSidebar} />
          </div>
        </div>
        <div className="flex flex-col">
          <Navbar isSidebarHidden={isSidebarHidden} />
          <main className={`flex flex-1 bg-gray-200 overflow-x-hidden flex-col gap-4 p-4  lg:gap-6 lg:p-6 w-full transition-all duration-300 ${isSidebarHidden ? 'pl-8' : 'pl-64 lg:pl-22'}`}>
            {children}
          </main>
        </div>
      </div>
    </Fragment>
  )
}
