import db from "./config/db"
import express from 'express'
import { router } from './routes/routes';
import cors from 'cors'
const connectDb = async () => {
    try {
        await db.authenticate()
        db.sync()
        console.log('Conexion exitosa')

    } catch (error) {
        console.log('Error de Conexion')
        console.error(error)
    }
}

connectDb()

const app = express();
app.use(cors({
    origin: '*', // Permite solicitudes de todos los orígenes (ajustar según sea necesario)
}))
app.use(express.static('uploads'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/', router)

export default app


