import JudulPpwi from '#models/judul_ppwi';
import Karyawan from '#models/karyawan';
import type { HttpContext } from '@adonisjs/core/http'

export default class JudulPpwisController {
    async index({ inertia,auth }: HttpContext) {
        const user = auth.user;
        const karyawan = await Karyawan.query().where('user_id', user.id).distinct('jabatan','nama').first();
        const judul = await JudulPpwi.all()
        return inertia.render('admin/users/judul/index', {
            data_judul: judul,
            data_user_login:karyawan
        })
    }


    async store({ request, response }: HttpContext) {
        const judulPpwi = new JudulPpwi();
        judulPpwi.judul = request.input('judul');
        await judulPpwi.save();
        return response.redirect('/judul');
    }

    async delete({ params, response }: HttpContext) {
        const judul = await JudulPpwi.findOrFail(params.id)
        await judul.delete()
        return response.redirect('/judul')
    }
}