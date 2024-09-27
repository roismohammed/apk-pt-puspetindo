import { useForm } from '@inertiajs/react'
import React, { FormEventHandler, useState, useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import toast, { Toaster } from 'react-hot-toast';

export default function Create() {
    const { data, setData, post, processing } = useForm({
        problem: '',
        keterangan: '',
        tanggal: '' // Tidak ada input, tanggal otomatis akan di-set
    });

    // State untuk validasi error
    const [errors, setErrors] = useState({
        problem: '',
        keterangan: ''
    });

    // Fungsi untuk mendapatkan tanggal dan waktu saat ini dalam format YYYY-MM-DD HH:MM:SS
    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // Set tanggal otomatis saat komponen dimuat pertama kali
    useEffect(() => {
        setData('tanggal', getCurrentDateTime());
    }, []);

    // Validasi input
    const validate = () => {
        let valid = true;
        let newErrors = { problem: '', keterangan: '' };

        if (!data.problem) {
            newErrors.problem = 'Problem harus diisi';
            valid = false;
        }
        if (!data.keterangan) {
            newErrors.keterangan = 'Keterangan harus diisi';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (validate()) {
            post('/tiketing/create', {
                onSuccess: () => {
                    toast.success('Proyek berhasil di simpan');
                },
            });
        }
    }

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-2">
                    {/* Input for Problem */}
                    <div className="flex flex-col space-y-1.5 mt-3">
                        <Label>Problem:</Label>
                        <Input
                            type='text'
                            placeholder='Masukkan Problem'
                            name='problem'
                            value={data.problem}
                            onChange={(e) => setData('problem', e.target.value)}
                            className="resize-none border p-3 shadow-none focus-visible:ring-0 focus:border-blue-600"
                        />
                        {errors.problem && <span className="text-red-600 text-sm">{errors.problem}</span>}
                    </div>

                </div>

                {/* Textarea for Keterangan */}
                <div className='mt-2'>
                    <Label> Keterangan:</Label>
                    <Textarea
                        placeholder="Masukkan keterangan di sini"
                        value={data.keterangan}
                        onChange={(e) => setData('keterangan', e.target.value)}
                        className="min-h-20 resize-none border-2 p-3 shadow-none focus-visible:ring-0 focus:border-blue-600"
                    />
                    {errors.keterangan && <span className="text-red-600 text-sm">{errors.keterangan}</span>}
                </div>

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    className='mt-2 bg-blue-600 hover:bg-blue-500' 
                    disabled={processing}
                >
                 Submit
                </Button>
            </form>
        </div>
    )
}
