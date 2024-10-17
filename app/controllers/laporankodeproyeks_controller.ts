import Karyawan from '#models/karyawan';
import type { HttpContext } from '@adonisjs/core/http'

export default class LaporankodeproyeksController {

    public async index({ inertia,auth }: HttpContext) {
        const user = auth.user;
        const karyawan = await Karyawan.query().where('user_id', user.id).distinct('jabatan','nama').first();
        console.log(karyawan);
        
        return inertia.render('admin/management/laporanKodeProyek',{
            data_user_login:karyawan
        })
    }
}