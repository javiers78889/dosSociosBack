import Products from '../models/Products'
import { Request, Response } from 'express';
import { existsSync, unlink } from 'fs';

import path from 'path';



export const selectProducts = async (req, res) => {
  const findProducts = await Products.findAll()
  res.json(findProducts)
}

export const CreateProducts = async (req: Request, res: Response) => {
  try {
    // Verificar si el archivo (imagen) fue subido
    if (!req.file) {
      res.status(400).json({ message: 'No se ha subido ningún archivo.' });
      return; // Salir después de enviar la respuesta
    }
    // Obtener la URL de la imagen subida
    const imageUrl = `/uploads/${req.file.filename}`

    // Crear el producto con los datos del cuerpo de la solicitud (req.body) y la URL de la imagen
    const producto = await Products.create({
      ...req.body,  // Todos los campos del cuerpo de la solicitud
      imagen: imageUrl,     // Agregar la URL de la imagen al producto
    });


    // Devolver la respuesta con el producto creado
    res.status(201).json({
      message: 'Producto creado con éxito',
      producto,
    });

  

  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};