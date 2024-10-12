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
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));
app.use(express.json())
app.use('/', router)

export default app


