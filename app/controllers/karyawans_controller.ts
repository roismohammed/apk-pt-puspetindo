import Karyawan from "#models/karyawan";
import User from "#models/user";
import Departeman from "#models/departemen";
import { HttpContext, Redirect } from "@adonisjs/core/http";
export default class KaryawansKontroller {

    async index({ inertia, auth }: HttpContext) {
        // Mendapatkan user yang terotentikasi
        const user = auth.user;
    
        // Periksa apakah user terotentikasi
        if (!user) {
            return inertia.render('admin/error/404');
        }
    
        // Mendapatkan data karyawan berdasarkan user yang sedang login
        const karyawanUser = await Karyawan.query().where('user_id', user.id).first();
    
        // Pengecekan jabatan user
        if (karyawanUser?.jabatan !== 'IT Software') {
            return inertia.render('admin/error/404');
        }
    
        // Memuat semua data karyawan dengan preload departemen
        const semuaKaryawan = await Karyawan.query().preload('departemen');
        
        // Memuat semua data user tanpa preload
        const semuaUser = await User.all();
    
        // Kirim data ke view
        return inertia.render('admin/dasboard/karyawan/index', {
            data_karyawan: semuaKaryawan,
            data_user: semuaUser
        });
    }

    async create({ inertia }: HttpContext) {
        const departemen = await Departeman.all()

        return inertia.render('admin/dasboard/karyawan/create', {
            data_departemen: departemen
        });
    }


    async store({ request, response, session }: HttpContext) {
        const users = new User()
        users.fullName = request.input('fullName');
        users.email = request.input('email');
        users.password = request.input('password');
        await users.save();

        const karyawan = new Karyawan();
        console.log(request.all());

        karyawan.user_id = users.id;
        karyawan.nama = request.input('nama');
        karyawan.departemen_Id = request.input('departemen_Id');
        karyawan.jabatan = request.input('jabatan');
        karyawan.status = request.input('status');

        await karyawan.save();

        session.flash({ notification: 'Data Berhasil Disimpan!' });
        return response.redirect('/karyawan');
    }

    async delete({ params, response }: HttpContext) {
        const karyawan = await Karyawan.findOrFail(params.id)
        await karyawan.delete()
        return response.redirect('/karyawan')
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
        // karyawan.departemen = request.input('departemen')
        karyawan.jabatan = request.input('jabatan')
        karyawan.status = request.input('status')
        karyawan.save()
        return response.redirect('/karyawan')

    }

}
