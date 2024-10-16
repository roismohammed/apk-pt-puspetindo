import Karyawan from '#models/karyawan';
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
    async index({ inertia, auth }: HttpContext) {
        const user = auth.user;
        const karyawan = await Karyawan.query().where('user_id', user.id).distinct('jabatan','nama').first();
        return inertia.render('home', {
            data_user_login:karyawan
        })
    }

    async admin({ inertia, auth }: HttpContext) {
        const user = auth.user;
        const karyawan = await Karyawan.query().where('user_id', user.id).distinct('jabatan','nama').first();
        return inertia.render('layout/admin', {
            data_user_login:karyawan
        })
    }
}