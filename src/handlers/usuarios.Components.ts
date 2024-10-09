import Users from '../models/Users'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';

export const selectUsers = async (req, res) => {
    const findUsers = await Users.findAll();
    res.json(findUsers)
}

export const CreateUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check('user').notEmpty().withMessage('El nombre de Usuario está vacío').run(req);
    await check('password').notEmpty().withMessage('El password está vacío').run(req);



    const { password, ...rest } = req.body;
    const hashpwd = await bcrypt.hash(password, 12)
    const usuario = { password: hashpwd, ...rest }

    const guardar = await Users.create(usuario)

    try {
        guardar.save()
        res.status(200).json('creado')
    } catch (error) {

        res.status(401).json({ mensaje: 'error' })

    }


};

export const ValidationUser = async (req, res, next) => {
    const { user, password } = req.body;


    const usuario = await Users.findOne({ where: { user } });


    if (!usuario) {
        return res.status(401).json({ mensaje: 'Ese usuario no existe' });
    }
    else {

        const verify = await bcrypt.compare(password, usuario.dataValues.password)
        if (!verify) {
            return res.status(401).json({ mensaje: 'Password Incorrecto' });
        }
        else {

            //firmar el token
            const token = jwt.sign({
                user: usuario.dataValues.user,
                id: usuario.dataValues.id
            }, 'LLAVESECRETA',
                {
                    expiresIn: '1h'
                });

            //retornar el token
            res.json({ token })

        }



    }


};