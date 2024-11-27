import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

// Importa a função `conectarAoBanco` a partir do arquivo `dbconfig.js`. 
// Essa função é responsável por estabelecer a conexão com o banco de dados.

// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente.
// A string de conexão está armazenada na variável de ambiente `process.env.STRING_CONEXAO`.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts no banco de dados.
export async function getTodosPosts() {
  // Seleciona o banco de dados 'Imersão-instabytes'.
  const db = conexao.db("Imersão-instabytes");

  // Seleciona a coleção 'posts' dentro do banco de dados.
  const colecao = db.collection("posts");

  // Retorna um array com todos os documentos da coleção.
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados.
export async function criarPost(novoPost) {
  // Seleciona o banco de dados 'Imersão-instabytes'.
  const db = conexao.db("Imersão-instabytes");

  // Seleciona a coleção 'posts' dentro do banco de dados.
  const colecao = db.collection("posts");

  // Insere um novo documento (post) na coleção e retorna um objeto com informações sobre a inserção.
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const objID = ObjectId.createFromHexString(id);
 
  // Seleciona o banco de dados 'Imersão-instabytes'.
  const db = conexao.db("Imersão-instabytes");
  // Seleciona a coleção 'posts' dentro do banco de dados.
  const colecao = db.collection("posts")
  
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}

