const sinon = require('sinon');
const { expect } = require('chai');
const connect = require('../../../models/connection');
const productModel = require('../../../models/product_model');

describe('Testando o arquivo product_model.js', () => {

  describe('Teste da função getAll', () => {

    const products = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];

    before(async () => {
      const execute = [products];
  
      sinon.stub(connect, 'execute').resolves(execute);
    });

    after(async () => {
      connect.execute.restore();
    });

    it('Testa o retorno de todos os produtos', async () => {
      const response = await productModel.getAll();

      expect(response).to.be.an('array');
      expect(response[0]).to.include.all.keys('id', 'name');
      expect(response).to.be.not.empty;
    });
  });

  describe('Teste da função getById', () => {

    const product = [
      { id: 1, name: 'Martelo de Thor' },
    ];
  
    before(async () => {
      const execute = [product];
  
      sinon.stub(connect, 'execute').resolves(execute);
    });
  
    after(async () => {
      connect.execute.restore();
    });
  
    describe('quando existe um produto com o id informado', async () => {
  
      it('e o objeto é retornado com "id" e "name"', async () => {
        const response = await productModel.getById(1);

      expect(response).to.be.an('object');
      expect(response).to.include.all.keys('id', 'name');
      expect(response).to.be.not.empty;
      });
    });
  });

  describe('Teste da função create', async () => {
    const product = { id: 5, name: 'Martelo do Batman' };

    before(async () => {
      const execute = [product.id];
  
      sinon.stub(connect, 'execute').resolves(execute);
    });

    after(async () => {
      connect.execute.restore();
    });

    describe('quando o produto é cadastrado', async () => {
  
      it('e o objeto é retornado com "id" e "name"', async () => {
        const response = await productModel.createProduct(product.name);

      expect(response).to.be.an('object');
      expect(response).to.include.all.keys('id', 'name');
      expect(response).to.be.not.empty;
      });
    });
  });

  describe('Teste da função update', async () => {

    before(async () => {
      sinon.stub(connect, 'execute').resolves();
    });

    after(async () => {
      connect.execute.restore();
    });

    describe('quando o produto é atualizado', async () => {
  
      it('e o objeto é retornado atualizado', async () => {
        const response = await productModel.updateProduct({ id:1, name: 'Martelo do Capitão América' });

      expect(response).to.be.an('object');
      expect(response).to.include.all.keys('id', 'name');
      expect(response).to.be.not.empty;
      });
    });
  });

  describe('Teste da função delete', async () => {

    before(async () => {
      sinon.stub(connect, 'execute').resolves();
    });

    after(async () => {
      connect.execute.restore();
    });

    describe('quando o produto é deletado', async () => {
  
      it('e é retornado o id do produto', async () => {
        const response = await productModel.deleteProduct(3);

        expect(response).to.eq(3);
      });
    });
  });
});
