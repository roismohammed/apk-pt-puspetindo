import React, { useState } from 'react';
import Admin from '~/layout/admin';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { IconBuildingArch, IconEdit, IconHome, IconTrash } from '@tabler/icons-react';
import { Card } from '~/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Button } from '~/components/ui/button';
import Swal from 'sweetalert2';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import Create from './create';
import Edit from './edit';
import Departemen from '#models/departemen';

export default function Index({}) {
    const { data_departemen,data_user_login } = usePage().props;
    const [open, setOpen] = useState(false);
    const [selectedDepartemen, setSelectedDepartemen] = useState(null); // State untuk departemen yang dipilih

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Ingin Hapus Data?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya!',
            cancelButtonText: 'Tidak!',
            allowOutsideClick: false,
        });

        if (result.isConfirmed) {
            try {
                await router.delete('/departemen/delete/' + id);
                Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data.', 'error');
            }
        }
    };

    const handleEdit = (departemen: Departemen) => {
        setSelectedDepartemen(departemen);
        setModalEdit(true);
    };

    return (
        <Admin user={data_user_login}>
            <Head>
                <title>departemen</title>
            </Head>
            <Card className="p-5">
                <div className="border-b border-gray-200 pb-4">
                    <div className='flex justify-between'>
                        <div>
                            <Link href="/karyawan">
                                <p className='text-sm flex gap-1'><IconHome size={18} />Karyawan</p>
                            </Link>
                            <h6 className='text-gray-600 text-lg font-bold'>Menu Departemen</h6>
                        </div>

                        <Dialog  open={open} onOpenChange={(value) => setOpen(value)}>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-500 text-white btn-small gap-2 hover:text-white"
                                    variant="outline"
                                >
                                    <IconBuildingArch size={18} />
                                    Tambah Departemen
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Tambah Departemen</DialogTitle>
                                </DialogHeader>
                                <Create  onSuccess={() => setOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Card className="mt-3">
                    <Table className="container">
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data_departemen.map((dep, index) => (
                                <TableRow key={dep.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{dep.namaDepartemen}</TableCell>
                                    <TableCell className='flex gap-2'>
                                        <IconEdit
                                            size={18}
                                            className='cursor-pointer'
                                            onClick={() => handleEdit(dep)} // Panggil handleEdit dengan parameter departemen
                                        />

                                        {/* Modal Edit */}
                                        <Dialog >
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Departemen</DialogTitle>
                                                </DialogHeader>
                                                {selectedDepartemen && (
                                                    <Edit departemen={selectedDepartemen} />
                                                )}
                                            </DialogContent>
                                        </Dialog>

                                        <span
                                            onClick={() => handleDelete(dep.id)}
                                            className="text-red-900 hover:cursor-pointer"
                                        >
                                            <IconTrash size={18} />
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </Card>
        </Admin>
    );
}
