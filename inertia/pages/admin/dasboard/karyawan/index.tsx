import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IconBuildingArch, IconEdit, IconFileDownload, IconHome, IconTrash, IconUserPlus } from '@tabler/icons-react';
import Admin from '~/layout/admin';
import { Head, Link, router, usePage } from "@inertiajs/react";
import Swal from 'sweetalert2'
import DataTable from '~/components/dataTable/dataTable'
import { createColumnHelper } from "@tanstack/react-table";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useRef } from 'react';
export default function Index() {
    const { data_karyawan, data_user,data_user_login } = usePage().props;
    console.log(data_user)
    const tableRef = useRef(null);
    const handleDelete = async (id:any) => {
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
                await router.delete(`/karyawan/delete/${id}`);
                Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data.', 'error');
            }
        }
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
        return new Date(date).toLocaleDateString('id-ID', options)
      }

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('id', {
            header: 'No',
            cell: info => info.row.index + 1,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('nama', {
            header: 'Nama',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('nik', {
            header: 'NIK',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('departemen', {
            header: 'Departemen',
            cell: info => info.row.original?.departemen?.namaDepartemen,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('jabatan', {
            header: 'Jabatan',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('tempatLahir', {
            header: 'Tempat Lahir',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('tanggalLahir', {
            header: 'Tanggal Lahir',
            cell: info => {
                const rawDate = info.getValue();
                const formattedDate = new Date(rawDate).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
                return formattedDate;
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('usia', {
            header: 'Usia',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('jenisKelamin', {
            header: 'Jenis Kelamin',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('pendidikan', {
            header: 'Pendidikan ',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('jurusan', {
            header: 'Jurusan',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('bpjsKk', {
            header: 'BPJS ketenaga kerjaan',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('bpjsKesehatan', {
            header: 'BPJS kesehatan',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('noRekening', {
            header: 'No. Rekening',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('namaBank', {
            header: 'Nama Bank',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: info => {
                const status = info.getValue();
                const statusClass = status === 'aktif' ? 'bg-blue-300 text-black' : 'bg-yellow-300 text-black';
                return <span className={`px-2 py-1 rounded ${statusClass}`}>{status}</span>;
            },
            footer: info => info.column.id,
        }),
        columnHelper.display({
            id: 'aksi',
            header: 'Aksi',
            cell: info => (
                <div className="flex gap-3">
                    <span
                        onClick={() => handleDelete(info.row.original.id)}
                        className="text-red-900 cursor-pointer"
                    >
                        <IconTrash size={18} />
                    </span>
                    <Link href={`/karyawan/edit/${info.row.original.id}`}>
                        <IconEdit size={18} />
                    </Link>
                </div>
            ),
            footer: info => info.column.id,
        }),
    ];

    return (
        <Admin  user={data_user_login}>
            <Head title="karyawans" />
            <div className='lg:w-[1120px]'>
                <div className="border-b border-gray-200 pb-4">
                    <div className='flex justify-between '>
                        <div>
                            <Link href="/">
                                <p className='text-sm flex hover:text-gray-500  gap-1 items-center'><IconHome size={18} />Home</p>
                            </Link>
                            <h6 className='text-gray-600 text-lg font-bold '>Data Karyawans</h6>
                        </div>

                        <div className="flex gap-2">
                            <Link href="/departemen">
                                <Button className="bg-blue-600 hover:bg-blue-500 text-white btn-small gap-2 hover:text-white" variant="outline">
                                    <IconBuildingArch size={18} />
                                    Departemen
                                </Button>
                            </Link>
                            <Link href="/karyawan/create">
                                <Button className="bg-blue-600 hover:bg-blue-500 text-white btn-small gap-2 hover:text-white" variant="outline">
                                    <IconUserPlus size={18} />
                                    Tambah Karyawan
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-4" ref={tableRef}>
                    <DataTable data={data_karyawan} columns={columns} />
                    <div className='flex justify-end'>
                        <DownloadTableExcel
                            filename="karyawan table"
                            sheet="karyawan"
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
        </Admin>
    );
}