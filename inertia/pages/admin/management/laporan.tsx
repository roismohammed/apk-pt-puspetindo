import { Head, router, usePage } from '@inertiajs/react'
import { IconPlus, IconMinus, IconPrinter, IconFileDownload } from '@tabler/icons-react'
import React, { useRef, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import Admin from '~/layout/admin'
import logoPuspetindo from '../../../img/logo-puspetindo.png'
import ReactToPrint from 'react-to-print'
import Swal from 'sweetalert2'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '~/components/ui/input'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

export default function Laporan() {
  const { data_manhours, data_karyawan, data_proyek,data_user_login } = usePage().props;
  console.log(data_proyek);

  const componentRef = useRef(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(data_manhours);
  const [expandedRows, setExpandedRows] = useState([]);
  const tableRef = useRef(null);
  const [departemen, setDepartemen] = useState('');
  const [proyek, setProyek] = useState('');
  const [kodeJobOrder, setKodeJobOrder] = useState('');

  const karyawanList = Array.isArray(data_karyawan) ? data_karyawan : [];
  console.log(data_karyawan);

  const handlePrint = () => {
    Swal.fire({
      title: 'Data Berhasil Di Tambah!',
      icon: 'success',
      confirmButtonText: 'Okee',
    });
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options).toString(date);
  };



  const handleFilter = (e) => {
    e.preventDefault()
    const params = {};

    if (startDate) {
      params.start_date = startDate;
    }

    if (endDate) {
      params.end_date = endDate;
    }

    if (departemen) {
      params.departemen = departemen;
    }

    if (kodeJobOrder) {
      params.kodeJobOrder = kodeJobOrder;
    }
 
    router.get('/management/laporan', params);
  };

  const toggleRow = (rowId) => {
    setExpandedRows((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  return (
    <Admin  user={data_user_login}>
      <Head title='Laporan' />
      <div ref={componentRef}>
        <>
          <div className="border-b border-gray-200 pb-4">
            <div className='flex justify-center'>
              <img src={logoPuspetindo} alt="Logo Puspetindo" />
            </div>
            <div className="flex items-center mt-2 gap-2">
              <h6 className="text-gray-700 text-md font-semibold">Laporan</h6>
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
              <div className="w-75">
                <Select value={departemen} onValueChange={(value) => setDepartemen(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Departemen" />
                  </SelectTrigger>
                  <SelectContent>
                    {karyawanList.map((data, index) => (
                      <SelectItem key={index} value={data.departemen.id}>
                        {data.departemen.namaDepartemen}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w">
                <Select value={kodeJobOrder} onValueChange={(value) => setKodeJobOrder(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kode Proyek" />
                  </SelectTrigger>
                  <SelectContent>
                    {data_proyek.map((data, index) => (
                      <SelectItem key={index} value={data.kodeJobOrder}>
                        {data.kodeJobOrder} - {data.namaProyek}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type='submit' className='bg-blue-600 text-white hover:bg-blue-500 text-xs py-1.5 rounded-sm px-3' onClick={handleFilter}>Pilih</Button>
            </div>

            <Table className='mt-2 bg-slate-50' ref={tableRef}>
              <TableHeader className='bg-blue-300'>
                <TableRow className='border-t'>
                  <TableHead className="w-[50px]">No</TableHead>
                  <TableHead>Karyawan</TableHead>
                  <TableHead>Departemen</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Total Jam Lembur</TableHead>
                  <TableHead>Total Persentase</TableHead>
                  <TableHead>Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((data, index) => (
                    <React.Fragment key={data.id}>
                      <TableRow>
                        <TableCell className="text-center">{index + 1}</TableCell>
                        <TableCell>{data.nama_karyawan}</TableCell>
                        <TableCell>{data.departemen}</TableCell>
                        <TableCell>{formatDate(data.tanggal)}</TableCell>
                        <TableCell>{data.total_jam} jam</TableCell>
                        <TableCell>{data.total_lembur} jam</TableCell>
                        <TableCell>{data.total_persentase.toFixed(1)}%</TableCell>
                        <TableCell>
                          <Button
                            className="flex items-center bg-transparent hover:bg-transparent"
                            onClick={() => toggleRow(data.id)}
                          >
                            {expandedRows.includes(data.id) ? <IconMinus className='bg-blue-500 rounded-sm' size={20} /> : <IconPlus className='bg-blue-500 rounded-sm' size={20} />}
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expandedRows.includes(data.id) && (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <div className="p-4 bg-gray-100 border-t">
                              <Table className="bg-white">
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Karyawan</TableHead>
                                    <TableHead>Departemen</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>No JE</TableHead>
                                    <TableHead>Jam Kerja</TableHead>
                                    <TableHead>Jam Lembur</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {data.data_laporan.map((detail, detailIndex) => (
                                    <TableRow key={detailIndex}>
                                      <TableCell>{detailIndex + 1}</TableCell>
                                      <TableCell>{detail.karyawan?.nama}</TableCell>
                                      <TableCell>{detail.karyawan?.departemen?.namaDepartemen || "-"}</TableCell>
                                      <TableCell>{formatDate(detail.tanggal)}</TableCell>
                                      <TableCell>{detail.kodeJobOrder}</TableCell>
                                      <TableCell>{detail.jam_kerja} jam</TableCell>
                                      <TableCell>{detail.jam_lembur} jam</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="6" className="text-center">Data tidak ditemukan</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='mt-2 flex justify-end gap-2'>
            <DownloadTableExcel
              filename="users table"
              sheet="users"
              currentTableRef={tableRef.current}
            >
              <Button className='bg-green-600 flex gap-2 hover:bg-green-500'>
                <IconFileDownload className='gap-2' />
                Export
              </Button>
            </DownloadTableExcel>

            <ReactToPrint
              trigger={() => (
                <Button onClick={handlePrint} className='bg-blue-500 flex gap-1 hover:bg-blue-400'>
                  <IconPrinter /> Print
                </Button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </>
      </div>
    </Admin>
  );
}


