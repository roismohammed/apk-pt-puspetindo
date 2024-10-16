import { Head, Link, usePage } from '@inertiajs/react'
import { IconBook, IconFolders, IconHome } from '@tabler/icons-react'
import { AlertDialogHeader } from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import Admin from '~/layout/admin'
import Create from './create'
import Ppwi from '#models/ppwi'
import { createColumnHelper } from '@tanstack/react-table'
import DataTable from '~/components/dataTable/dataTable'
import { useState } from 'react'
export default function Index() {
  const { data_ppwi,data_karyawan,data_user_login } = usePage().props
  
  const [open,setOpen] = useState(false)

  const columnHelper = createColumnHelper<Ppwi>();

  const columns = [
    columnHelper.accessor('id', {
      header: () => 'No',
      cell: info => info.row.index + 1,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('judulPpwi.judul', {
      header: () => 'Folder',
      cell: info => (
        <div className="flex items-center gap-1">
          <IconFolders size={18}  />
          <span>{info.renderValue()}</span> 
        </div>
      ),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('keterangan', {
      header: () => 'Keterangan',
      cell: info => info.renderValue(),
      footer: info => info.column.id,
    }),
    columnHelper.display({
      id: 'aksi',
      header: () => 'Aksi',
      cell: info => (
        <div className="flex gap-3">
          <Link href={`/ppwi/detail/${info.row.original.id}`}>
            <small className='text-white bg-blue-600 text-sm py-1 px-2 rounded-sm hover:text-white hover:bg-blue-500 cursor-pointer'>Preview</small>
          </Link>
        </div>
      ),
      footer: info => info.column.id,
    }),
  ];

  return (
    <Admin  user={data_user_login}>
      <Head>
        <title>PPWI</title>
      </Head>
      <div>
        <div className="border-b border-gray-200 pb-4">
          <div className='flex justify-between'>
            <div>
              <Link href="/">
                <p className='text-sm flex gap-1 hover:text-gray-500 '><IconHome size={18} />Home</p>
              </Link>
              <h6 className='text-gray-600 text-lg font-bold'>Halaman PPWI</h6>
            </div>

            {data_user_login?.jabatan === 'IT Software' ? (
              <div className='flex gap-1'>
              <Link href='/judul'>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white btn-small gap-2 hover:text-white">Data Judul</Button>
              </Link>
              <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-blue-600 hover:bg-blue-500 text-white btn-small gap-2 hover:text-white"
                    variant="outline"
                  >
                    <IconBook size={18} />
                    Tambah PPWI
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <AlertDialogHeader>
                    <DialogTitle>Tambah PPWI</DialogTitle>
                  </AlertDialogHeader>
                  <Create  onSuccess={() => setOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
            ): null}
          </div>


        </div>
        <div>
          <DataTable data={data_ppwi} columns={columns} />
        </div>

      </div>
    </Admin>
  )
}

