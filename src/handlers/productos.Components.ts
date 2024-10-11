import Products from '../models/Products'
import { Request, Response } from 'express';
import { existsSync, unlink } from 'fs';

import path from 'path';



export const selectProducts = async (req, res) => {
  const findProducts = await Products.findAll()

  if (findProducts.length <= 0) {
    return res.json({ mensaje: 'No hay productos Registrados' })
  }
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
    const imageUrl = req.file.filename
    console.log(imageUrl)

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

export const UpdateProducts = async (req, res) => {

  const { id } = req.params

  const products = await Products.findByPk(id);

  try {

    products.update(req.body);
    res.status(201).json('Producto Actualizado')

  } catch (error) {

    res.status(500).json(error)
  }
}

export const deleProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json('Producto no encontrado'); // Respuesta si el producto no existe
    }

    await product.destroy();
    return res.status(200).json('Producto Eliminado'); // Cambié el estado a 200 ya que es una eliminación exitosa

  } catch (error) {
    console.error(error); // Esto puede ayudarte a depurar el error
    return res.status(500).json('Error al eliminar Producto'); // Asegúrate de usar return aquí también
  }
}
