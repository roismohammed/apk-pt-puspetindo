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
  const { data_manhours, data_karyawan, data_proyek, data_user_login } = usePage().props;

  const componentRef = useRef(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(data_manhours);
  console.log(startDate);
  const [expandedRows, setExpandedRows] = useState([]);
  const tableRef = useRef(null);
  const [departemen, setDepartemen] = useState('');
  const [proyek, setProyek] = useState('');
  const [kodeJobOrder, setKodeJobOrder] = useState('');
  const karyawanList = Array.isArray(data_karyawan) ? data_karyawan : [];


  const handleFilter = (e) => {
    e.preventDefault();
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <Admin user={data_user_login}>
      <Head title='Laporan' />
      <div>
        <>
          <div className="border-b border-gray-200 pb-4">
            <div className='flex justify-center'>
              <img src={logoPuspetindo} alt="Logo Puspetindo" />
            </div>

            <div className="flex items-center mt-2 gap-2 px-5">
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

            <div ref={componentRef} className='p-5'>
              <div className='mt-'>
                <p className='text-gray-700 text-sm font-semibold'>Di cetak Tanggal : {formatDate(new Date())}</p>
                <p className='text-gray-700 text-sm font-semibold'>Departemen : {departemen ? karyawanList.find(d => d.departemen.id === departemen)?.departemen?.namaDepartemen : '-'}</p>
                <p className='text-gray-700 text-sm font-semibold'>Kode Proyek : {kodeJobOrder ? `${kodeJobOrder} - ${data_proyek.find(p => p.kodeJobOrder === kodeJobOrder)?.namaProyek}` : '-'}</p>
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
                        <TableRow className="py-0">
                          <TableCell className="text-center">{index + 1}</TableCell>
                          <TableCell>{data.nama_karyawan}</TableCell>
                          <TableCell>{data.departemen}</TableCell>
                          <TableCell>{formatDate(data.tanggal)} </TableCell>
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
                      <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                      Silakan pilih data untuk menampilkan laporan.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

          </div>
        </>
      </div>

      <div className='mt-4 px-6 flex gap-2'>
        <ReactToPrint
          trigger={() => (
            <Button className="bg-blue-600 text-white hover:bg-blue-500 text-xs py-2 px-4 rounded-sm">
              <IconPrinter className="mr-2" size={18} />
              Print Laporan
            </Button>
          )}
          content={() => componentRef.current}
        />
        <DownloadTableExcel
          filename="laporan-table"
          sheet="Laporan"
          currentTableRef={tableRef.current}
        >
          <Button className="bg-green-600 text-white hover:bg-green-500 text-xs py-2 px-4 rounded-sm">
            <IconFileDownload className="mr-2" size={18} />
            Export Excel
          </Button>
        </DownloadTableExcel>
      </div>
    </Admin>
  );
}
