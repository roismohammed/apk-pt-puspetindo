import type { HttpContext } from '@adonisjs/core/http'

export default class LaporansController {
    async laporan ({inertia}:HttpContext){
        return inertia.render('admin/management/laporan')
    }
}