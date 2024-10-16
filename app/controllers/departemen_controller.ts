import type { HttpContext } from '@adonisjs/core/http'
import Departemen from '#models/departemen'
import Karyawan from '#models/karyawan'
export default class DepartemenController {
    async index({ inertia ,auth}: HttpContext) {
        const user = auth.user;
        const departemen = await Departemen.all()
        const karawan = await Karyawan.query().where('user_id', user.id).distinct('jabatan','nama').first();
        return inertia.render('admin/dasboard/departemen/index', {
            data_departemen: departemen,
            data_user_login:karawan
        })
    }


    async create({ inertia }: HttpContext) {
        const karyawan = await Karyawan.all()
        return inertia.render('admin/dasboard/departemen/create', {
            data_karyawan: karyawan,
        })
    }

    async store({ request, response, session }: HttpContext) {
        const departemen = new Departemen()
        departemen.namaDepartemen = request.input('namaDepartemen')
        await departemen.save();
        session.flash({ notification: 'Data Berhasil Disimpan!' });
        return response.redirect('/departemen');
    }


    async edit({ inertia, params }: HttpContext) {
        console.log(params.id);
        const departemen = await Departemen.find(params.id)
        return inertia.render('admin/dasboard/departemen/edit', {
            departemen: departemen
        });
    }

    async update({ request, params, response }: HttpContext) {
        const departemen = await Departemen.findOrFail(params.id)
        departemen.namaDepartemen = request.input('namaDepartemen')
        return response.redirect('/departemen')

    }

    async delete({ params, response }: HttpContext) {
        const departemen = await Departemen.findOrFail(params.id)
        await departemen.delete()
        return response.redirect('/departemen')
    }
}