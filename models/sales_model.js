const connection = require('./connection');

const getAll = async () => {
  const [salesData] = await connection.execute(
    `SELECT sp.sale_id, sp.product_id, sp.quantity, sal.date
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS sal 
    ON sal.id = sp.sale_id
    ORDER BY sale_id, product_id`,
  );

  if (salesData.length === 0) return null;

  const salesAll = salesData.map((s) => ({
    saleId: s.sale_id,
    date: s.date,
    productId: s.product_id,
    quantity: s.quantity,
  }));

  return salesAll;
};

const getById = async (id) => {
  const [salesData] = await connection.execute(
    `SELECT sp.sale_id, sp.product_id, sp.quantity, sal.date
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS sal 
    ON sal.id = sp.sale_id
    WHERE sale_id = ?`, [id],
  );

  if (salesData.length === 0) return null;

  const salesId = salesData.map((sale) => ({
    saleId: sale.saleId,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));

  return salesId;
};

const createSale = async () => {
  const [productData] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  
  return productData.insertId;
};

const createSaleProduct = async (saleId, productId, quantity) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, productId, quantity],
  );
};

const updateSale = async (id, sales) => {
  await Promise.all(sales.map(async (s) => connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE product_id = ? AND sale_id = ?',
    [s.quantity, s.productId, id],
  )));
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?', [id],
  );

  return id;
};

module.exports = {
  getAll,
  getById,
  createSale,
  createSaleProduct,
  updateSale,
  deleteSale,
};