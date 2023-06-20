import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('o retorno da função fetchProductsList seja igual a computadorSearch', async () => {
    const produtos = await fetchProductsList('computador');
    expect(produtos).toMatchObject(computadorSearch);
  });

  it('ao chamar a função sem parametro retorne um erro', async () => {
    const erro = new Error('Termo de busca não informado');
    await expect(fetchProductsList()).rejects.toThrow(erro);
  });
});
