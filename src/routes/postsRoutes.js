// Importa o framework Express para criar aplicações web
import express from "express";

// Importa o middleware Multer para lidar com uploads de arquivos
import multer from "multer";

// Importa funções (provavelmente) do arquivo postsController.js
// para manipular posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento em disco para arquivos enviados
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório para salvar os arquivos enviados: "uploads/"
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo como o nome original enviado pelo cliente
    cb(null, file.originalname);
  },
});

// Configura o middleware de upload (uso preferido)
const upload = multer({ dest: "./uploads", storage });

// Opção alternativa para Linux/Mac (não recomendada)
// Omite a configuração de filename, podendo causar duplicatas
// const upload = multer({ dest: "./uploads" });

// Define uma função para criar rotas na aplicação Express
const routes = (app) => {
  // Habilita o parsing de dados JSON no corpo das requisições
  app.use(express.json());

  app. use(cors(corsOptions));
  // Rota GET para listar todos os posts (chama a função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (chama a função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware upload.single("imagem") 
  // e chama a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);
  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes para uso em outros arquivos
export default routes;