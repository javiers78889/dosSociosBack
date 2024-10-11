import Pedidos from "../models/Pedidos"

export const selectPedidos = async (req, res) => {
    try {
        const pedidos = await Pedidos.findAll()

        if (pedidos.length <= 0) {
            return res.json({ mensaje: 'No hay productos' })
        }
        res.json(pedidos)

    } catch (error) {

        console.error(Error)

    }


}


export const CreatePedidos = async (req, res) => {

    try {
        const pedidos = await Pedidos.create(req.body)
        res.status(201).json({ mensaje: 'Pedido Generado', pedidos })

    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: 'Error al crear el pedido', error });

    }

}

export const UpdatePedidos = async (req, res) => {
    const { id } = req.params;

    const pedidos = await Pedidos.findByPk(id)
    if (!pedidos) {
        return res.status(500).json({ mensaje: 'Pedido no econtrado' })
    }
    await pedidos.update(req.body)
    res.status(201).json({ mensjae: 'Pedido Actualizado' })
}

export const deletePedidos = async (req, res) => {
    const { id } = req.params;

    const pedidos = await Pedidos.findByPk(id);
    try {

        pedidos.destroy();
        res.status(201).json('Pedidos Eliminado')

    } catch (error) {
        console.error(error)
        req.status(500).json({ mensaje: 'Error al intentar eliminar el pedido' })
    }
}