import { InventoryModel } from '../models/inventoryModel.js';

export const getItems = async (req, res, next) => {
  try {
    const items = await InventoryModel.find(); // Método de Mongoose
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await InventoryModel.findById(id); // Método de Mongoose

    if (!item) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(item);
  } catch (error) {
    // Si el ID tiene un formato inválido para Mongo, dará error
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Formato de ID inválido' });
    }
    next(error);
  }
};

export const addItem = async (req, res, next) => {
  try {
    // Mongoose valida los tipos y requeridos definidos en el Schema
    const newItem = await InventoryModel.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    // Capturar errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await InventoryModel.findByIdAndDelete(id); // Método de Mongoose

    if (!result) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Formato de ID inválido' });
    }
    next(error);
  }
};

// import { InventoryModel } from '../models/inventoryModel.js';

// export const getItems = async (req, res, next) => {
//   try {
//     const items = await InventoryModel.findAll();
//     res.status(200).json(items);
//   } catch (error) {
//     next(error); // Pasa el error al middleware de errores
//   }
// };

// export const getItemById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const item = await InventoryModel.findById(parseInt(id));

//     if (!item) {
//       return res.status(404).json({ message: 'Producto no encontrado' });
//     }
//     res.json(item);
//   } catch (error) {
//     next(error);
//   }
// };

// export const addItem = async (req, res, next) => {
//   try {
//     // Asumimos que el middleware de validación ya revisó el body
//     const newItem = await InventoryModel.create(req.body);
//     res.status(201).json(newItem);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteItem = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deleted = await InventoryModel.delete(parseInt(id));

//     if (!deleted) {
//       return res
//         .status(404)
//         .json({ message: 'No se pudo eliminar: ID no encontrado' });
//     }
//     res.status(204).send();
//   } catch (error) {
//     next(error);
//   }
// };
