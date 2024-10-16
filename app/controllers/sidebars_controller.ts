import Karyawan from '#models/karyawan';
import type { HttpContext } from '@adonisjs/core/http'

export default class SidebarsController {
    async index({ inertia, auth }: HttpContext) {
        const user = auth.user;

        const karyawanUser = await Karyawan.query().where('user_id', user.id).first();
        if (karyawanUser?.jabatan !== 'IT Software') {
            return inertia.render('admin/error/404');
        }


        return inertia.render('home', {
            data_user: user,
            data_karyawan: karyawanUser
        })
    }
}