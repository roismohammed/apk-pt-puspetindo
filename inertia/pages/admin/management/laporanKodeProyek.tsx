import { usePage } from '@inertiajs/react'
import { IconPrinter } from '@tabler/icons-react';
import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print';
import { Button } from '~/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import Admin from '~/layout/admin'

export default function laporanKodeProyek() {
    const { data_user_login } = usePage().props
    console.log(data_user_login);
    const componentRef = useRef(null);

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
            <div ref={componentRef}>
                <div>
                    <p className='text-2xl font-semibold'>Man Hours Periode Bulan Tahun</p>
                    <div className='flex gap-96'>
                        <p>Dicetak tanggal : </p>
                        <p>{formatDate(new Date())}</p>
                    </div>
                </div>
                <Table className='mt-5 bg-slate-50 '>
                    <TableHeader className='bg-blue-300'>
                        <TableRow className='border-t'>
                            <TableHead className='text-center'>No JE</TableHead>
                            <TableHead className='text-center'>SUM of TOTAL</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className='text-center'>Tidak Ada data</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className='text-center mt-4'>
                    <p className='font-semibold text-md'>Menyetujui</p>


                    <p className='font-semibold text-md mt-20'>Rima Prihastini</p>
                    <small>Finance & Corporate Menagement Division</small>
                </div>
            </div>

            <div>
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