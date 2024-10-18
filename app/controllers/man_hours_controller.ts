import Karyawan from '#models/karyawan';
import ManHour from '#models/man_hour';
import Proyek from '#models/proyek';
import type { HttpContext } from '@adonisjs/core/http'

export default class ManHoursController {
    async index({ inertia, auth, request }: HttpContext) {
        const user = auth.user
        if (!user) {
            return inertia.render('admin/error/404')
        }
        const all_karyawan= await Karyawan.all()
        const karyawan = await Karyawan.query().preload('departemen').preload('user').where('user_id', user.id).first();
        if (!karyawan) {
            return inertia.render('admin/users/manhours/index', {
                data_karyawan: null,
                message: 'Karyawan tidak ditemukan',
            });
        }

        if (karyawan.jabatan !== 'IT Software') {
            const manHours = await ManHour.query()
                .preload('karyawan')
                .preload('proyek')
                .where('karyawan_id', karyawan.id);
        
            return inertia.render('admin/users/manhours/index', {
                data_karyawan: karyawan,
                data_manHours: manHours,
            });
        } else {
            const allManHours = await ManHour.query().preload('karyawan').preload('proyek');
            return inertia.render('admin/users/manhours/index', {
                data_karyawan: karyawan,
                data_manHours: allManHours,
            });
        }
        
    }
    async create({ inertia,auth }: HttpContext) {
        const user = auth.user
        const karyawanuser = await Karyawan.query().preload('departemen').preload('user').where('user_id', user.id).first();
        const karyawan = await Karyawan.query()
        const proyek = await Proyek.query().andWhere('status', '=', 'selesai');
        return inertia.render('admin/users/manhours/create', {
            data_karyawan: karyawan,
            data_proyek: proyek,
            data_user_login:karyawanuser
        })
    }
    async store({ request, response, session }: HttpContext) {
        const manhours = new ManHour()
        manhours.karyawan_id = request.input('karyawan_id')
        manhours.proyek_id = request.input('proyek_id')
        manhours.tanggal = request.input('tanggal')
        manhours.jam_kerja = request.input('jam_kerja')
        manhours.jam_lembur = request.input('jam_lembur')
        manhours.verifikasi = request.input('verifikasi')

        await manhours.save()

        session.flash({ notification: 'Data Berhasil Disimpan!' });
        return response.redirect('/manhours')
    }
    async delete({ params, response }: HttpContext) {
        const manhours = await ManHour.findOrFail(params.id)
        await manhours.delete()
        return response.redirect('/manhours')
    }

}