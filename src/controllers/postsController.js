import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
// Importa as funções `getTodosPosts` e `criarPost` do arquivo `postsModel.js`, que provavelmente contém a lógica para interagir com o banco de dados e realizar as operações de buscar e criar posts.

import fs from "fs";
// Importa o módulo `fs` (filesystem) do Node.js, que permite realizar operações no sistema de arquivos, como renomear arquivos.

import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts(req, res) {
  // Exporta uma função assíncrona chamada `listarPosts` que recebe uma requisição (req) e uma resposta (res).
  // Essa função é responsável por listar todos os posts.

  const posts = await getTodosPosts();
  // Chama a função `getTodosPosts` para obter todos os posts do banco de dados e armazena o resultado na variável `posts`.

  res.status(200).json(posts);
  // Envia uma resposta HTTP com status 200 (sucesso) e os posts em formato JSON para o cliente.
}

export async function postarNovoPost(req, res) {
  // Exporta uma função assíncrona chamada `postarNovoPost` que recebe uma requisição (req) e uma resposta (res).
  // Essa função é responsável por criar um novo post.

  const novoPost = req.body;
  // Obtém os dados do novo post a partir do corpo da requisição (req.body).

  try {
    // Bloco `try-catch` para lidar com possíveis erros durante a criação do post.

    const postCriado = await criarPost(novoPost);
    // Chama a função `criarPost` para inserir o novo post no banco de dados e armazena o resultado na variável `postCriado`.

    res.status(200).json(postCriado);
    // Envia uma resposta HTTP com status 200 (sucesso) e informações sobre o post criado para o cliente.

  } catch (erro) {
    // Se ocorrer algum erro, o bloco `catch` é executado.

    console.error(erro.message);
    // Imprime a mensagem de erro no console para ajudar na depuração.

    res.status(500).json({"Erro":"Falha na requisição."});
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro para o cliente.
  }
}
export async function uploadImagem(req, res) {
    // Exporta uma função assíncrona chamada `uploadImagem` que recebe uma requisição (req) e uma resposta (res).
    // Essa função é responsável por lidar com o upload de imagens e criar um novo post no banco de dados.
  
    const novoPost = {
      descricao: "",
      imgUrl: req.file.originalname,
      alt: ""
    };
    // Cria um objeto `novoPost` para representar o novo post a ser inserido no banco de dados.
    // Inicializa com uma descrição vazia, o nome original da imagem como URL e um texto alternativo vazio.
    // O nome original da imagem será substituído posteriormente por um nome único.
  
    try {
      // Bloco `try-catch` para lidar com possíveis erros durante a execução da função.
  
      const postCriado = await criarPost(novoPost);
      // Chama a função `criarPost` (definida em outro lugar) para inserir o novo post no banco de dados.
      // A função `criarPost` retorna um objeto com informações sobre o post inserido, incluindo o ID do documento.
  
      const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
      // Constrói o novo nome da imagem, utilizando o ID do post inserido para garantir um nome único.
      // O formato do nome da imagem é "uploads/[id do post].png".
  
      fs.renameSync(req.file.path, imagemAtualizada);
      // Utiliza o módulo `fs` (filesystem) para renomear o arquivo da imagem para o novo nome.
      // O caminho original do arquivo é obtido de `req.file.path` e o novo caminho é `imagemAtualizada`.
  
      res.status(200).json(postCriado);
      // Envia uma resposta HTTP com status 200 (sucesso) e o objeto `postCriado` no formato JSON.
      // Isso indica que o post foi criado com sucesso e retorna informações sobre o post ao cliente.
  
    } catch (erro) {
      // Se ocorrer algum erro durante a execução, o bloco `catch` é executado.
  
      console.error(erro.message);
      // Imprime a mensagem de erro no console para facilitar a depuração.
  
      res.status(500).json({"Erro":"Falha na requisição."});
      // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro ao cliente.
    }
  }
export async function atualizarNovoPost(req, res) {
    // Exporta uma função assíncrona chamada `atualizarNovoPost` que recebe uma requisição (req) e uma resposta (res).
    // Essa função é responsável por atualizar um novo post.
  
    const id = req.params.id;
    
    const urlImagem = `http://localhost:3000/${id}.png`;
    
    try {

      const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
      const descricao = await gerarDescricaoComGemini(imgBuffer);

      const post = {
        imgUrl: urlImagem,
        descricao: descricao,
        alt: req.body.alt
      };

      // Bloco `try-catch` para lidar com possíveis erros durante a criação do post.
  
      const postCriado = await atualizarPost(id, post);
      // Chama a função `criarPost` para inserir o novo post no banco de dados e armazena o resultado na variável `postCriado`.
  
      res.status(200).json(postCriado);
      // Envia uma resposta HTTP com status 200 (sucesso) e informações sobre o post criado para o cliente.
  
    } catch (erro) {
      // Se ocorrer algum erro, o bloco `catch` é executado.
  
      console.error(erro.message);
      // Imprime a mensagem de erro no console para ajudar na depuração.
  
      res.status(500).json({"Erro":"Falha na requisição."});
      // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro para o cliente.
    }
  }