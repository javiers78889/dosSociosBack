import { Router } from 'express'
import { CreateUsers, selectUsers, ValidationUser } from '../handlers/usuarios.Components';
import { CreateProducts, selectProducts } from '../handlers/productos.Components';
import { autorizacion } from '../middleware/auth'
import { upload } from '../middleware/images';


export const router = Router();

//validacion Login
router.post('/login', ValidationUser)

// Usuarios
router.get('/users', autorizacion, selectUsers)
router.post('/users', autorizacion, CreateUsers)



// Productos

router.get('/products', autorizacion, selectProducts)
router.post('/products', autorizacion, upload.single('imagen'), CreateProducts)