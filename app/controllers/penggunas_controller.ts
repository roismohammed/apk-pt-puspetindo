import type { HttpContext } from '@adonisjs/core/http'

export default class PenggunasController {
    async pengguna({inertia}:HttpContext){
        return inertia.render('admin/sistem/pengguna')
    }
}