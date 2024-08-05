import { Head, Link } from '@inertiajs/react'
import { IconHome } from '@tabler/icons-react'
import React, { FormEventHandler, useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Command, CommandInput, CommandItem } from '~/components/ui/command'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import Admin from '~/layout/admin'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const jabatans = [
    {
        value: "manager",
        label: "Manager",
    },
    {
        value: "staff",
        label: "Staff",
    }
]

export default function Create() {
    const { data, setData, post, processing } = useForm({
        nama: '',
        departemen: '',
        jabatan: '',
        status: '',
    })
    const [errors, setErrors] = useState({});

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        const validationErrors: any = {};
        let isValid = true;

        if (data.nama.trim() === '') {
            validationErrors.nama = 'Nama harus diisi';
            isValid = false;
        }

        if (data.departemen.trim() === '') {
            validationErrors.departemen = 'Departemen harus diisi';
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

        setErrors(validationErrors);

        if (isValid) {
            post('/dasboard/pengguna/create', {
                onSuccess: () => {
                    toast.success("Data Berhasil Disimpan!", {
                        position: 'top-center'
                    });
                },
                onError: () => {
                    toast.error("Terjadi kesalahan saat menyimpan data.", {
                        position: 'top-center'
                    });
                }
            });
        }
    }

    const handleChange = () => {
        console.log();

    }

    return (
        <Admin>
            <Head title='add-pengguna' />

            <Card className="p-5">
                <div className="border-b border-gray-200 pb-4">
                    <div className='flex justify-between'>
                        <div>
                            <div className='flex gap-1'>
                                <Link href="/">
                                    <p className='text-sm flex gap-1'><IconHome size={18} />Home</p>
                                </Link>
                                <span>-</span>
                                <Link href='/dasboard/pengguna/pengguna'>
                                    <p className="text-sm">pengguna</p>
                                </Link>
                            </div>

                            <h6 className='text-gray-600 text-lg font-bold'>Add Pengguna</h6>
                        </div>
                    </div>
                </div>

                <form className='mt-5' onSubmit={handleSubmit}>
                    <ToastContainer />
                    <div className='my-5'>
                        <div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="nama">Nama:</Label>
                                <Input
                                    id="nama"
                                    placeholder="Masukkan Nama"
                                    onChange={(e) => setData('nama', e.target.value)}
                                    name='nama'
                                    value={data.nama}
                                />
                                {errors.nama && <small className="text-red-600">{errors.nama}</small>}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mt-3">
                            <div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="departemen">Departemen:</Label>
                                    <Input
                                        id="departemen"
                                        placeholder="Masukkan Nama Departemen"
                                        onChange={(e) => setData('departemen', e.target.value)}
                                        name='departemen'
                                        value={data.departemen}
                                    />
                                    {errors.departemen && <small className="text-red-600">{errors.departemen}</small>}
                                </div>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="jabatan">Pilih Jabatan:</Label>
                                <div>
                                    <Select
                                        onValueChange={(value) => setData('jabatan', value)}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Pilih Jabatan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {jabatans.map((jabatan) => (
                                                <SelectItem onChange={handleChange} key={jabatan.value} value={jabatan.value}>{jabatan.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.jabatan && <small className="text-red-600">{errors.jabatan}</small>}
                                </div>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="status">Pilih Status:</Label>
                                <div>
                                    <Select
                                        onValueChange={(value) => setData('status', value)}
                                    >
                                        <SelectTrigger className="w-[180px]">
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
                            </div>
                        </div>
                    </div>

                    <Button type="submit" disabled={processing}>Simpan</Button>
                </form>
            </Card>
        </Admin>
    )
}
