import { MongoClient } from 'mongodb';

// Importa a classe MongoClient do pacote mongodb. Essa classe é fundamental para se conectar a um banco de dados MongoDB.

export default async function conectarAoBanco(stringConexao) {
  // Define uma função assíncrona chamada 'conectarAoBanco' que recebe como parâmetro a string de conexão para o banco de dados.
  // A palavra-chave 'async' indica que a função pode conter operações assíncronas, como a conexão ao banco.

  let mongoClient;
  // Declara uma variável 'mongoClient' para armazenar a instância do cliente MongoDB.

  try {
    // Bloco try-catch para tratar possíveis erros durante a conexão.

    mongoClient = new MongoClient(stringConexao);
    // Cria uma nova instância do cliente MongoDB, passando a string de conexão como argumento. Essa instância será usada para interagir com o banco de dados.

    console.log('Conectando ao cluster do banco de dados...');
    // Imprime uma mensagem no console indicando que a conexão está sendo estabelecida.

    await mongoClient.connect();
    // Tenta conectar ao banco de dados. A palavra-chave 'await' pausa a execução da função até que a conexão seja estabelecida ou ocorra um erro.

    console.log('Conectado ao MongoDB Atlas com sucesso!');
    // Se a conexão for bem-sucedida, imprime uma mensagem de sucesso no console.

    return mongoClient;
    // Retorna a instância do cliente MongoDB para que possa ser utilizada em outras partes do código para realizar operações no banco de dados.

  } catch (erro) {
    // Se ocorrer algum erro durante a conexão, o bloco catch é executado.

    console.error('Falha na conexão com o banco!', erro);
    // Imprime uma mensagem de erro no console, junto com o objeto de erro para mais detalhes.

    process.exit();
    // Encerra a aplicação caso ocorra um erro fatal na conexão com o banco de dados.
  }
}