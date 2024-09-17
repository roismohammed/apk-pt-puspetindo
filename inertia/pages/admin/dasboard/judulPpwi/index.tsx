import { Link, usePage } from '@inertiajs/react'
import { IconBuildingArch, IconEdit, IconHome } from '@tabler/icons-react'
import React, { useState } from 'react'
import { AlertDialogHeader } from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import Admin from '~/layout/admin'
import CreateJudul from './create'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

export default function Indexjudul() {
    const { data_judul } = usePage().props;
    console.log(data_judul);
    
    // const {open,setOpen} =useState(true)
  return (
    <Admin>
      <Card className="p-5">
                <div className="border-b border-gray-200 pb-4">
                    <div className='flex justify-between'>
                        <div>
                            <Link href="/karyawan">
                                <p className='text-sm flex gap-1'><IconHome size={18} />Home</p>
                            </Link>
                            <h6 className='text-gray-600 text-lg font-bold'>Menu Judul</h6>
                        </div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-500 text-white btn-small gap-2 hover:text-white"
                                    variant="outline"
                                >
                                    <IconBuildingArch size={18} />
                                    Tambah Judul
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <AlertDialogHeader>
                                    <DialogTitle>Judul</DialogTitle>
                                </AlertDialogHeader>
                                <CreateJudul/>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Card className="mt-3">
                    <Table className="container">
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {data_judul.map((data,index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data.judul}</TableCell>
                                    <TableCell className='flex gap-2'>
                                        {/* <IconEdit
                                            size={18}
                                            className='cursor-pointer'
                                            onClick={() => handleEdit(dep)} // Panggil handleEdit dengan parameter departemen
                                        /> */}

                                        {/* Modal Edit */}
                                        {/* <Dialog open={modalEdit} onOpenChange={setModalEdit}>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Departemen</DialogTitle>
                                                </DialogHeader>
                                                {selectedDepartemen && (
                                                    <Edit departemen={selectedDepartemen} />
                                                )}
                                            </DialogContent>
                                        </Dialog> */}

                                        {/* <span
                                            onClick={() => handleDelete(dep.id)}
                                            className="text-red-900 hover:cursor-pointer"
                                        >
                                            <IconTrash size={18} />
                                        </span> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </Card>
    </Admin>
  )
}
