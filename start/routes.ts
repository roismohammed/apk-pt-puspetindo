const DepartemenController = () => import('#controllers/departemen_controller')
const KaryawansController = () => import('#controllers/karyawans_controller')
const LaporansController = () => import('#controllers/laporans_controller')
const PenggunasController = () => import('#controllers/penggunas_controller')
const ManHoursController = () => import('#controllers/man_hours_controller')
const ProyeksController = () => import('#controllers/proyeks_controller')
const PermissionsController = () => import('#controllers/permissions_controller')
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import MenuProfilsController from '#controllers/menu_profils_controller'
const ProjectManagementsController =() =>  import ('#controllers/project_managements_controller')
const TiketingsController =() => import ('#controllers/tiketings_controller')
const PpwisController = () => import ('#controllers/ppwis_controller')
const JudulPpwisController =() => import ('#controllers/judul_ppwis_controller')
const HomeController = () => import('#controllers/home_controller')

router.get('/', [HomeController, 'index']).use(middleware.auth())


router.group(() => {
    router.get('/', [KaryawansController, 'index'])
    router.get('create', [KaryawansController, 'create'])
    router.post('create', [KaryawansController, 'store'])
    router.delete('delete/:id', [KaryawansController, 'delete'])
    router.get('edit/:id', [KaryawansController, 'edit'])
    router.put('edit/:id', [KaryawansController, 'update'])
}).prefix('/karyawan/').use(middleware.auth())

router.group(() => {
    router.get('/',[TiketingsController,'index'])
    router.get('laporan',[TiketingsController,'laporan'])
    router.get('create',[TiketingsController,'create'])
    router.post('create',[TiketingsController,'store'])
}).prefix('/tiketing/').use(middleware.auth())

router.group(() => {
    router.get('/', [DepartemenController, 'index'])
    router.post('create', [DepartemenController, 'store'])
    router.get('edit/:id', [DepartemenController, 'edit'])
    router.delete('delete/:id', [DepartemenController, 'delete'])
}).prefix('/departemen/').use(middleware.auth())

router.group(() => {
    router.get('/', [ProyeksController, 'index'])
    router.post('create', [ProyeksController, 'store'])
    router.delete('delete/:id',[ProyeksController, 'delete'])
    router.put('edit/:id', [ProyeksController, 'update'])
}).prefix('/proyek/').use(middleware.auth())

router.group(() => {
    router.get('/', [ManHoursController, 'index'])
    router.get('create',[ManHoursController,'create'])
    router.post('create', [ManHoursController, 'store'])
    router.delete('delete/:id', [ManHoursController, 'delete'])
    router.get('edit/:id', [ManHoursController, 'edit'])
}).prefix('/manhours/').use(middleware.auth())

router.group(() => {
    router.get('/', [ProjectManagementsController, 'index'])
    router.post('/manhours/verify', [ProjectManagementsController,'verify'])
    router.post('/manhours/reject', [ProjectManagementsController,'reject'])
}).prefix('/project/').use(middleware.auth())

router.group(() => {
    router.get('/' ,[PpwisController,'index'])
    router.get('detail/:id' ,[PpwisController,'detail'])
    router.post('create',[PpwisController,'store'])
    router.post('delete/:file',[PpwisController,'delete'])
    router.get('download/:file',[PpwisController,'download'])
}).prefix('/ppwi/').use(middleware.auth())

router.group(() => {
    router.get('/' ,[JudulPpwisController,'index'])
    router.post('create',[JudulPpwisController,'store'])
    router.delete('delete/:id',[JudulPpwisController,'delete'])
}).prefix('/judul/').use(middleware.auth())

router.get('/menuProfil', [MenuProfilsController, 'index'])
router.get('/login', [AuthController, 'login']).use(middleware.guest())
router.post('/auth/login', [AuthController, 'loginAuth'])

router.post('logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/login')
}).use(middleware.auth())

router.get('/management/laporan', [LaporansController, 'laporan']).use(middleware.auth())

router.group(() => {
    router.get('/', [PenggunasController, 'index'])
}).prefix('/pengguna/').use(middleware.auth())

router.group(() => {
    router.get('/', [PermissionsController, 'index'])
    router.get('create', [PermissionsController, 'create'])
}).prefix('/permission/')
