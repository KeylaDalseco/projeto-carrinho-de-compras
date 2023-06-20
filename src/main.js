import { getSavedCartIDs } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const adicionandoElement = document.querySelector('.products');
const ol = document.querySelector('.cart__products');

// Função que cria a lista de produtos;
const createList = async () => {
  const computadores = await fetchProductsList('computador');
  computadores.forEach((computador) => {
    const addProdutos = createProductElement(computador);
    adicionandoElement.appendChild(addProdutos);
  });
};

// Função que apaga o carregando...
const apagando = async () => {
  const loading = document.querySelector('.loading');
  loading.remove();
  // loading.classList.remove('loading');
};

// const apagandoErro = async () => {
//   const messageError = document.querySelector('.error');
//   messageError.classList.remove('error');
// };

// Função que cria a mensagem de erro, caso a API não funcione;
const textoErroAPI = async () => {
  const p = document.createElement('p');
  p.className = 'error';
  p.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  document.body.appendChild(p);
};

// Função que cria o carregamento, até a promisse ser resolvida;
const carregando = async () => {
  const div = document.createElement('div');
  div.className = 'loading';
  div.innerHTML = 'carregando...';
  document.body.appendChild(div);

  await createList();

  await apagando();
};

// tratamento do erro se a Api der erro;
carregando().then((res) => res).catch(() => textoErroAPI());

const saveLocalstorage = async () => { // função q salva no local storage
  const produtoSalvo = getSavedCartIDs(); // retorna array de ids
  const selecionandoID = produtoSalvo.map((id) => fetchProduct(id));

  const produtos = await Promise.all(selecionandoID);
  produtos.forEach((produto) => {
    ol.appendChild(createCartProductElement(produto));
  });
};

window.onload = () => {
  saveLocalstorage();
};
