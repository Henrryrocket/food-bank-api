//  DB
import mongoose from 'mongoose';

//Define schema

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'La cantidad del producto es obligatoria'],
      min: [0, 'La cantidad no puede ser negativa'],
    },
    unit: {
      type: String,
      required: [true, 'La unidad del producto es obligatoria'],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// export const InventoryModel = {
//   findAll: async () => {
//     return database;
//   },
//   findById: async (id) => {
//     return database.find((item) => item.id === id);
//   },

//   create: async (item) => {
//     const newItem = { id: database.length + 1, ...item };
//     database.push(newItem);
//     return newItem;
//   },

//   delete: async (id) => {
//     const initialLength = database.length;
//     database = database.filter((item) => item.id !== id);
//     return database.length < initialLength; // Retorna true si borró algo
//   },
// };
export const InventoryModel = mongoose.model('Item', inventorySchema);
