import { Head, Link, usePage } from '@inertiajs/react'
import { IconCheck, IconEye, IconEyeOff, IconHome, IconX } from '@tabler/icons-react'
import React, { FormEventHandler, useEffect, useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import Admin from '~/layout/admin'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const statuses = [
    {
        value: "aktif",
        label: "Aktif",
    },
    {
        value: "Tidak-aktif",
        label: "Tidak-aktif",
    }
]

const jenisKelamin = [
    {
        value: 'Laki-laki',
        label: 'Laki-laki'
    },
    {
        value: 'Perempuan',
        label: 'Perempuan'
    }
]

const jabatans = [
    {
        value: "manager",
        label: "Manager",
    },
    {
        value: "staff",
        label: "Staff",
    },
    {
        value: "IT Software",
        label: "IT Software",
    },
    {
        value: "HR IT",
        label: "HR IT",
    }
]

const pendidikan = [
    {
        value: "SMA",
        label: "SMA",
    },
    {
        value: "SMK",
        label: "SMK",
    },
    {
        value: "S1",
        label: "S1",
    },
    {
        value: "S2",
        label: "S2",
    },
    {
        value: "S3",
        label: "S3",
    },
]

const nama_bank = [
    {
        value: "BRI",
        label: "BRI",
    },
    {
        value: "BCA",
        label: "BCA",
    },
    {
        value: "BNI",
        label: "BNI",
    },
    {
        value: "Mandiri",
        label: "Mandiri",
    },
    {
        value: "Bank Jatim",
        label: "Bank Jatim",
    },
]

export default function Create({flash}) {
    const { data_departemen, data_karyawan ,nik,data_user_login } = usePage().props
    const { data, setData, post, processing } = useForm({
        nama: '',
        nik: '',
        departemen_Id: '',
        jabatan: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        usia: '',
        jenis_kelamin: '',
        pendidikan: '',
        jurusan: '',
        bpjs_kk: '',
        bpjs_kesehatan: '',
        no_rekening: '',
        nama_bank: '',
        status: '',
        email: '',
        password: ''
    })
    const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredKaryawan, setFilteredKaryawan] = useState(data_karyawan);
    const [errors, setErrors] = useState({ nik: "" });
    const [nikExists, setNikExists] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        const validationErrors: any = {};
        let isValid = true;

        if (data.nama.trim() === '') {
            validationErrors.nama = 'Nama harus diisi';
            isValid = false;
        }

        if (data.nik.trim() === '') {
            validationErrors.nik = 'NIK harus diisi';
            isValid = false;
        }

        if (data.departemen_Id === '') {
            validationErrors.departemen_Id = 'Departemen harus dipilih';
            isValid = false;
        }

        if (data.status.trim() === '') {
            validationErrors.status = 'Status harus dipilih';
            isValid = false;
        }

        if (data.jabatan.trim() === '') {
            validationErrors.jabatan = 'Jabatan harus dipilih';
            isValid = false;
        }

        if (data.tempat_lahir.trim() === '') {
            validationErrors.tempat_lahir = 'Tempat Lahir harus di isi';
            isValid = false;
        }

        if (data.tanggal_lahir.trim() === '') {
            validationErrors.tanggal_lahir = 'Tanggal Lahir harus di isi';
            isValid = false;
        }

        if (data.usia.trim() === '') {
            validationErrors.usia = 'Usia harus di isi';
            isValid = false;
        } else if (isNaN(Number(data.usia))) {
            validationErrors.usia = 'Usia harus berupa angka';
            isValid = false;
        }

        if (data.jenis_kelamin.trim() === '') {
            validationErrors.jenis_kelamin = ' Pilih Jenis Kelamin';
            isValid = false;
        }

        if (data.pendidikan.trim() === '') {
            validationErrors.pendidikan = 'Pendidikan harus di isi';
            isValid = false;
        }

        if (data.jurusan.trim() === '') {
            validationErrors.jurusan = 'Jurusan harus di isi';
            isValid = false;
        }

        if (data.bpjs_kk.trim() === '') {
            validationErrors.bpjs_kk = 'bpjs harus di isi';
            isValid = false;
        }

        if (data.bpjs_kesehatan.trim() === '') {
            validationErrors.bpjs_kesehatan = 'BPJS kesehatan harus di isi';
            isValid = false;
        }

        if (data.no_rekening.trim() === '') {
            validationErrors.no_rekening = 'Nomor Rekening harus di isi';
            isValid = false;
        }

        if (data.nama_bank.trim() === '') {
            validationErrors.nama_bank = 'Nama Bank harus di isi';
            isValid = false;
        }

        if (data.email.trim() === '') {
            validationErrors.email = 'Email harus dilengkapi';
            isValid = false;
        } else {
            if (isDuplicateEmail) {
                setIsDuplicateEmail(true);
                validationErrors.email = 'Email sudah terdaftar';
                isValid = false;
            }
        }

        if (data.password.trim() === '') {
            validationErrors.password = 'password harus di lengkapi';
            isValid = false;
        }

    
        

        setErrors(validationErrors);

        if (isValid) {
            post('/karyawan/create', {
                onSuccess: () => {
                    Swal.fire({
                        title: 'Data Berhasil Di Tambah!',
                        icon: 'success',
                        confirmButtonText: 'Okee',
                    });
                }
            });
            
        }
    }
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

  
    return (
        <Admin user={data_user_login}>
            <Head title='add-karyawan' />

            <div>
                <div className="border-b border-gray-200 pb-4">
                    <div className='flex justify-between'>
                        <div>
                            <div className='flex gap-1'>
                                <Link href="/">
                                    <p className='text-sm flex gap-1 hover:text-gray-500 '><IconHome size={18} />Home</p>
                                </Link>
                                <small>/</small>

                                <Link href='/karyawan'>
                                    <p className="text-sm hover:text-gray-500 ">karyawan</p>
                                </Link>
                            </div>

                            <h6 className='text-gray-600 text-lg font-bold'>Add karyawan</h6>
                        </div>
                    </div>
                </div>

                <form className='mt-5' onSubmit={handleSubmit}>
                    <ToastContainer />
                    <div className='my-5'>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="nik">NIK:</Label>
                                <div className="relative">
                                    <Input
                                        id="nik"
                                        placeholder="Masukkan NIK"
                                        name="nik"
                                        onChange={(e) => setData('nik', e.target.value)}
                                        value={data.nik}
                                        className="focus-visible:ring-0 focus:border-blue-600"
                                    />
                                    {/* Menampilkan ikon X merah atau centang hijau berdasarkan validasi */}
                                    {data.nik && (
                                        <span className="absolute right-3 top-2.5">
                                            {nikExists ? (
                                                <IconX  className="text-red-600" size={20} />
                                            ) : (
                                                <IconCheck className="text-green-600" size={20} />
                                            )}
                                        </span>
                                    )}
                                </div>
                                {/* Pesan error jika NIK sudah ada */}
                                {errors.nik && <small className="text-red-600">{errors.nik}</small>}
                            </div>


                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="nama">Nama:</Label>
                                <Input
                                    id="nama"
                                    placeholder="Masukkan Nama"
                                    onChange={(e) => setData('nama', e.target.value)}
                                    name='nama'
                                    value={data.nama}
                                    className='focus-visible:ring-0 focus:border-blue-600'
                                />
                                {errors.nama && <small className="text-red-600">{errors.nama}</small>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label>Pilih Departemen:</Label>
                                <Select
                                    onValueChange={(value) => setData('departemen_Id', value)}
                                >
                                    <SelectTrigger className="w-full focus:ring-0 focus:border-blue-600 focus:outline-none">
                                        <SelectValue placeholder="Pilih Departemen" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data_departemen.map((dep) => (
                                            <SelectItem key={dep.id} value={dep.id.toString()}>
                                                {dep.namaDepartemen}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.departemen_Id && <small className="text-red-600">{errors.departemen_Id}</small>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">


                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="jabatan">Pilih Jabatan:</Label>
                                <Select onValueChange={(value) => setData('jabatan', value)}>
                                    <SelectTrigger className="w-full focus:ring-0 focus:border-blue-600 focus:outline-none">
                                        <SelectValue placeholder="Pilih Jabatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {jabatans.map((jabatan) => (
                                            <SelectItem key={jabatan.value} value={jabatan.value}>{jabatan.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.jabatan && <small className="text-red-600">{errors.jabatan}</small>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="status">Pilih Status:</Label>
                                <Select onValueChange={(value) => setData('status', value)}>
                                    <SelectTrigger className="w-full focus:ring-0 focus:border-blue-600 focus:outline-none">
                                        <SelectValue placeholder="Pilih Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((status) => (
                                            <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.status && <small className="text-red-600">{errors.status}</small>}
                            </div>


                            <div className="flex flex-col space-y-1.5">
                                <Label>Tempat Lahir</Label>
                                <Input
                                    onChange={(e) => setData('tempat_lahir', e.target.value)}
                                    name='tempat_lahir'
                                    value={data.tempat_lahir}
                                    type='text' placeholder='Masukkan Tempat Lahir'
                                    className='focus-visible:ring-0 focus:border-blue-600'
                                />
                                {errors.tempat_lahir && <small className="text-red-600">{errors.tempat_lahir}</small>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label>Tanggal Lahir</Label>
                                <Input
                                    onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                    name='tanggal_lahir'
                                    value={data.tanggal_lahir}
                                    type='date' placeholder='Masukkan Tempat Lahir'
                                    className='focus-visible:ring-0 focus:border-blue-600'
                                />
                                {errors.tanggal_lahir && <small className="text-red-600">{errors.tanggal_lahir}</small>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label> Usia</Label>
                                <Input
                                    onChange={(e) => setData('usia', e.target.value)}
                                    name='usia'
                                    value={data.usia}
                                    type='text' placeholder='Usia anda'
                                    className='focus-visible:ring-0 focus:border-blue-600'
                                />
                                {errors.usia && <small className="text-red-600">{errors.usia}</small>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="status">Pilih Jenis Kelamin:</Label>
                                <Select onValueChange={(value) => setData('jenis_kelamin', value)}>
                                    <SelectTrigger className="w-full focus:ring-0 focus:border-blue-600 focus:outline-none">
                                        <SelectValue placeholder="Pilih Jenis Kelamin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {jenisKelamin.map((jenisKelamin) => (
                                            <SelectItem key={jenisKelamin.value} value={jenisKelamin.value}>{jenisKelamin.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.jenis_kelamin && <small className="text-red-600">{errors.jenis_kelamin}</small>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label> Pendidikan</Label>
                                <Select onValueChange={(value) => setData('pendidikan', value)}>
                                    <SelectTrigger className="w-full focus:ring-0 focus:border-blue-600 focus:outline-none">
                                        <SelectValue placeholder="Pilih Pendidikan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {pendidikan.map((data) => (
                                            <SelectItem key={data.value} value={data.value}>{data.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.pendidikan && <small className="text-red-600">{errors.pendidikan}</small>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label> Jurusan</Label>
                                <Input
                                    onChange={(e) => setData('jurusan', e.target.value)}
                                    name='jurusan'
                                    value={data.jurusan}
                                    type='text' placeholder='Jurusan Anda'
                                    className='focus-visible:ring-0 focus:border-blue-600'
                                />
                                {errors.jurusan && <small className="text-red-600">{errors.jurusan}</small>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label> BPJS Ketenaga Kerjaan</Label>
                                <Input
                                    onChange={(e) => setData('bpjs_kk', e.target.value)}
                                    name='bpjs_kk'
                                    value={data.bpjs_kk}
                                    type='text' placeholder='Jurusan Anda'
                                    className='focus-visible:ring-0 focus:border-blue-600'
                                />
                                {errors.bpjs_kk && <small className="text-red-600">{errors.bpjs_kk}</small>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label> BPJS Kesehatan</Label>
                                <Input
                                    onChange={(e) => setData('bpjs_kesehatan', e.target.value)}
                                    name='bpjs_kesehatan'
                                    value={data.bpjs_kesehatan}
                                    type='text' placeholder='Jurusan Anda'
                                    className='focus-visible:ring-0 focus:border-blue-600'
                                />
                                {errors.bpjs_kesehatan && <small className="text-red-600">{errors.bpjs_kesehatan}</small>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label> No. Rekening</Label>
                                <Input
                                    onChange={(e) => setData('no_rekening', e.target.value)}
                                    name='no_rekening'
                                    value={data.no_rekening}
                                    type='text' placeholder='Nomor Rekening Anda'

                                    className='focus-visible:ring-0 focus:border-blue-600' />
                                {errors.no_rekening && <small className="text-red-600">{errors.no_rekening}</small>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label> Nama Bank</Label>
                                <Select onValueChange={(value) => setData('nama_bank', value)}>
                                    <SelectTrigger className="w-full focus:ring-0 focus:border-blue-600 focus:outline-none">
                                        <SelectValue placeholder="Pilih Bank" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {nama_bank.map((data) => (
                                            <SelectItem key={data.value} value={data.value}>{data.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.nama_bank && <small className="text-red-600">{errors.nama_bank}</small>}
                            </div>

                        </div>
                        <div className='mt-2'>
                            <h6 className='text-gray-600 text-md font-bold'>Data Pengguna</h6>
                            <div className="flex flex-col space-y-1.5 mt-3">
                                <Label htmlFor="email">Email:</Label>
                                <Input
                                    type='email'
                                    placeholder='Masukkan Alamat Email'
                                    onChange={(e) => setData('email', e.target.value)}
                                    name='email'
                                    value={data.email}
                                    className='w-96 focus-visible:ring-0 focus:border-blue-600'
                                >
                                </Input>
                                {errors.email && <small className="text-red-600">{errors.email}</small>}
                            </div>
                            <div className="flex flex-col space-y-1.5 mt-3">
                                <Label htmlFor="password">Password:</Label>
                                <div className="relative w-96">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Masukkan Password'
                                        onChange={(e) => setData('password', e.target.value)}
                                        name='password'
                                        value={data.password}
                                        className="pr-10 w-full focus-visible:ring-0 focus:border-blue-600 "
                                    />
                                    <button
                                        type="button"
                                        onClick={handleTogglePassword}
                                        className="absolute inset-y-0 right-3 flex items-center text-sm leading-5"
                                    >
                                        {showPassword ? (
                                            <IconEyeOff className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <IconEye className="h-5 w-5 text-gray-500" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && <small className="text-red-600">{errors.password}</small>}
                            </div>

                        </div>
                    </div>

                    <Button className='bg-blue-600 hover:bg-blue-500' type="submit" disabled={processing}>Simpan</Button>
                </form>
            </div>
        </Admin>
    )
}