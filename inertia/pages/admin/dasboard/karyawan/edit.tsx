import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { IconEye, IconEyeOff, IconHome } from '@tabler/icons-react'
import React, { FormEventHandler, useState } from 'react'
import Swal from 'sweetalert2'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import Admin from '~/layout/admin'

export default function EditPengguna() {
    const { karyawan } = usePage().props
    const { data, setData, put } = useForm({
        nama: karyawan.nama,
        namaDepartemen: karyawan.namaDepartemen,
        jabatan: karyawan.jabatan,
        status: karyawan.status,
        email:karyawan.email,
        password:karyawan.password
    })
    console.log(karyawan);


    const handleSubmit: FormEventHandler = async (e) => {
    

        e.preventDefault()
        await put('/karyawan/edit/' + karyawan.id, {
            onSuccess: () => {
                Swal.fire({
                    title: 'Data Berhasil Diupdate!',
                    icon: 'success',
                    confirmButtonText: 'Okee',
                });
            }
        })

    }

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

    const [showPassword, setShowPassword] = useState(false); // State untuk mengatur visibilitas password

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <Admin>
            <Head title='Edit Pengguna' />
            <Card className="p-5">
                <div className="border-b border-gray-200 pb-4">
                    <div className='flex justify-between'>
                        <div>
                            <div className='flex gap-1'>
                                <Link href="/">
                                    <p className='text-sm flex gap-1'><IconHome size={18} />Home</p>
                                </Link>
                                <span>-</span>
                                <Link href='/karyawan'>
                                    <p className="text-sm">karyawan</p>
                                </Link>
                            </div>
                            <h6 className='text-gray-600 text-lg font-bold'>Edit Karyawan</h6>
                        </div>
                    </div>
                </div>

                <form className='mt-5' onSubmit={handleSubmit}>
                    <div className='my-5'>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name:</Label>
                            <Input
                                id="name"
                                name='nama'
                                placeholder='Masukkan Nama'
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="departemen">Departemen:</Label>
                                <Input
                                    id="departemen"
                                    placeholder="Masukkan Nama Departemen"
                                    name='departemen_id'
                                    value={data.namaDepartemen}
                                    onChange={(e) => setData('namaDepartemen', e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="jabatan">Pilih Jabatan:</Label>
                                <Select
                                    onValueChange={(value) => setData('jabatan', value)}
                                    value={data.jabatan}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Jabatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {jabatans.map((jabatan) => (
                                            <SelectItem key={jabatan.value} value={jabatan.value}>
                                                {jabatan.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="status">Pilih Status:</Label>
                                <Select
                                    onValueChange={(value) => setData('status', value)}
                                    value={data.status}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((status) => (
                                            <SelectItem key={status.value} value={status.value}>
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className='mt-2'>
                                <h6 className='text-gray-600 text-md font-bold'>Data Pengguna</h6>
                                <div className="flex flex-col space-y-1.5 mt-3">
                                    <Label htmlFor="email">Email:</Label>
                                    <Input
                                        type='email'
                                        id='email'
                                        placeholder='Masukkan Alamat Email'
                                        name='email'
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    >
                                    </Input>
                    
                                </div>
                                <div className="flex flex-col space-y-1.5 mt-3">
                                    <Label htmlFor="password">Password:</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Masukkan Password'
                                            onChange={(e) => setData('password', e.target.value)}
                                            name='password'
                                            value={data.password}
                                            className="w-full pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleTogglePassword}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                        >
                                            {showPassword ? <IconEyeOff className="h-5 w-5 text-gray-500" /> : <IconEye className="h-5 w-5 text-gray-500" />}
                                        </button>
                                    </div>
                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button className='bg-blue-600 hover:bg-blue-500' type="submit">Update</Button>
                </form>
            </Card>
        </Admin>
    )
}
