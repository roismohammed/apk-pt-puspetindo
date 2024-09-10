import Karyawan from '#models/karyawan';
import Proyek from '#models/proyek'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProyeksController {
    async index({ inertia, auth }: HttpContext) {
        // Mendapatkan user yang terotentikasi
        const user = auth.user;

        // Periksa apakah user terotentikasi
        if (!user) {
            return inertia.render('admin/error/404');
        }

        // Mengambil data karyawan berdasarkan user_id
        const karyawan = await Karyawan.query().where('user_id', user.id).first();

        // Periksa apakah karyawan ada dan memiliki jabatan yang sesuai
        if (!karyawan || karyawan.jabatan !== 'IT Software') {
            return inertia.render('admin/error/404');
        }

        // Mengambil data proyek
        const proyek = await Proyek.all();

        // Menampilkan data proyek pada halaman yang sesuai
        return inertia.render('admin/dasboard/proyek/index', {
            data_proyek: proyek
        });
    }

    // async create({ inertia }: HttpContext) {
    //     return inertia.render('admin/dasboard/proyek/create')
    // }

    async store({ request, response, session }: HttpContext) {
        const proyek = new Proyek();

        proyek.namaProyek = request.input('namaProyek');
        proyek.kodeJobOrder = request.input('kodeJobOrder');
        proyek.status = request.input('status');
        proyek.pemilik = request.input('pemilik');

        await proyek.save();

        session.flash({ notification: 'Data Berhasil Disimpan!' });
        return response.redirect('/proyek');
    }

    async delete({ params, response }: HttpContext) {
        const proyek = await Proyek.findOrFail(params.id)
        await proyek.delete()
        return response.redirect('/proyek')
    }

    async edit({ inertia, params }: HttpContext) {
        console.log(params.id);
        const proyek = await Proyek.find(params.id)
        return inertia.render('admin/dasboard/proyek/edit', {
            proyek: proyek
        });
    }

    async update({ request, params, response }: HttpContext) {
        const proyek = await Proyek.findOrFail(params.id)
        proyek.namaProyek = request.input('namaProyek')
        proyek.kodeJobOrder = request.input('kodeJobOrder')
        proyek.status = request.input('status')
        proyek.pemilik = request.input('pemilik')
        proyek.save()
        return response.redirect('/proyek')

    }
}