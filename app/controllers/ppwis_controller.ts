import JudulPpwi from '#models/judul_ppwi'
import Karyawan from '#models/karyawan'
import Ppwi from '#models/ppwi'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class PpwisController {


    async index({ inertia,auth }: HttpContext) {
        const judul = await JudulPpwi.all()
        const ppwi = await Ppwi.query().preload('judulPpwi')
        const uniquePpwi = Object.values(
            ppwi.reduce((acc, current) => {
                const judulId = current.judulPpwi?.id;
                if (judulId && !acc[judulId]) {
                    acc[judulId] = current;
                }
                return acc;
            }, {})
        );

        const user = auth.user;
        const karyawan = await Karyawan.query().where('user_id', user.id).distinct('jabatan','nama').first();
        return inertia.render('admin/users/ppwi/index', {
            data_judul: judul,
            data_ppwi: uniquePpwi,
            data_user_login:karyawan
        })
    }


    async detail({ params, inertia,auth }: HttpContext) {
        try {
            const ppwi = await Ppwi.query()
                .where('id', params.id)
                .preload('judulPpwi')
                .first();
            if (!ppwi) {
                return inertia.render('errors/not_found', { message: 'Data not found' });
            }
            const relatedPpwi = await Ppwi.query()
                .where('judulId', ppwi.judulId) 
                .preload('judulPpwi');

                const user = auth.user;
                const karyawan = await Karyawan.query().where('user_id', user.id).distinct('jabatan','nama').first();
            return inertia.render('admin/users/ppwi/detail', {
                data_ppwi: relatedPpwi,
                data_user_login:karyawan
            });

        } catch (error) {

            return inertia.render('errors/not_found', { message: 'Data not found' });
        }
    }

    public async download({ response, params }: HttpContext) {
        const filePath = app.makePath(`storage/uploads/${params.file}`);
        try {
            return response.download(filePath);
        } catch (error) {
            console.error('Error saat mengunduh file:', error);
            return response.status(404).send('File tidak ditemukan');
        }
    }
    


    public async store({ request, response }: HttpContext) {
        const ppwi = new Ppwi()
        ppwi.judulId = request.input('judulId')
        ppwi.keterangan = request.input('keterangan')
        ppwi.namaFile = request.input('namaFile')
        const dokumen = request.file('dokumen', {
            size: '2mb',
            extnames: ['pdf', 'doc', 'docx'],
        });
        await ppwi.save()
        return response.redirect('/ppwi')
    }


    async delete({ params, response }: HttpContext) {
        const ppwi = await Ppwi.findOrFail(params.namaFile)
        await ppwi.delete()
        return response.redirect('/ppwi')
    }
}
