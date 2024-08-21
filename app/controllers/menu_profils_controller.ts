import Karyawan from '#models/karyawan'
import type { HttpContext } from '@adonisjs/core/http'

export default class MenuProfilsController {
    async menuProfil({ inertia }: HttpContext) {
        const karyawan = await Karyawan.query().where('user_id', user.id).first();

        return inertia.render('admin/users/menuProfil', {
            data_karyawan: 'karyawan'
        })
    }
}