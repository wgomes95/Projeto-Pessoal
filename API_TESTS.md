# 🧪 Testes da API - Biblioteca de Músicas

## 🌐 Base URL
```
http://localhost:3000
```

## 🚀 Como executar os testes

### 1. Iniciar o servidor
```bash
npm start
# ou
npm run dev
```

### 2. Acessar a documentação Swagger
```
http://localhost:3000/api-docs
```

### 3. Usar ferramentas de teste
- **Swagger UI**: Teste diretamente no navegador
- **Postman**: Importe a coleção
- **cURL**: Comandos de linha
- **Insomnia**: Interface amigável

## 📋 Endpoints para Testes

### 🎵 **MÚSICAS**

#### 1. Listar todas as músicas
```http
GET /api/songs
```

**Resposta esperada:**
```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

#### 2. Adicionar nova música
```http
POST /api/songs
Content-Type: application/json

{
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "album": "A Night at the Opera",
  "year": "1975"
}
```

**Resposta esperada (201):**
```json
{
  "success": true,
  "message": "Música adicionada com sucesso",
  "data": {
    "id": 1234567890,
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "album": "A Night at the Opera",
    "year": "1975",
    "isFavorite": false,
    "quantity": 1,
    "dateAdded": "22/08/2025"
  }
}
```

#### 3. Obter música específica
```http
GET /api/songs/{id}
```

**Resposta esperada (200):**
```json
{
  "success": true,
  "data": {
    "id": 1234567890,
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "album": "A Night at the Opera",
    "year": "1975",
    "isFavorite": false,
    "quantity": 1,
    "dateAdded": "22/08/2025"
  }
}
```

#### 4. Atualizar música
```http
PUT /api/songs/{id}
Content-Type: application/json

{
  "title": "Bohemian Rhapsody (Updated)",
  "album": "A Night at the Opera (Remastered)"
}
```

**Resposta esperada (200):**
```json
{
  "success": true,
  "message": "Música atualizada com sucesso",
  "data": {
    "id": 1234567890,
    "title": "Bohemian Rhapsody (Updated)",
    "artist": "Queen",
    "album": "A Night at the Opera (Remastered)",
    "year": "1975",
    "isFavorite": false,
    "quantity": 1,
    "dateAdded": "22/08/2025"
  }
}
```

#### 5. Favoritar/desfavoritar música
```http
PATCH /api/songs/{id}/favorite
```

**Resposta esperada (200):**
```json
{
  "success": true,
  "message": "Música adicionada aos favoritos",
  "data": {
    "id": 1234567890,
    "title": "Bohemian Rhapsody (Updated)",
    "artist": "Queen",
    "album": "A Night at the Opera (Remastered)",
    "year": "1975",
    "isFavorite": true,
    "quantity": 1,
    "dateAdded": "22/08/2025"
  }
}
```

#### 6. Remover música
```http
DELETE /api/songs/{id}
```

**Resposta esperada (200):**
```json
{
  "success": true,
  "message": "Música removida com sucesso",
  "data": {
    "id": 1234567890,
    "title": "Bohemian Rhapsody (Updated)",
    "artist": "Queen",
    "album": "A Night at the Opera (Remastered)",
    "year": "1975",
    "isFavorite": true,
    "quantity": 1,
    "dateAdded": "22/08/2025"
  }
}
```

### 📊 **ESTATÍSTICAS**

#### 7. Estatísticas da biblioteca
```http
GET /api/songs/stats/summary
```

**Resposta esperada (200):**
```json
{
  "success": true,
  "data": {
    "totalSongs": 15,
    "totalFavorites": 5,
    "totalArtists": 12,
    "totalAlbums": 18
  }
}
```

## 🧪 Cenários de Teste

### **Cenário 1: Fluxo completo de uma música**
1. **Adicionar** música via `POST /api/songs`
2. **Verificar** se foi adicionada via `GET /api/songs`
3. **Obter** música específica via `GET /api/songs/{id}`
4. **Favoritar** música via `PATCH /api/songs/{id}/favorite`
5. **Atualizar** música via `PUT /api/songs/{id}`
6. **Verificar** estatísticas via `GET /api/songs/stats/summary`
7. **Remover** música via `DELETE /api/songs/{id}`

### **Cenário 2: Validações de erro**
1. **Tentar adicionar** música sem título (deve retornar 400)
2. **Tentar adicionar** música sem artista (deve retornar 400)
3. **Tentar obter** música inexistente (deve retornar 404)
4. **Tentar atualizar** música inexistente (deve retornar 404)
5. **Tentar remover** música inexistente (deve retornar 404)

### **Cenário 3: Múltiplas músicas**
1. **Adicionar** 3-5 músicas diferentes
2. **Verificar** contagem total
3. **Favoritar** algumas músicas
4. **Verificar** estatísticas de favoritas
5. **Verificar** contagem de artistas únicos

## 🔧 Comandos cURL para Testes

### Adicionar música
```bash
curl -X POST http://localhost:3000/api/songs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Imagine",
    "artist": "John Lennon",
    "album": "Imagine",
    "year": "1971"
  }'
```

### Listar músicas
```bash
curl http://localhost:3000/api/songs
```

### Favoritar música (substitua {id} pelo ID real)
```bash
curl -X PATCH http://localhost:3000/api/songs/{id}/favorite
```

### Remover música (substitua {id} pelo ID real)
```bash
curl -X DELETE http://localhost:3000/api/songs/{id}
```

### Estatísticas
```bash
curl http://localhost:3000/api/songs/stats/summary
```

## 📱 Testando com Postman

### 1. Importar coleção
- Abra o Postman
- Clique em "Import"
- Cole a URL do Swagger: `http://localhost:3000/api-docs`

### 2. Configurar ambiente
- Base URL: `http://localhost:3000`
- Variáveis de ambiente:
  - `songId`: ID da música para testes

### 3. Executar testes
- Execute os endpoints na ordem dos cenários
- Verifique as respostas e códigos de status
- Use as variáveis de ambiente para IDs

## 🚨 Códigos de Status HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| 200 | OK | Operação bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados inválidos |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Erro interno do servidor |

## ✅ Checklist de Testes

- [ ] Servidor rodando em localhost:3000
- [ ] Swagger UI acessível em /api-docs
- [ ] Endpoint GET /api/songs retorna lista vazia
- [ ] Endpoint POST /api/songs adiciona música
- [ ] Endpoint GET /api/songs/{id} retorna música específica
- [ ] Endpoint PUT /api/songs/{id} atualiza música
- [ ] Endpoint PATCH /api/songs/{id}/favorite alterna favorito
- [ ] Endpoint DELETE /api/songs/{id} remove música
- [ ] Endpoint GET /api/songs/stats/summary retorna estatísticas
- [ ] Validações de erro funcionando (400, 404)
- [ ] Fluxo completo de CRUD funcionando

## 🌟 Dicas para Testes

1. **Sempre verifique** os códigos de status HTTP
2. **Use IDs reais** retornados pelas operações
3. **Teste cenários de erro** para validações
4. **Verifique** a estrutura das respostas JSON
5. **Teste** o fluxo completo de operações
6. **Use o Swagger UI** para testes interativos

---

**🎵 Sua API está pronta para testes completos!** 