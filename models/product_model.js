const connection = require('./connection');

const getAll = async () => {
  const [productData] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return productData;
};

const getById = async (id) => {
  const [productData] = await connection.execute(
    'SELECT * FROM StoreManager.products where id = ?', [id],
  );

  if (productData === 0) return null;

  return productData[0];
};

const createProduct = async ({ name }) => {
  const [productData] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );
  
  return { id: productData.insertId, name };
};

const updateProduct = async ({ id, name }) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id],
  );

  return { id, name };
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [id],
  );

  return id;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};