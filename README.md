#  Biblioteca de Músicas

Uma aplicação web simples para gerenciar sua biblioteca pessoal de músicas, desenvolvida como projeto de portfólio.

# Funcionalidades

- **Adicionar músicas**: Cadastre novas músicas com título, artista, álbum e ano
- **Validação inteligente**: Prevenção de músicas duplicadas e validação de campos obrigatórios
- **Remover músicas**: Delete músicas da biblioteca com confirmação
- **Favoritar músicas**: Marque suas músicas favoritas com toggle visual
- **Totalizador**: Visualize o total de músicas e favoritas em tempo real
- **Filtros**: Visualize todas as músicas ou apenas as favoritas
- **Notificações visuais**: Sistema de feedback com cores e ícones para diferentes tipos de mensagem



# Tecnologias utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: Node.js, Express.js
- **Testes**: Cypress E2E
- **Ícones**: Font Awesome
- **Armazenamento**: localStorage + API REST

# Características técnicas

- **Arquitetura**: Single Page Application (SPA) com servidor Express
- **Armazenamento**: localStorage + API REST para persistência
- **Validação**: Sistema robusto de validação com notificações visuais
- **Responsividade**: Design adaptável para diferentes tamanhos de tela
- **Performance**: Funciona em memória com servidor local para testes
- **Testes**: Suíte completa de testes E2E com Cypress

# Requisitos implementados

| ID | Requisito | Status |
|----|-----------|---------|
| RF001 | Adição de música com validação de duplicatas e campos obrigatórios |
| RF002 | Remoção de música da biblioteca com confirmação |
| RF003 | Favoritar/desfavoritar música com toggle visual |
| RF004 | Totalizador de músicas e favoritas em tempo real |
| RF005 | Listagem de músicas com filtros |
| RF006 | Funcionamento em memória sem banco de dados |
| RF008 | Funcionalidade em página única |
| RF009 | Prevenção de músicas duplicadas | 



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
| `/api/songs` | GET | Listar todas as músicas |
| `/api/songs` | POST | Adicionar nova música |
| `/api/songs/:id` | GET | Obter música específica |
| `/api/songs/:id` | PUT | Atualizar música |
| `/api/songs/:id` | DELETE | Remover música |
| `/api/songs/:id/favorite` | PATCH | Toggle favorito |
| `/api/songs/stats/summary` | GET | Estatísticas da biblioteca |
| `/api-docs` | GET | **Documentação Swagger interativa** |




# Documentação Swagger

A API possui documentação completa e interativa usando **Swagger/OpenAPI 3.0**:

- **URL**: http://localhost:3000/api-docs
- **Interface**: Swagger UI responsiva
- **Schemas**: Modelos de dados validados
- **Testes**: Execute endpoints diretamente no navegador
- **Exportação**: Gere coleções para Postman/Insomnia

Para mais detalhes, consulte [SWAGGER.md](./SWAGGER.md).

## 🎨 Sistema de Notificações Visuais

A aplicação implementa um sistema robusto de notificações para melhorar a experiência do usuário:

### **Tipos de notificação:**
- **🟢 Success**: Verde com ícone de check - Operações bem-sucedidas
- **🟠 Warning**: Laranja com ícone de triângulo - Validações e avisos
- **🔴 Error**: Vermelho com ícone de exclamação - Erros críticos
- **🔵 Info**: Azul com ícone de informação - Informações gerais

### **Validações implementadas:**
- **Campos obrigatórios**: Título e artista são validados individualmente
- **Prevenção de duplicatas**: Músicas com mesmo título e artista são bloqueadas
- **Feedback visual**: Notificações aparecem no canto superior direito
- **Auto-remoção**: Notificações desaparecem automaticamente após 3 segundos

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

## 🧪 Suíte de Testes E2E

O projeto inclui uma suíte completa de testes automatizados:

### **Testes implementados:**
- **Validação de formulário**: Campos obrigatórios e validações
- **Adição de músicas**: Fluxo completo de cadastro
- **Prevenção de duplicatas**: Validação de músicas já existentes
- **Gerenciamento de favoritos**: Adicionar e remover favoritos
- **Exclusão de músicas**: Remoção com confirmação
- **Interface responsiva**: Verificação de elementos visuais

### **Cobertura de testes:**
- ✅ **Validações**: Campos obrigatórios e duplicatas
- ✅ **CRUD completo**: Criar, ler, atualizar e deletar músicas
- ✅ **Favoritos**: Sistema completo de favoritos
- ✅ **Notificações**: Verificação de mensagens visuais
- ✅ **UX/UI**: Elementos visuais e responsividade

# Licença

Este projeto foi desenvolvido como demonstração de portfólio e está disponível para uso pessoal e educacional.