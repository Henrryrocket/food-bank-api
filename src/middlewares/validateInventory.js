import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  quantity: z
    .number({ invalid_type_error: 'La cantidad debe ser un número' })
    .nonnegative('La cantidad no puede ser negativa'),
  unit: z.string().min(1, 'La unidad es obligatoria'),
});

export const validateProduct = (req, res, next) => {
  try {
    // Esto lanzará si no cumple el schema
    req.body = productSchema.parse(req.body);
    next();
  } catch (err) {
    const errors = err.errors
      ? err.errors.map((e) => e.message)
      : [err.message];
    return res.status(400).json({ errors });
  }
};
