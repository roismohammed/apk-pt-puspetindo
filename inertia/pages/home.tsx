import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Head, Link, usePage } from "@inertiajs/react";
import { IconBriefcase, IconHome, IconReceipt, IconUsers } from '@tabler/icons-react';
import Admin from '~/layout/admin';
import 'animate.css';

export default function Index() {
  const { data_user_login } = usePage().props;

  const aktivitasList = [
    "Apa yang ingin kamu capai hari ini?",
    "Apakah ada tugas penting yang perlu diselesaikan?",
    "Aktivitas apa yang paling menarik untuk dikerjakan hari ini?",
    "Bagaimana rencana kamu untuk meningkatkan produktivitas?",
    "Sudahkah kamu mengatur prioritas pekerjaan hari ini?"
  ];

  const randomAktivitas = aktivitasList[Math.floor(Math.random() * aktivitasList.length)];

  return (
    <Admin user={data_user_login}>
      <Head title="beranda" />
      <div className=" animate__animated animate__fadeIn">
        <div className="">
          <div className='border-b border-gray-200 pb-4'>
            <div>
              <p className='text-sm flex items-center gap-1'>
                <IconHome size={18} />Home
              </p>
              <h6 className='font-bold text-lg text-gray-600'>Dashboard</h6>
            </div>
          </div>

          <div className='mt-5'>
            <h1 className='text-2xl font-bold'>Halo 👏
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">{data_user_login.nama}
              </span>
            </h1>

            <p className='text-gray-600 text-sm'>{randomAktivitas}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div>
            {data_user_login?.jabatan === 'IT Software' ? (
              <Link href="/proyek">
                <Card className="relative border-solid border-2 border-sky-500">
                  <CardHeader>
                    <div className='flex items-center gap-2'>
                      <IconBriefcase size={40} />
                      <CardTitle className="text-xl">Data Proyek</CardTitle>
                    </div>
                    <CardDescription>Kamu dapat membuat Proyek secara otomatis.</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ) : null}

          </div>

          <div>
            {data_user_login?.jabatan === 'IT Software' ? (
              <Link href="/karyawan">
              <Card className="relative border-solid border-2 border-green-500">
                <CardHeader>
                  <div className='flex items-center gap-2'>
                    <IconUsers size={40} />
                    <CardTitle className="text-xl">Data Karyawan</CardTitle>
                  </div>
                  <CardDescription>Kamu dapat Melihat Data Karyawan secara otomatis.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            ): null}
          </div>

          <div>
            {data_user_login?.jabatan === 'IT Software' ? (
              <Link href="/management/laporan">
              <Card className="relative border-solid border-2 border-yellow-200">
                <CardHeader>
                  <div className='flex items-center gap-2'>
                    <IconReceipt size={40} />
                    <CardTitle className="text-xl">Laporan Manhours</CardTitle>
                  </div>
                  <CardDescription>Kamu dapat melihat rekap Laporan secara otomatis.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            ):null}
          </div>

        </div>
      </div>
    </Admin>
  );
}
