import Karyawan from '#models/karyawan';
import ManHour from '#models/man_hour';
import type { HttpContext } from '@adonisjs/core/http'

export default class LaporansController {
    async laporan({ inertia, auth, request, response }: HttpContext) {
        const user = auth.user;

        if (!user) {
            return response.redirect('/login');
        }


        const karyawan = await Karyawan.query().where('user_id', user.id).first();
        if (!karyawan || karyawan.jabatan !== 'IT Software') {
            return inertia.render('admin/error/404');
        }

        let man_hours = [];

        if (request.input('start_date') != null) {
            man_hours = await ManHour.query().whereBetween('tanggal', [request.input('start_date'), request.input('end_date')]).preload('karyawan').preload('proyek').groupBy('karyawan_id')
            const all_man_hours = await await ManHour.query()
            .whereBetween('tanggal', [request.input('start_date'), request.input('end_date')])
            .preload('karyawan')
            .preload('proyek');
            
            let reports = [];

            
            man_hours.forEach(karyawan => {
                let laporan = all_man_hours.filter(item => item.karyawan_id === karyawan.karyawan.id).map(item => {
                    return {
                        proyek: item.proyek.namaProyek,
                        tanggal: item.tanggal,
                        jam_kerja: item.jam_kerja,
                        karyawan: item.karyawan,
                    };
                });

                reports.push({
                    id: karyawan.id,
                    nama_karyawan: karyawan.karyawan.nama,
                    data_laporan: laporan
                });
            });            

            man_hours = reports;

        } else {

            man_hours = await ManHour.query()
                .preload('karyawan')
                .preload('proyek')
                .where('karyawan_id', karyawan.id)
                .groupBy('karyawan_id')

                const all_man_hours = await ManHour.query()
                // .whereBetween('tanggal', [request.input('start_date'), request.input('end_date')])
                .preload('karyawan')
                .preload('proyek');
                
            let reports = [];

            man_hours.forEach(karyawan => {
                let laporan = all_man_hours.filter(item => item.karyawan_id === karyawan.karyawan_id).map(item => {
                    return {
                        proyek: item.proyek.namaProyek,
                        tanggal: item.tanggal,
                        jam_kerja: item.jam_kerja,
                        karyawan: item.karyawan,
                    };
                });

                reports.push({
                    nama_karyawan: karyawan.karyawan.nama,
                    data_laporan: laporan // Array of laporan for the specific karyawan
                });
            });

            man_hours = reports
        }

        // const manhours = await ManHour.query().preload('karyawan').preload('proyek')

        return inertia.render('admin/management/laporan', {
            data_manhours: man_hours
        });
    }
}
