import { IconCloudDownload, IconFileTypePdf, IconHome, IconTrash } from '@tabler/icons-react';
import { Card, CardContent } from '~/components/ui/card';
import Admin from '~/layout/admin';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Input } from '~/components/ui/input';
import React, { useState } from 'react';
import Swal from 'sweetalert2';


export default function Detail({ data_ppwi, data_user_login }: any) {
console.log(data_user_login);


  const [searchQuery, setSearchQuery] = useState('');

  const filteredPpwi = data_ppwi.filter((ppwi: any) =>
    ppwi.namaFile.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (namaFile: any) => {
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
      await router.delete('/ppwi/delete/' + namaFile);
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success');
    } else {
      Swal.fire('Cancelled', 'Data tidak dihapus.', 'error');
    }
  };



  return (
    <Admin user={data_user_login}>
      <Head>
        <title>Detail</title>
      </Head>
      <div className="flex justify-between">
        <div className="flex gap-1">
          <Link href="/">
            <p className="text-sm flex gap-1 hover:text-gray-500 hover:border-dashed">
              <IconHome size={18} />Home
            </p>
          </Link>
          <small>/</small>
          <Link href="/ppwi">
            <p className="text-sm hover:text-gray-500">ppwi</p>
          </Link>
        </div>
        <div className="-mt-">
          <Input
            placeholder="Cari nama file..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[323px]"
          />
        </div>
      </div>

      {/* Tombol Pilih Semua */}
      <div className="-mt-2">
        <label className="flex items-center space-x-2">
          {/* <Input
            className="text-blue-600 hover:bg-gray-100 duration-300 border rounded-sm w-4 border-slate-200 hover:text-blue-800 cursor-pointer"
            type="checkbox"
          />
          <span>Pilih Semua</span> */}
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-7">
        {filteredPpwi.length > 0 ? (
          filteredPpwi.map((data: any) => (
            <Card
              key={data.id}
              className="relative rounded-sm p-6 flex items-center justify-center"
            >
              <CardContent className="p-3 flex flex-col items-center justify-center relative">
                <div className="flex flex-col items-center justify-center">
                  <IconFileTypePdf size={54} className="text-green-600" />
                  <p className="mt-2">{data.namaFile}</p>
                </div>
              </CardContent>
              <div className="absolute w-full flex justify-end mt-28 p-2">

                <div className="flex items-center space-x-2">
                  <a href={`/ppwi/download/${data.namaFile}`}>
                    <IconCloudDownload
                      size={24}
                      className="text-blue-600 hover:bg-gray-100 duration-300 border rounded-sm w-8 border-slate-200 hover:text-blue-800 cursor-pointer"
                    />
                  </a>
                  {data_user_login?.jabatan === 'IT Software' ? (
                    <IconTrash
                      size={24}
                      className="text-red-600 hover:bg-gray-100 duration-300 border rounded-sm w-8 border-slate-200 hover:text-red-800 cursor-pointer"
                      onClick={() => handleDelete(data.namaFile)}
                    />
                  ) : null}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-4 text-center py-8">
            <p className="text-gray-500 text-xl">Data tidak ditemukan.</p>
          </div>
        )}
      </div>

      {/* AlertDialog untuk konfirmasi penghapusan */}
      {/* <AlertDialog open={open} onOpenChange={setOpen} >
        <AlertDialogTrigger asChild>
          <Button style={{ display: 'none' }}>Trigger</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className='h-44'>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah anda yakin ingin menghapus file ini?</AlertDialogTitle>
            <AlertDialogDescription>
              File yang di hapus tidak dapat dikembalikan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)} >Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className='bg-blue-600 hover:bg-blue-500 text-white'>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </Admin>
  );
}
