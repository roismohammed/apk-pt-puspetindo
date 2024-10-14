import { Redirect } from '@adonisjs/core/http';
import Karyawan from '#models/karyawan'
import ManHour from '#models/man_hour';
import type { HttpContext } from '@adonisjs/core/http'

export default class ProjectManagementsController {

    async index({ inertia, auth, request, response }: HttpContext) {
        const user = auth.user;
        if (!user) {
            return response.redirect('/login');
        }
        const karyawan = await Karyawan.query().where('user_id', user.id).first();
        if (!karyawan || karyawan.jabatan !== 'IT Software') {
            return inertia.render('admin/error/404');
        }

        const all_man_hours = await ManHour.query().preload('karyawan').preload('proyek')
        return inertia.render('admin/users/projectManagement/index', {
            data_all_manhours: all_man_hours,
        });
    }

    public async verify({ params, request, response }: HttpContext) {
        try {
            const manHours = await ManHour.query().whereIn('id', request.input('data')).update({
                verifikasi: 'Diterima'
            });
            const minhours = await ManHour.query().whereIn('id', request.input('data')).update({
                verifikasi: 'Ditolak'
            });

            return response.redirect('/manhours');
        } catch (error) {
            return response.internalServerError({ message: 'Terjadi kesalahan saat memverifikasi data.' });
        }
    }
}    