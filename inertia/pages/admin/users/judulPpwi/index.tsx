import { Head, Link, router, usePage } from '@inertiajs/react'
import { IconBuildingArch, IconEdit, IconHome, IconTrash } from '@tabler/icons-react'
import React, { useState } from 'react'
import { AlertDialogHeader } from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import Admin from '~/layout/admin'
import CreateJudul from './create'
import Swal from 'sweetalert2'
import DataTable from '~/components/dataTable/dataTable'
import { createColumnHelper } from '@tanstack/react-table'
import Ppwi from '#models/ppwi'
export default function Indexjudul() {
    const { data_judul } = usePage().props;
    console.log(data_judul);

    // const {open,setOpen} =useState(true)

    const handleDelete = async (id: any) => {
        const result = await Swal.fire({
            title: 'Ingin Hapus Data?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya!',
            cancelButtonText: 'Tidak!',
            allowOutsideClick: false,
        });
        if (result.isConfirmed) {
            try {
                await router.delete('/judul/delete/' + id);
                Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data.', 'error');
            }
        }
    }

    const columnHelper = createColumnHelper<Ppwi>();

    const columns = [
        columnHelper.accessor('id', {
            header: () => 'No',
            cell: info => info.row.index + 1,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('judul', {
            header: () => 'Folder',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
    
        columnHelper.display({
            id: 'aksi',
            header: () => 'Aksi',
            cell: info => (
                <div className="flex gap-3">
                    <span onClick={() => handleDelete(info.row.original.id)} className="text-red-900 cursor-pointer">
                        <IconTrash size={18} />
                    </span>

                    {/* <Dialog open={modalEdit} onOpenChange={setModalEdit} >
                        <DialogOverlay className="bg-white/10 backdrop-blur-sm" />

                        <DialogTrigger asChild>
                            <IconEdit size={18} className='cursor-pointer' onClick={() => handleEdit(info.row.original)} />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] shadow-none">
                            <DialogHeader>
                                <DialogTitle>Edit Proyek</DialogTitle>
                            </DialogHeader>
                            <Edit proyek={selectedProyek} />
                        </DialogContent>
                    </Dialog> */}
                </div>
            ),
            footer: info => info.column.id,
        }),
    ];
    return (
        <Admin>
            <Head>
                <title>judul</title>
            </Head>
            <Card className="p-5">
                <div className="border-b border-gray-200 pb-4">
                    <div className='flex justify-between'>
                        <div >
                            <div className='flex gap-1'>
                                <Link href="/karyawan">
                                    <p className='text-sm flex gap-1 hover:text-gray-500 '><IconHome size={18} />Home</p>
                                </Link>
                                <small>/</small>
                                <Link href="/ppwi">
                                    <p className='text-sm hover:text-gray-500 '>ppwi</p>
                                </Link>
                            </div>
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
                                <CreateJudul />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <DataTable data={data_judul} columns={columns} />
            </Card>
        </Admin>
    )
}

