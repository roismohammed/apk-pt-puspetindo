import { FormEventHandler, useEffect, useState } from 'react';
import { Head, Link, usePage, router, useForm } from '@inertiajs/react';
import Admin from '~/layout/admin';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Button } from '~/components/ui/button';
import { toast } from 'sonner';

export default function Index() {
  const { data_manhours, data_all_manhours } = usePage().props;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [proyek, setProyek] = useState('');
  const [verify, setVerify] = useState([]);
  const { data, setData, post, processing } = useForm({ verify: [] });

  const handleFilter = () => {
    const params: any = {};

    if (startDate) {
      params.start_date = startDate;
    }

    if (endDate) {
      params.end_date = endDate;
    }

    if (proyek) {
      params.proyek = proyek;
    }
    router.get('/project', params); 
  };


  const handleVerify = (e, row) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setVerify([...verify, row.id]);
    } else {
      setVerify(verify.filter((r) => r !== row.id));
    }
  };

  useEffect(() => {
    console.log(verify);
    setData("verify", verify); 
  }, [verify]);

  const handleSubmit = () => {
    router.post('/project/manhours/verify', { 
      data: verify,
    }, {
      onSuccess: () => {
        toast.success('Data Berhasil Diupdate!');
      },
      onError: () => {
        toast.error('Data Gagal Diupdate!');
      } 
    });
  };

  const handleReject = () => {
    router.post('/project/manhours/reject', { 
      data: verify,
    }, {

      onSuccess: () => {
        toast.success('Data Berhasil Diupdate!');
      },
      onError: () => {
        toast.error('Data Gagal Diupdate!');
      } 
    });
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
  };

  return (
    <Admin>
      <Head>
        <title>Project Management</title>
      </Head>
      <div>
        <h6 className="text-gray-600 text-center text-3xl font-bold">
          Cost Control
        </h6>

        <div className="mt-3">
          <div className="flex items-center mt-2 gap-2">
            <h6 className="text-gray-700 text-md font-semibold">Tanggal</h6>
            <div className="flex items-center mx-1 space-x-2">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded-sm p-0.5 text-sm"
              />
              <span className="text-xs">sampai</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded-sm p-0.5 text-sm"
              />
            </div>
            <div className="w-[450px]">
              <Select onValueChange={(value) => setProyek(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Proyek & No JE" />
                </SelectTrigger>
                <SelectContent>
                  {data_all_manhours.map((data, index) => (
                    <SelectItem key={index} value={index}>
                      {data.proyek.namaProyek} - {data.proyek.kodeJobOrder}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleFilter}
              className="bg-blue-600 text-white hover:bg-blue-500 text-xs py-1.5 rounded-sm px-3"
            >
              Pilih
            </Button>
          </div>

          <Card className="mt-3 rounded-sm">
            <Table>
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Proyek & No JE</TableHead>
                  <TableHead>Jam Kerja</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right gap-2">
                  <p
                      onClick={handleReject}
                      className="bg-red-600 inline-block mx-2 hover:bg-red-500 cursor-pointer text-white text-xs py-1.5 rounded-sm px-3"
                    >
                      Tolak
                    </p>

                    <p
                      onClick={handleSubmit}
                      className="bg-blue-600 inline-block hover:bg-blue-500 cursor-pointer text-white text-xs py-1.5 rounded-sm px-3"
                    >
                      Konfirmasi
                    </p>
                    
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data_all_manhours.length > 0 ? (
                  data_all_manhours.map((data, index) => (
                    <TableRow key={data.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {data.karyawan.nama}
                      </TableCell>
                      <TableCell>{data.proyek.namaProyek} - {data.proyek.kodeJobOrder}</TableCell>
                      <TableCell>{data.jamKerja} Jam</TableCell>
                      <TableCell>{formatDate(data.tanggal)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end mx-6">
                          <Input
                            type="checkbox"
                            className="w-4 h-4"
                            onChange={(e) => handleVerify(e, data)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Tidak ada data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </Admin>
  );
}
