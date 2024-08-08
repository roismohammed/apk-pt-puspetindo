import { Head, Link } from '@inertiajs/react'
import { IconHome, IconSearch } from '@tabler/icons-react'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import Admin from '~/layout/admin'

const statuses = [
  {
    value: "Selesai",
    label: "Selesai",
  },
  {
    value: "Tidak-Selesai",
    label: "Tidak-Selesai",
  }
]
export default function Create() {
  return (
    <Admin>
      <Head title='manhours' />
      <Card className="p-5">
        <div className="border-b border-gray-200 pb-4">
          <div className='flex justify-between'>
            <div>
              <div className='flex gap-1'>
                <Link href="/">
                  <p className='text-sm flex gap-1'><IconHome size={18} />Home</p>
                </Link>
                <span>-</span>
                <Link href='/dasboard/proyek/index'>
                  <p className="text-sm">man-hours</p>
                </Link>
              </div>
              <h6 className='text-gray-600 text-lg font-bold'>Man Hours</h6>
            </div>
          </div>
        </div>

        <form className='mt-5'>
          <ToastContainer />
          <div className='my-5'>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor='manhours'> Nama Karyawan:</Label>
              <Input
                id="manhours"
                placeholder="Masukkan Nama Karyawan"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              <div className="flex flex-col space-y-1.5">
                <Label>Pilih Proyek:</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Proyek" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="relative ml-auto flex-1 md:grow-0 ">
                      <IconSearch className="absolute mt-1 left-2.5  top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                      />
                    </div>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>Status:</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="relative ml-auto flex-1 md:grow-0 p-3">
                      <IconSearch className="absolute mt-1 left-2.5  top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className=" rounded-lg bg-background pl-8 md:w-full lg:w-[320px]"
                      />
                    </div>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>Pemilik:</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Pemilik" />
                  </SelectTrigger>
                  {/* <SelectContent>
                    {pemiliks.map((pemilik) => (
                      <SelectItem key={pemilik.value} value={pemilik.value}>{pemilik.label}</SelectItem>
                    ))}
                  </SelectContent> */}
                </Select>
              </div>
            </div>
          </div>

          <Button className='bg-blue-600 hover:bg-blue-500' type="submit">Simpan</Button>
        </form>
      </Card>
    </Admin>
  )
}