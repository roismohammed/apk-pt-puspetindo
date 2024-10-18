import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { IconHome } from '@tabler/icons-react';
import { FormEventHandler, useState } from 'react';
import Swal from 'sweetalert2';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import Admin from '~/layout/admin';

export default function Create({ onSuccess }: { onSuccess: () => void }) {
  const { data_proyek, data_karyawan,data_user_login } = usePage().props;
  console.log(data_proyek);
  { data_proyek }
  const { data, setData, post, processing } = useForm({
    karyawan_id: '',
    proyek_id: '',
    tanggal: '',
    jam_kerja: '',
    jam_lembur: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const validationErrors: { [key: string]: string } = {};
    let isValid = true;

    if (!data.karyawan_id.trim()) {
      validationErrors.karyawan_id = 'Nama Karyawan harus diisi';
      isValid = false;
    }

    if (!data.proyek_id.trim()) {
      validationErrors.proyek_id = 'Nama Proyek harus diisi';
      isValid = false;
    }

    if (!data.tanggal.trim()) {
      validationErrors.tanggal = 'Tanggal harus diisi';
      isValid = false;
    }

    if (!data.jam_kerja.trim()) {
      validationErrors.jam_kerja = 'Jam Kerja harus diisi';
      isValid = false;
    }


    setErrors(validationErrors);

    if (isValid) {
      post('/manhours/create', {
        onSuccess: () => {
          Swal.fire({
            title: 'Data Berhasil Di Tambah!',
            icon: 'success',
            confirmButtonText: 'Okee',
          });
        }
      });
    }
  };

  return (
    <Admin user={data_user_login}>
      <Head>
        <title>create</title>
      </Head>
      <div>
        <div className="border-b border-gray-200 pb-4">
          <div className='flex justify-between'>
            <div>
              <div className='flex gap-1'>
                <Link href="/">
                  <p className='text-sm flex gap-1 hover:text-gray-500 '><IconHome size={18} />Home</p>
                </Link>
                <small>/</small>

                <Link href='/manhours'>
                  <p className="text-sm hover:text-gray-500 ">Man Hours</p>
                </Link>
              </div>
              <h6 className='text-gray-600 text-lg font-bold'>Tambah Man Hours</h6>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="grid grid-cols-2 gap-4">

            {/* Pilih Proyek */}
            <div className="flex flex-col space-y-1.5">
              <Label>Pilih Proyek:</Label>
              <Select onValueChange={(value) => setData('proyek_id', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Proyek" />
                </SelectTrigger>
                <SelectContent>
                  {data_proyek.map((data) => (
                    <SelectItem key={data.id} value={data.id.toString()}>
                      {data.kodeJobOrder} - {data.namaProyek}
                    </SelectItem>
                  ))}

                </SelectContent>
              </Select>
              {errors.proyek_id && (
                <small className="text-red-600">{errors.proyek_id}</small>
              )}
            </div>

            {/* Pilih Karyawan */}
            <div className="flex flex-col space-y-1.5">
              <Label>Pilih Karyawan:</Label>
              <Select onValueChange={(value) => setData('karyawan_id', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Karyawan" />
                </SelectTrigger>
                <SelectContent>
                  {data_karyawan.map((data) => (
                    <SelectItem key={data.id} value={data.id.toString()}>
                      {data.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.karyawan_id && (
                <small className="text-red-600">{errors.karyawan_id}</small>
              )}
            </div>



            {/* Tanggal */}
            <div className="flex flex-col space-y-1.5">
              <Label>Tanggal:</Label>
              <Input
                type="date"
                name="tanggal"
                value={data.tanggal}
                onChange={(e) => setData('tanggal', e.target.value)}
                className="w-full"
              />
              {errors.tanggal && (
                <small className="text-red-600">{errors.tanggal}</small>
              )}
            </div>

            {/* Jam Kerja */}
            <div className="flex flex-col space-y-1.5">
              <Label>Jam Kerja:</Label>
              <Input
                type="text"
                placeholder="Jam Kerja"
                name="jam_kerja"
                value={data.jam_kerja}
                onChange={(e) => setData('jam_kerja', e.target.value)}
                className="w-full"
              />
              {errors.jam_kerja && (
                <small className="text-red-600">{errors.jam_kerja}</small>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Jam Lembur:</Label>
              <Input
                type="text"
                placeholder="Jam Lembur"
                name="jam_lembur"
                value={data.jam_lembur}
                onChange={(e) => setData('jam_lembur', e.target.value)}
                className="w-full"
              />
            </div>

          </div>

          {/* Button Simpan */}
          <Button
            className="bg-blue-600 mt-5 hover:bg-blue-500"
            type="submit"
            disabled={processing}
          >
            Simpan
          </Button>
        </form>

      </div>
    </Admin>
  );
}
