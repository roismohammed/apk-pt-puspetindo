import Proyek from '#models/proyek'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { IconBriefcase, IconEdit, IconFileDownload, IconHome, IconTrash } from '@tabler/icons-react'
import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import Admin from '~/layout/admin'
import DataTable from '~/components/dataTable/dataTable'
import { createColumnHelper } from '@tanstack/react-table'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import Create from './create'
import Edit from './edit'

export default function IndexProyek({}) {
    const { data_proyek,data_user_login } = usePage<{ data_proyek: Proyek[] }>().props
    const tableRef = useRef(null);
    const [modalEdit, setModalEdit] = useState(false); // State untuk modal edit
    const [selectedProyek, setSelectedProyek] = useState(null); // State untuk proyek yang dipilih
    const [open, setOpen] = useState(false);

    const handleDelete = async (id: any) => {
        const swalInstance = Swal.fire({
            title: 'Ingin Hapus Data?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya!',
            cancelButtonText: 'Tidak!',
            allowOutsideClick: false,
        });
        const result = await swalInstance;
        if (result.isConfirmed) {
            await router.delete('/proyek/delete/' + id);
            Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success');
        } else {
            Swal.fire('Cancelled', 'Data tidak dihapus.', 'error');
        }
    };

    const handleEdit = async (proyek: any) => {
        setModalEdit(true);
        setSelectedProyek(proyek); 
    };

    const columnHelper = createColumnHelper<Proyek>();

    const columns = [
        columnHelper.accessor('id', {
            header: () => 'No',
            cell: info => info.row.index + 1,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('kodeJobOrder', {
            header: () => 'Kode Proyek',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('namaProyek', {
            header: () => 'Nama Proyek',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('status', {
            header: () => 'Status',
            cell: info => {
                const status = info.getValue();
                const statusClass = status === 'Selesai' ? 'bg-blue-300 text-black' : 'bg-yellow-300 text-black';
                return <span className={`px-2 py-1 rounded ${statusClass}`}>{status}</span>;
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('pemilik', {
            header: () => 'Pemilik',
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
                    <span className='cursor-pointer' onClick={() => handleEdit(info.row.original)}>
                    <IconEdit size={18}  />
                    </span>
                </div>
            ),
            footer: info => info.column.id,
        }),
    ];

    return (
        <Admin user={data_user_login}>
            <Head title="proyek" />
            <div>
                <div className="border-b border-gray-200 pb-4">
                    <div className='flex justify-between'>
                        <div>
                            <Link href="/">
                                <p className='text-sm flex gap-1 hover:text-gray-500 '><IconHome size={18} />Home</p>
                            </Link>
                            <h6 className='text-gray-600 text-lg font-bold'>Proyek</h6>
                        </div>
                        <div>
                            <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
                                <DialogTrigger asChild>
                                    <Button
                                        className="bg-blue-600 hover:bg-blue-500 text-white btn-small gap-2 hover:text-white"
                                        variant="outline"
                                    >
                                        <IconBriefcase size={18} />
                                        Tambah Proyek
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Tambah Proyek</DialogTitle>
                                    </DialogHeader>
                                    <Create onSuccess={() => setOpen(false)} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>

                <div ref={tableRef}>
                    <DataTable data={data_proyek} columns={columns} />
                    <div className='flex justify-end'>
                        <DownloadTableExcel
                            filename="proyek table"
                            sheet="proyek"
                            currentTableRef={tableRef.current}
                        >
                            <Button
                                className='bg-green-600 flex gap-2 hover:bg-green-500 -mt-7 justify-end'>
                                <IconFileDownload className='gap-2' />
                                Export
                            </Button>
                        </DownloadTableExcel>
                    </div>
                </div>
            </div>

            <Dialog open={modalEdit} onOpenChange={setModalEdit} >
                <DialogOverlay className="bg-white/10 backdrop-blur-sm" />
                <DialogContent className="sm:max-w-[425px] shadow-none">
                    <DialogHeader>
                        <DialogTitle>Edit Proyek</DialogTitle>
                    </DialogHeader>
                   {selectedProyek ? <Edit proyek={selectedProyek} onSuccess={() => setModalEdit(false)} /> : null}
                </DialogContent>
            </Dialog>
        </Admin>
    );
}
