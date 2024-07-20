import React, { Fragment } from 'react'
import Navbar from '~/components/navbar'
import Sidebar from '~/components/sidebar'

export default function Admin({ children }) {
  return (
    <Fragment>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[230px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Navbar />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
        </div>
      </div>
    </Fragment>
  )
}
