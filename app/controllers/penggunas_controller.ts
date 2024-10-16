import Karyawan from '#models/karyawan'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class PenggunasController {
    async index({ inertia, auth }: HttpContext) {
        const user = auth.user;
        const karyawan = await Karyawan.query().where('user_id', user?.id).preload('user').first()
        if (karyawan?.jabatan !== 'IT Software') {
            return inertia.render('admin/error/404')
        }
        const semuaKaryawan = await Karyawan.query().preload('user')
        const semuaUser = await User.all()
        return inertia.render('admin/sistem/pengguna/index', {
            data_karyawan: semuaKaryawan,
            data_user: semuaUser,
            data_user_login:karyawan
        })
    }
}
