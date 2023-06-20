const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const URL_ID = 'https://api.mercadolibre.com/items/';

export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado');
  }

  const response = await fetch(`${URL_ID}${id}`);
  const data = await response.json();
  return data;
};

fetchProduct('MLB1405519561');

export const fetchProductsList = async (product) => {
  if (!product) {
    throw new Error('Termo de busca não informado');
  }

  const response = await fetch(`${URL}${product}`);
  const json = await response.json();
  const resultados = json.results;
  return resultados;
};

fetchProductsList('computador');
