import Proyek from '#models/proyek'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { IconBriefcase, IconEdit, IconHome, IconSearch, IconTrash, IconUserPlus } from '@tabler/icons-react'
import React from 'react'
import Swal from 'sweetalert2'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import Admin from '~/layout/admin'
import DataTable from '~/components/dataTable/dataTable'
import { createColumnHelper } from '@tanstack/react-table'

export default function IndexProyek() {
    const { data_proyek } = usePage<{ data_proyek: Proyek[] }>().props

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
            await router.delete('/dasboard/proyek/proyek/' + id);
            Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success');
        } else {
            Swal.fire('Cancelled', 'Data tidak dihapus.', 'error');
        }
    };

    type Person = {
        id: number,
        namaProyek: string,
        kodeOrderJob: string,
        pemilik: string
    }

    const columnHelper = createColumnHelper<Person>()

    const columns = [
        columnHelper.accessor('id', {
            header: () => 'No',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('namaProyek', {
            header: () => 'Nama Proyek',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('kodeOrderJob', {
            header: () => 'Kode Job Order',
            cell: info => info.renderValue(),
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
                    <Link href={"/dasboard/proyek/edit/" + info.row.original.id}>
                        <IconEdit size={18} />
                    </Link>
                </div>
            ),
            footer: info => info.column.id,
        }),
    ]

    return (
        <Admin>
            <Card className="p-5">
                <div className="border-b border-gray-200 pb-4">
                    <div className='flex justify-between'>
                        <div>
                            <Link href="/">
                                <p className='text-sm flex gap-1'><IconHome size={18} />Home</p>
                            </Link>
                            <h6 className='text-gray-600 text-lg font-bold'>Proyek</h6>
                        </div>
                        <div>
                            <Link href="/dasboard/proyek/create">
                                <Button className="bg-blue-600 hover:bg-blue-500 text-white btn-small gap-2  hover:text-white" variant="outline">
                                    <IconBriefcase size={18} />
                                    Tambah Proyek
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Card className="mt-3">
                    <DataTable data={data_proyek} columns={columns} />
                </Card>
            </Card>
        </Admin>
    )
}
