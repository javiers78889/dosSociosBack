import { Router } from 'express'
import { CreateUsers, selectUsers, updateUsers, ValidationUser } from '../handlers/usuarios.Components';
import { CreateProducts, deleProducts, selectProducts, UpdateProducts } from '../handlers/productos.Components';
import { autorizacion, existUser } from '../middleware/auth'
import { upload } from '../middleware/images';
import { CreatePedidos, deletePedidos, selectPedidos, UpdatePedidos } from '../handlers/pedidos.Components';


export const router = Router();

//validacion Login
router.post('/login', ValidationUser)

// Usuarios
router.get('/users', autorizacion, selectUsers)
router.post('/users', existUser, CreateUsers)
router.put('/users/:id', existUser, updateUsers)


// Productos
router.get('/products', selectProducts)
router.post('/products', autorizacion, upload.single('imagen'), CreateProducts)
router.put('/products/:id', autorizacion, UpdateProducts)
router.delete('/products/:id', deleProducts)

// Pedidos
router.get('/pedidos', autorizacion, selectPedidos)
router.post('/pedidos', autorizacion, CreatePedidos)
router.put('/pedidos/:id', autorizacion, UpdatePedidos)
router.delete('/pedidos/:id', autorizacion, deletePedidos)