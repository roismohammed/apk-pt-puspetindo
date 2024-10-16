import { Head, Link, router, usePage } from '@inertiajs/react';
import { IconBriefcase, IconHome, IconTrash } from '@tabler/icons-react';
import React from 'react';
import { Button } from '~/components/ui/button';
import Admin from '~/layout/admin';
import DataTable from '~/components/dataTable/dataTable';
import { createColumnHelper } from '@tanstack/react-table';
import Swal from 'sweetalert2';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

export default function Index() {
  const { data_manHours,user ,data_karyawan} = usePage().props;

  const columnHelper = createColumnHelper<any>();

  const handleDelete = async (id) => {
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
      await router.delete('/manhours/delete/' + id);
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success');
    } else {
      Swal.fire('Cancelled', 'Data tidak dihapus.', 'error');
    }
  };

  const verifikasi = [
    { value: 'Diterima', label: 'Diterima' },
    { value: 'Ditolak', label: 'Ditolak' },
    { value: 'Pending', label: 'Pending' },
  ];

  const columns = [
    columnHelper.accessor('id', {
      header: () => 'No',
      cell: (info) => info.row.index + 1,
    }),
  
    columnHelper.accessor('proyek.namaProyek', {
      header: () => 'Nama Proyek (Kode Proyek)',
      cell: (info) => {
        const namaProyek = info.row.original?.proyek?.namaProyek || 'data tidak ada';
        const kodeProyek = info.row.original?.proyek?.kodeJobOrder || 'kode tidak ada';
        return `${namaProyek} (${kodeProyek})`;
      },
    }),
  
    columnHelper.accessor('nama', {
      header: () => 'Nama Karyawan',
      cell: (info) => info.row.original?.karyawan?.nama || 'data tidak ada',
    }),
  
    columnHelper.accessor('karyawan.departemen.namaDepartemen', {
      header: 'Departemen',
      cell: (info) => info.row.original?.departemen?.namaDepartemen || '-',
      footer: (info) => info.column.id,
    }),
  
    columnHelper.accessor('tanggal', {
      header: () => 'Tanggal',
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
  
    columnHelper.accessor('jamKerja', {
      header: () => 'Jam Kerja',
      cell: (info) => `${info.getValue()} jam`,
    }),
  
    columnHelper.accessor('jamLembur', {
      header: () => 'Jam Lembur',
      cell: (info) => {
        const jamLembur = info.getValue();
        return jamLembur && jamLembur > 0 ? `${jamLembur} jam` : 'Tidak Ada kerja lembur';
      },
    }),
  
    columnHelper.accessor('verifikasi', {
      header: () => 'Verifikasi',
      cell: (info) => {
        if (info.row.original.verifikasi === '' || info.row.original.verifikasi === null) {
          const status = 'Pending';
          const statusClass = 'text-blue-600 bg-blue-100 py-1 px-2 rounded';
          return <span className={statusClass}>{status}</span>;
        } else if (info.getValue() === 'Ditolak') {
          const status = 'Ditolak';
          const statusClass = 'text-red-600 bg-red-100 py-1 px-2 rounded';
          return <span className={statusClass}>{status}</span>;
        } else {
          const status = info.getValue();
          const statusClass = status === 'Diterima' ? 'text-green-600 bg-green-100 py-1 px-2 rounded' : 'text-red-600 bg-red-100 py-1 px-2 rounded';
          return <span className={statusClass}>{status}</span>;
        }
        
      },
    }),
  
    columnHelper.display({
      id: 'aksi',
      header: () => 'Aksi',
      cell: (info) => (
        <div className="flex gap-3">
          <span onClick={() => handleDelete(info.row.original.id)} className="text-red-900 cursor-pointer">
            <IconTrash size={18} />
          </span>
        </div>
      ),
    }),
  ];
  

  return (
    <Admin user={data_karyawan}>
      <Head title="Man Hours" />
      <div>
        <div className="border-b border-gray-200 pb-4">
          <div className="flex justify-between">
            <div>
              <Link href="/">
                <p className="text-sm flex gap-1 hover:text-gray-500">
                  <IconHome size={18} />
                  Home
                </p>
              </Link>
              <h6 className="text-gray-600 text-lg font-bold">Man Hours</h6>
            </div>
            <div>
              <Link href="/manhours/create">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white btn-small gap-2 hover:text-white" variant="outline">
                  <IconBriefcase size={18} />
                  Tambah Manhours
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center mt-2 gap-2">
          <h6 className="text-gray-700 text-md font-semibold">Tanggal</h6>
          <div className="flex items-center mx-1 space-x-2">
            <Input type="date" className="border rounded-sm p-0.5 text-sm" />
            <span className="text-xs">sampai</span>
            <Input type="date" className="border rounded-sm p-0.5 text-sm" />
          </div>

        
          {/* {user?.jabatan === 'IT Software' && (
            <div className="w-75">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Departemen" />
                </SelectTrigger>
                <SelectContent>
                  {data_karyawan.map((data, index) => (
                    <SelectItem key={index} value={data.departemen.id}>
                      {data.departemen.namaDepartemen}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )} */}
           <div className="w-75">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Departemen" />
                </SelectTrigger>
                <SelectContent>
                  {/* {data_karyawan.map((data, index) => (
                    <SelectItem key={index} value={data.departemen.id}>
                      {data.departemen.namaDepartemen}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
            </div>


          <div className="w-75">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kode Proyek" />
              </SelectTrigger>
              <SelectContent>
              {/* {data_proyek.map((data, index) => (
                <SelectItem key={index} value={data.kodeJobOrder}>
               {data.kodeJobOrder}
                </SelectItem>
              ))} */}
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-blue-600 text-white hover:bg-blue-500 text-xs py-1.5 rounded-sm px-3">Pilih</Button>
        </div>

        <DataTable data={data_manHours} columns={columns} />
      </div>
    </Admin>
  );
}
