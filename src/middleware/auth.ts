import jwt from 'jsonwebtoken';

export const autorizacion = (req, res,next) => {
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