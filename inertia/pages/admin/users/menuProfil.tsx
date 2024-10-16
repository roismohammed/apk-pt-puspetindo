import { Head, usePage } from '@inertiajs/react'
import React from 'react'
import { Card } from '~/components/ui/card'
import Admin from '~/layout/admin'
// import ImgMenuProfil from '../../../img/rois.jpeg'
import { IconEdit } from '@tabler/icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

export default function MenuProfil() {
  // const { data_karyawan } = usePage().props;
  // console.log(data_karyawan);

  return (
    <Admin>
      <Head title='menu-profil' />
      <div className=' bg-gray-100 shadow-md'>
        <Card className='relative bg-blue-600 p-4 h-40 sm:h-64'>
          <span className='absolute top-2 right-2'>
            <IconEdit className='text-white cursor-pointer' />
          </span>
          <div className='flex flex-col items-center sm:flex-row sm:items-start sm:mx-4 mt-6 sm:mt-16 gap-6'>
            <div className='flex justify-center sm:justify-start'>
              <Avatar className='sm:h-56 h-40  sm:w-56 w-40 border-x-green-600 border-y-green-600 border-2'>
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className='text-black sm:text-white  text-center sm:text-left flex flex-col items-center sm:items-start sm:mt-20 mt-0'>
              {/* {data_karyawan.map((data) => (
                <span className='flex gap-2 '>
                  <h1>{data.nama}</h1>
                </span>
              ))} */}
              <span className='flex gap-2 '>
                <h1>Posisi:</h1>
                <h1>IT Programmer</h1>
              </span>
            </div>
          </div>
        </Card>
        <div className='sm:mt-16 sm:text-left text-center mt-36  mx-4 '>
          <h1 className='text-2xl border-b border-gray-300 pb-1'>About</h1>
          <p className='w-full '>
            Halo, nama saya Muhammad Rois. Saya seorang Junior Front-End Programmer dengan keahlian dalam pengembangan menggunakan bahasa pemrograman seperti JavaScript, Bootstrap, dan ReactJS. Saya juga memiliki pengalaman dalam merancang dan mengimplementasikan basis data, serta mengintegrasikan sistem dengan layanan pihak ketiga seperti API dan platform lainnya.
          </p>
        </div>
      </div>
    </Admin>
  )
}
