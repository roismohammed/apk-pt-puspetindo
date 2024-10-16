import { Head } from '@inertiajs/react'
import React, { Fragment, useState } from 'react'
import Navbar from '~/components/navbar'
import Sidebar from '~/components/sidebar'
import favIcon from '../img/logo-kecil.png'
import toast, { Toaster } from 'react-hot-toast';
import { Card } from '~/components/ui/card'

export default function Admin({ user, children: children }: any) {
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const toggleSidebar = () => {
    setSidebarHidden(!isSidebarHidden);
  };

  console.log(user);
  
  return (
    <Fragment>
      <Head>
        <link rel="icon" href={favIcon} type="image/x-icon" />
      </Head>

      <div className={`grid min-h-screen  ${isSidebarHidden ? 'grid-cols-[64px_1fr]' : 'md:grid-cols-[220px_1fr]'} lg:grid-cols-[230px_1fr]`}>
        <div className="hidden text-slate-800 md:block">
          <div className="flex z-10 md:max-w-[220px] lg:max-w-[260px] w-[227px] fixed h-full max-h-screen flex-col gap-2">
            <Sidebar user={user} isSidebarHidden={isSidebarHidden} toggleSidebar={toggleSidebar} />
          </div>
        </div>
        <div className="flex flex-col">
          <Navbar isSidebarHidden={isSidebarHidden} />
          <main className={`flex flex-1 bg-gray-200 overflow-x-hidden flex-col gap-4 p-4  lg:gap-6 lg:p-4 w-full transition-all duration-300 ${isSidebarHidden ? 'pl-8' : 'pl-64 lg:pl-22'}`}>
            <Card className="p-5">
              {children}
            </Card>
          </main>
        </div>
      </div>
      <Toaster
        position={'top-center'}
        richColors={true}
        theme={'light'}
        closeButton={true}
        toastOptions={{
          classNames: {
            error: 'bg-rose-100/50 bg-red-400 border border-rose-700',
            success:
              'bg-grean-100/50 text-green-400 border border-green-700',
            warning:
              'text-yellow-400 border border-yellow-700 bg-yellow-100/50 ',
            info: 'bg-blue-100/50 text-blue-400 border border bg-blue-400',
          },
        }}
      />
    </Fragment>
  )
}
