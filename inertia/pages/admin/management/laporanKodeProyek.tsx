import { router, usePage } from '@inertiajs/react'
import { IconPrinter } from '@tabler/icons-react';
import React, { useRef, useState } from 'react'
import ReactToPrint from 'react-to-print';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import Admin from '~/layout/admin'

export default function laporanKodeProyek() {
    const { data_user_login, data_manhours } = usePage().props
    console.log(data_manhours);
    const componentRef = useRef(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredData, setFilteredData] = useState(data_manhours);
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

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
    return (
        <Admin>
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
                    <Select >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Departemen" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* {karyawanList.map((data, index) => (
                      <SelectItem key={index} value={data.departemen.id}>
                        {data.departemen.namaDepartemen}
                      </SelectItem>
                    ))} */}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Kode Proyek" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* {data_proyek.map((data, index) => (
                      <SelectItem key={index} value={data.kodeJobOrder}>
                        {data.kodeJobOrder} - {data.namaProyek}
                      </SelectItem>
                    ))} */}
                        </SelectContent>
                    </Select>
                </div>
                <Button type='submit' className='bg-blue-600 text-white hover:bg-blue-500 text-xs py-1.5 rounded-sm px-3' onClick={handleFilter}>Pilih</Button>
            </div>

            <div ref={componentRef} className='px-5 mt-5'>
                <div>
                    <p className='text-2xl font-semibold'>Man Hours Periode Bulan Tahun</p>
                    <div className='flex gap-96'>
                        <p>Dicetak tanggal : </p>
                        <p>{formatDate(new Date())}</p>
                    </div>
                </div>
                <Table className='mt-5 bg-slate-50'>
                    <TableHeader className='bg-blue-300'>
                        <TableRow className='border-t'>
                            <TableHead className='text-center'>No JE</TableHead>
                            <TableHead className='text-center'>SUM of TOTAL</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2} className='text-center'>Tidak Ada data</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell className='text-left p-2'>Grand Total :</TableCell>
                            <TableCell className='text-right p-2'>352</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

                <div className='text-center mt-4'>
                    <p className='font-semibold text-md'>Menyetujui</p>


                    <p className='font-semibold text-md mt-20'>Rima Prihastini</p>
                    <small>Finance & Corporate Menagement Division</small>
                </div>
            </div>

            <div className='px-5'>
                <ReactToPrint
                    trigger={() => (
                        <Button className="bg-blue-600 text-white hover:bg-blue-500 text-xs py-2 px-4 rounded-sm">
                            <IconPrinter className="mr-2" size={18} />
                            Print Laporan
                        </Button>
                    )}
                    content={() => componentRef.current}
                />
            </div>
        </Admin>
    )
}


{/* {filteredData.length > 0 ? (
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
                        
                        </TableRow>
                      </React.Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                      Silakan pilih data untuk menampilkan laporan.
                      </TableCell>
                    </TableRow>
                  )} */}