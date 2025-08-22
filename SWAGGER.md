# 📚 Documentação Swagger - Biblioteca de Músicas API

## 🌐 Acesso à Documentação

A documentação interativa da API está disponível em:
**http://localhost:3000/api-docs**

## 🚀 Como usar

### 1. Iniciar o servidor
```bash
npm start
# ou
npm run dev
```

### 2. Acessar a documentação
Abra seu navegador e acesse: `http://localhost:3000/api-docs`

## 📋 Endpoints Documentados

### 🏠 Frontend
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/` | GET | Página principal da aplicação |

### 🔌 API
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/status` | GET | Status da API |
| `/api/info` | GET | Informações da aplicação |

## 🏗️ Schemas da API

### 🎵 Song (Música)
```json
{
  "id": 1234567890,
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "album": "A Night at the Opera",
  "year": "1975",
  "isFavorite": false,
  "quantity": 1,
  "dateAdded": "22/08/2025"
}
```

**Campos obrigatórios:**
- `title` (string): Título da música
- `artist` (string): Nome do artista

### 📊 APIStatus
```json
{
  "status": "online",
  "message": "Biblioteca de Músicas API está funcionando!",
  "timestamp": "2025-08-22T14:06:51.409Z",
  "version": "1.0.0"
}
```

**Valores possíveis para status:**
- `online`: API funcionando normalmente
- `offline`: API indisponível
- `error`: Erro na API

### ℹ️ APIInfo
```json
{
  "name": "Biblioteca de Músicas",
  "description": "Aplicação web para gerenciar biblioteca pessoal de músicas",
  "features": [
    "Adicionar músicas",
    "Remover músicas",
    "Favoritar músicas",
    "Totalizador de músicas",
    "Filtros de visualização"
  ],
  "technologies": ["HTML5", "CSS3", "JavaScript ES6+", "Express.js"],
  "endpoints": [
    "GET / - Página principal",
    "GET /api/status - Status da API",
    "GET /api/info - Informações da aplicação"
  ]
}
```

### ❌ Error
```json
{
  "error": "Página não encontrada",
  "message": "A rota solicitada não existe"
}
```

## 🧪 Testando a API

### Usando o Swagger UI
1. Acesse `http://localhost:3000/api-docs`
2. Clique em qualquer endpoint
3. Clique em "Try it out"
4. Execute a requisição
5. Veja a resposta em tempo real

### Usando cURL
```bash
# Status da API
curl http://localhost:3000/api/status

# Informações da aplicação
curl http://localhost:3000/api/info

# Página principal
curl http://localhost:3000/
```

### Usando Postman
1. Importe a coleção do Swagger
2. Configure o ambiente com base URL: `http://localhost:3000`
3. Execute as requisições

## 🔧 Configuração

### Arquivos de configuração
- `swagger.config.js`: Configuração principal do Swagger
- `server.js`: Implementação dos endpoints e documentação

### Personalização
Para personalizar a documentação, edite o arquivo `swagger.config.js`:

```javascript
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Seu Título',
      version: '1.0.0',
      description: 'Sua descrição'
    }
    // ... outras configurações
  }
};
```

## 🌟 Recursos do Swagger

### ✅ Funcionalidades disponíveis
- **Documentação interativa**: Teste endpoints diretamente no navegador
- **Schemas validados**: Modelos de dados com validação
- **Exemplos de resposta**: Casos de uso reais
- **Interface responsiva**: Funciona em desktop e mobile
- **Exportação**: Gere coleções para Postman/Insomnia

### 🎨 Personalização da UI
```javascript
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Biblioteca de Músicas - API Documentation'
}));
```

## 🚨 Troubleshooting

### Problemas comuns

1. **Swagger não carrega**
   - Verifique se o servidor está rodando
   - Confirme se as dependências foram instaladas
   - Verifique o console do navegador

2. **Endpoints não aparecem**
   - Verifique se os comentários JSDoc estão corretos
   - Confirme se o arquivo `server.js` está sendo lido
   - Reinicie o servidor

3. **Erro de dependências**
   ```bash
   npm install swagger-jsdoc swagger-ui-express
   ```

## 📚 Recursos adicionais

- **OpenAPI 3.0**: Especificação mais recente
- **JSDoc**: Documentação inline no código
- **Swagger UI**: Interface interativa
- **Express.js**: Framework web para Node.js

## 🔗 Links úteis

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger JSDoc](https://github.com/Surnet/swagger-jsdoc)
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)
- [Express.js](https://expressjs.com/)

---

**🎵 Sua API está documentada e pronta para testes!** 