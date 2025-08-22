#  Biblioteca de Músicas

Uma aplicação web simples para gerenciar sua biblioteca pessoal de músicas, desenvolvida como projeto de portfólio.

# Funcionalidades

- **Adicionar músicas**: Cadastre novas músicas com título, artista, álbum e ano
- **Remover músicas**: Delete músicas da biblioteca
- **Favoritar músicas**: Marque suas músicas favoritas
- **Totalizador**: Visualize o total de músicas e favoritas
- **Filtros**: Visualize todas as músicas ou apenas as favoritas



# Tecnologias utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: Node.js, Express.js
- **Testes**: Cypress E2E
- **Ícones**: Font Awesome
- **Armazenamento**: localStorage + API REST

# Características técnicas

- **Arquitetura**: Single Page Application (SPA) com servidor Express
- **Armazenamento**: localStorage + API REST para persistência
- **Responsividade**: Design adaptável para diferentes tamanhos de tela
- **Performance**: Funciona em memória com servidor local para testes
- **Testes**: Suíte completa de testes E2E com Cypress

# Requisitos implementados

| ID | Requisito | Status |
|----|-----------|---------|
| RF001 | Adição de música com quantidade inicial = 1 | 
| RF002 | Remoção de música da biblioteca | 
| RF003 | Favoritar/desfavoritar música | 
| RF004 | Totalizador de músicas | 
| RF005 | Listagem de músicas | 
| RF006 | Interface web responsiva |    
| RF007 | Funcionamento em memória | 
| RF008 | Funcionalidade em página única | 



## 📁 Estrutura do projeto

```
biblioteca-musicas/
├── index.html                    # Página principal
├── styles.css                    # Estilos CSS
├── script.js                     # Lógica JavaScript
├── server.js                     # Servidor Express local
├── swagger.config.js             # Configuração Swagger
├── package.json                  # Dependências e scripts
├── cypress.config.js             # Configuração Cypress
├── cypress/
│   ├── e2e/
│   │   └── biblioteca-musicas.cy.js  # Testes E2E
│   └── support/
│       ├── commands.js               # Comandos personalizados
│       └── e2e.js                   # Configurações globais
├── README.md                     # Documentação do projeto
├── INSTRUCOES.md                 # Guia detalhado de uso
├── SWAGGER.md                    # Documentação da API
└── API_TESTS.md                  # Guia de testes da API
```






# Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor em modo produção |
| `npm run dev` | Inicia o servidor com auto-reload |
| `npm run cypress:open` | Abre Cypress em modo interativo |
| `npm run cypress:run` | Executa todos os testes |
| `npm test` | Executa testes em modo headless |

# Endpoints da API

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/` | GET | Página principal da aplicação |
| `/api/status` | GET | Status da API |
| `/api/info` | GET | Informações da aplicação |
| `/api-docs` | GET | **Documentação Swagger interativa** |




# Documentação Swagger

A API possui documentação completa e interativa usando **Swagger/OpenAPI 3.0**:

- **URL**: http://localhost:3000/api-docs
- **Interface**: Swagger UI responsiva
- **Schemas**: Modelos de dados validados
- **Testes**: Execute endpoints diretamente no navegador
- **Exportação**: Gere coleções para Postman/Insomnia

Para mais detalhes, consulte [SWAGGER.md](./SWAGGER.md).

# Como executar

#: Servidor local 
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Acessar em http://localhost:3000
```


# Executando testes

```bash
# Abrir Cypress em modo interativo
npm run cypress:open

# Executar todos os testes
npm run cypress:run

# Executar testes em modo headless
npm test
```

# Licença

Este projeto foi desenvolvido como demonstração de portfólio e está disponível para uso pessoal e educacional.

