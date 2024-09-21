import { Head, usePage } from '@inertiajs/react';
import { IconPrinter } from '@tabler/icons-react';
import React, { useRef } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import Admin from '~/layout/admin';
import ReactToPrint from 'react-to-print';
import Swal from 'sweetalert2';

export default function Laporan() {
  const { data_tiketing } = usePage().props;
  const componentRef = useRef(null);

  // Sort data by ID
  const sortedData = data_tiketing.sort((a, b) => a.id - b.id);

  // Function to show alert when report is added
  const handlePrint = () => {
    Swal.fire({
      title: 'Laporan Tiketing Berhasil Disubmit!',
      text: 'Data berhasil dicetak',
      icon: 'success',
      confirmButtonText: 'Oke',
    });
  };

  return (
    <Admin>
      <Head>
        <title>Laporan Tiketing</title>
      </Head>
      <Card className="p-5">
        <p className="font-semibold text-md">Laporan Tiketing</p>
        {/* Wrap the content that needs to be printed inside a ref */}
        <div ref={componentRef}>
          <div className="grid grid-cols-2 mt-2 gap-3">
            {sortedData.map((data) => (
              <Card key={data.id} className="rounded-sm relative">
                <CardContent className="mt-6">
                  <p>Problem: {data.problem}</p>
                  <p className="pb-4">Keterangan: {data.keterangan}</p>
                  <p className="absolute bottom-2 right-3 text-end">
                    {new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(data.tanggal))}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ReactToPrint component */}
        <ReactToPrint
          trigger={() => (
            <Button className="bg-blue-500 mt-2 flex gap-1 hover:bg-blue-400">
              <IconPrinter /> Print
            </Button>
          )}
          content={() => componentRef.current}
          documentTitle="Laporan Tiketing"
          pageStyle="@media print { body { -webkit-print-color-adjust: exact; } }" // Optional: adjust print styling
        />
      </Card>
    </Admin>
  );
}
