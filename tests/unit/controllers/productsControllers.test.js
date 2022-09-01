const sinon = require('sinon');
const { expect } = require('chai');

const product_service = require('../../../services/product_service');
const product_controller = require('../../../controllers/product_controller');

describe('Testando o arquivo product_controller.js', () => {

  describe('Teste da função getAll', () => {

    beforeEach(() => {
      const result = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];
  
      sinon.stub(product_service, 'getAll').resolves(result);
    });

    afterEach(() => {
      product_service.getAll.restore();
    });

    it('Testa o retorno com status 200', async () => {
      const response = {};
      const request = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await product_controller.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('Os produtos são um array de objetos Json', async () => {
        const results = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];
      
      const response = {};
      const request = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await product_controller.getAll(request, response);

      expect(response.json.calledWith(results)).to.be.true;
    });
  });

  describe('Teste da função getById', () => {

    describe('Quando o id é valido', async () => {

      beforeEach(() => {
        const result = [
          { id: 1, name: 'Martelo de Thor' },
        ];
    
        sinon.stub(product_service, 'getById').resolves(result);
      });

      afterEach(() => {
        product_service.getById.restore();
      });

      it('Testa o retorno com status 200', async () => {
        const response = {};
        const request = {};

        request.params = { id: 1 };
  
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        await product_controller.getById(request, response);
  
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('O produto é um array de objetos Json', async () => {
        const result = [
          { id: 1, name: 'Martelo de Thor' },
        ];
        
        const response = {};
        const request = {};
        request.params = { id: 1 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        await product_controller.getById(request, response);
  
        expect(response.json.calledWith(result)).to.be.true;
      });
    });
  });

  describe('Teste da função create', () => {

    describe('Quando o id é valido', async () => {

      beforeEach(() => {
        const result = { id: 5, name: 'Martelo do Batman' };
    
        sinon.stub(product_service, 'create').resolves(result);
      });

      afterEach(() => {
        product_service.create.restore();
      });

      it('Testa o retorno com status 201', async () => {
        const response = {};
        const request = {};

        request.body = {
          name: 'Martelo do Batman'
        };
  
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        await product_controller.create(request, response);
  
        expect(response.status.calledWith(201)).to.be.true;
      });

      it('O produto é um objeto Json', async () => {
        const newResult = { id: 5, name: 'Martelo do Batman' };
        
        const response = {};
        const request = {};
        request.body = { name: 'Martelo do Batman' };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        await product_controller.create(request, response);
  
        expect(response.json.calledWith(newResult)).to.be.true;
      });
    });
  });

  describe('Teste da função deleted', () => {

    beforeEach(() => {
      const result = true;
  
      sinon.stub(product_service, 'deleted').resolves(result);
    });

    afterEach(() => {
      product_service.deleted.restore();
    });

    describe('Quando o id é valido', async () => {

      it('Testa o retorno com status 204', async () => {
        const response = {};
        const request = {};

        request.params = {
          id: 1
        };
  
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        await product_controller.deleted(request, response);
  
        expect(response.status.calledWith(204)).to.be.true;
      });
    });
  });
});