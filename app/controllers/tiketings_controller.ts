import  Karyawan  from '#models/karyawan';
import type { HttpContext } from '@adonisjs/core/http'
import Tiketing from '#models/tiketing';
import { DateTime } from 'luxon';

export default class TiketingsController {
    async index({ inertia,auth }: HttpContext) {
        const user = auth.user;
        const karyawan = await Karyawan.query().where('user_id', user.id).distinct('jabatan','nama').first();
        const tiketing = await Tiketing.all()
        return inertia.render('admin/dasboard/tiketing/index',{
            data_tiketing:tiketing,
            data_user_login:karyawan
        })
    }

    async laporan({ inertia, response, auth }: HttpContext) {
        const user = auth.user;
        if (!user) {
            return response.redirect('/login');
        }
        const karyawan = await Karyawan.query().where('user_id', user.id).first();
        if (!karyawan || karyawan.jabatan !== 'IT Software') {
            return inertia.render('admin/error/404');
        }
        const tiketing = await Tiketing.query();
        return inertia.render('admin/dasboard/tiketing/laporan', {
            data_tiketing: tiketing,
            data_user_login: karyawan
        });
    }
    
    async create({ inertia, auth }: HttpContext) {
        const user = auth.user;
    
  
        const karyawan = await Karyawan.query().where('user_id', user.id).preload('user').first();
    
        return inertia.render('admin/dasboard/tiketing/create', {
            data_karyawan: karyawan,
        });
    }
    

    async store({ response, request, auth }: HttpContext) {
        // Ambil user yang sedang login
        const user = auth.user;
    
        // Ambil data karyawan terkait user yang login
        const karyawan = await Karyawan.query().where('user_id', user.id).first();
    
        if (!karyawan) {
            return response.redirect('/tiketing/create', {
                error: 'Karyawan tidak ditemukan.',
            });
        }
    
        // Buat instance baru dari Tiketing
        const tiketing = new Tiketing();
    
        // Isi data dari request input
        tiketing.problem = request.input('problem');
        tiketing.tanggal = request.input('tanggal');
        tiketing.keterangan = request.input('keterangan');
    
        // Kaitkan tiket dengan karyawan yang login
        tiketing.karyawan_id = karyawan.id;
    
        // Simpan data tiket ke database
        await tiketing.save();
    
        // Redirect setelah penyimpanan berhasil
        return response.redirect('/tiketing');
    }
    
}