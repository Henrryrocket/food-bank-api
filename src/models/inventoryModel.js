//  DB
let database = [
  { id: 1, name: 'Arroz', quantity: 50, unit: 'kg' },
  { id: 2, name: 'Leche', quantity: 20, unit: 'litros' },
];

export const InventoryModel = {
  findAll: async () => {
    return database;
  },
  findById: async (id) => {
    return database.find((item) => item.id === id);
  },

  create: async (item) => {
    const newItem = { id: database.length + 1, ...item };
    database.push(newItem);
    return newItem;
  },

  delete: async (id) => {
    const initialLength = database.length;
    database = database.filter((item) => item.id !== id);
    return database.length < initialLength; // Retorna true si borró algo
  },
};
