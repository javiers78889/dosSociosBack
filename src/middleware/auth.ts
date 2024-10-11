import jwt from 'jsonwebtoken';
import Users from '../models/Users';

export const autorizacion = (req, res, next) => {
    const authHeader = req.get('Authorization')

    if (!authHeader) {
        const error = new Error('No autenticado, no hay JWT');
        (error as any).statusCode = 401; // Usar aserción de tipos para evitar error de TypeScript
        throw error;
    }

    //Obtener token
    const token = authHeader.split(' ')[1];
    let decodedToken;



    try {
        decodedToken = jwt.verify(token, 'LLAVESECRETA'); // Reemplaza 'tu_clave_secreta' con tu clave secreta real

    } catch (err) {
        (err as any).statusCode = 500;
        throw err;
    }

    if (!decodedToken) {
        const error = new Error('No autenticado, token no válido');

    }
    next()
}

export const existUser = async (req, res, next) => {
    const { user } = req.body;
    const { correo } = req.body;

    try {
        const usuario = await Users.findOne({ where: { user:user } });
        const mail = await Users.findOne({ where: { correo:correo } });

        if (usuario || mail) {
            return res.status(409).json({ message: 'Este usuario o correo ya existe' });
        } else {
            next();
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor', error });
    }
}
