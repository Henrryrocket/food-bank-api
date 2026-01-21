import logger from '../lib/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(err.stack || err.message);
  res.status(500).json({
    message: 'Ocurrió un error interno en el servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
};
