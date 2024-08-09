import Karyawan from "#models/karyawan";
import User from "#models/user";
import { HttpContext, Redirect } from "@adonisjs/core/http";

export default class KaryawansKontroller {

    async index({ inertia }: HttpContext) {
        const karyawan = await Karyawan.all()
        console.log(karyawan);

        return inertia.render('admin/dasboard/karyawan/index', {
            data_karyawan: karyawan
        });
    }

    async create({ inertia }: HttpContext) {
        return inertia.render('admin/dasboard/karyawan/create');
    }


    async store({ request, response, session }: HttpContext) {
        const users = new User()

        users.fullName = request.input('fullName');
        users.email = request.input('email');
        users.password = request.input('password');
        await users.save();


        const karyawan = new Karyawan();
        karyawan.user_id =users.id;
        karyawan.nama = request.input('nama');
        karyawan.departemen = request.input('departemen');
        karyawan.jabatan = request.input('jabatan');
        karyawan.status = request.input('status');

        await karyawan.save();

        session.flash({ notification: 'Data Berhasil Disimpan!' });
        return response.redirect('/dasboard/karyawan/index');
    }

    async delete({ params, response }: HttpContext) {
        const karyawan = await Karyawan.findOrFail(params.id)
        await karyawan.delete()
        return response.redirect('/dasboard/karyawan/index')
    }

    async edit({ inertia, params }: HttpContext) {
        console.log(params.id);
        const karyawan = await Karyawan.find(params.id)
        return inertia.render('admin/dasboard/karyawan/edit', {
            karyawan: karyawan
        });
    }

    async update({ request, params, response }: HttpContext) {
        const karyawan = await Karyawan.findOrFail(params.id)
        karyawan.nama = request.input('nama')
        karyawan.departemen = request.input('departemen')
        karyawan.jabatan = request.input('jabatan')
        karyawan.status = request.input('status')
        karyawan.save()
        return response.redirect('/dasboard/karyawan/index')

    }

}
