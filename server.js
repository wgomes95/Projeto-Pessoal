const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Swagger
const swaggerOptions = require('./swagger.config');
const specs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Biblioteca de Músicas - API Documentation'
}));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Página principal da aplicação
 *     description: Retorna a página HTML da biblioteca de músicas
 *     tags: [Frontend]
 *     responses:
 *       200:
 *         description: Página HTML carregada com sucesso
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Status da API
 *     description: Verifica se a API está funcionando
 *     tags: [API]
 *     responses:
 *       200:
 *         description: API funcionando normalmente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIStatus'
 *         examples:
 *           success:
 *             value:
 *               status: 'online'
 *               message: 'Biblioteca de Músicas API está funcionando!'
 *               timestamp: '2025-08-22T14:06:51.409Z'
 *               version: '1.0.0'
 */
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        message: 'Biblioteca de Músicas API está funcionando!',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

/**
 * @swagger
 * /api/info:
 *   get:
 *     summary: Informações da aplicação
 *     description: Retorna informações detalhadas sobre a aplicação
 *     tags: [API]
 *     responses:
 *       200:
 *         description: Informações retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIInfo'
 *         examples:
 *           success:
 *             value:
 *               name: 'Biblioteca de Músicas'
 *               description: 'Aplicação web para gerenciar biblioteca pessoal de músicas'
 *               features: [
 *                 'Adicionar músicas',
 *                 'Remover músicas',
 *                 'Favoritar músicas',
 *                 'Totalizador de músicas',
 *                 'Filtros de visualização'
 *               ]
 *               technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Express.js']
 *               endpoints: [
 *                 'GET / - Página principal',
 *                 'GET /api/status - Status da API',
 *                 'GET /api/info - Informações da aplicação',
 *                 'GET /api/songs - Listar todas as músicas',
 *                 'POST /api/songs - Adicionar nova música',
 *                 'GET /api/songs/:id - Obter música específica',
 *                 'PUT /api/songs/:id - Atualizar música',
 *                 'DELETE /api/songs/:id - Remover música',
 *                 'PATCH /api/songs/:id/favorite - Favoritar/desfavoritar música'
 *               ]
 */
app.get('/api/info', (req, res) => {
    res.json({
        name: 'Biblioteca de Músicas',
        description: 'Aplicação web para gerenciar biblioteca pessoal de músicas',
        features: [
            'Adicionar músicas',
            'Remover músicas',
            'Favoritar músicas',
            'Totalizador de músicas',
            'Filtros de visualização'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Express.js'],
        endpoints: [
            'GET / - Página principal',
            'GET /api/status - Status da API',
            'GET /api/info - Informações da aplicação',
            'GET /api/songs - Listar todas as músicas',
            'POST /api/songs - Adicionar nova música',
            'GET /api/songs/:id - Obter música específica',
            'PUT /api/songs/:id - Atualizar música',
            'DELETE /api/songs/:id - Remover música',
            'PATCH /api/songs/:id/favorite - Favoritar/desfavoritar música'
        ]
    });
});

// ========================================
// ENDPOINTS DA API PARA MÚSICAS
// ========================================

// Armazenamento em memória para as músicas
let songs = [];

/**
 * @swagger
 * /api/songs:
 *   get:
 *     summary: Listar todas as músicas
 *     description: Retorna a lista completa de músicas da biblioteca
 *     tags: [Músicas]
 *     responses:
 *       200:
 *         description: Lista de músicas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *         examples:
 *           success:
 *             value: [
 *               {
 *                 "id": 1234567890,
 *                 "title": "Bohemian Rhapsody",
 *                 "artist": "Queen",
 *                 "album": "A Night at the Opera",
 *                 "year": "1975",
 *                 "isFavorite": false,
 *                 "quantity": 1,
 *                 "dateAdded": "22/08/2025"
 *               }
 *             ]
 */
app.get('/api/songs', (req, res) => {
    res.json({
        success: true,
        count: songs.length,
        data: songs
    });
});

/**
 * @swagger
 * /api/songs:
 *   post:
 *     summary: Adicionar nova música
 *     description: Adiciona uma nova música à biblioteca
 *     tags: [Músicas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - artist
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da música
 *                 example: "Bohemian Rhapsody"
 *               artist:
 *                 type: string
 *                 description: Nome do artista
 *                 example: "Queen"
 *               album:
 *                 type: string
 *                 description: Nome do álbum
 *                 example: "A Night at the Opera"
 *               year:
 *                 type: string
 *                 description: Ano de lançamento
 *                 example: "1975"
 *     responses:
 *       201:
 *         description: Música adicionada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/songs', (req, res) => {
    const { title, artist, album, year } = req.body;

    // Validação dos campos obrigatórios
    if (!title || !artist) {
        return res.status(400).json({
            success: false,
            error: 'Campos obrigatórios',
            message: 'Título e artista são obrigatórios'
        });
    }

    // Criar nova música
    const newSong = {
        id: Date.now(),
        title: title.trim(),
        artist: artist.trim(),
        album: album ? album.trim() : 'Sem álbum',
        year: year || 'Ano desconhecido',
        isFavorite: false,
        quantity: 1,
        dateAdded: new Date().toLocaleDateString('pt-BR')
    };

    songs.push(newSong);

    res.status(201).json({
        success: true,
        message: 'Música adicionada com sucesso',
        data: newSong
    });
});

/**
 * @swagger
 * /api/songs/{id}:
 *   get:
 *     summary: Obter música específica
 *     description: Retorna uma música específica pelo ID
 *     tags: [Músicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da música
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Música encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       404:
 *         description: Música não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/songs/:id', (req, res) => {
    const songId = parseInt(req.params.id);
    const song = songs.find(s => s.id === songId);

    if (!song) {
        return res.status(404).json({
            success: false,
            error: 'Música não encontrada',
            message: `Música com ID ${songId} não foi encontrada`
        });
    }

    res.json({
        success: true,
        data: song
    });
});

/**
 * @swagger
 * /api/songs/{id}:
 *   put:
 *     summary: Atualizar música
 *     description: Atualiza uma música existente
 *     tags: [Músicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da música
 *         example: 1234567890
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da música
 *               artist:
 *                 type: string
 *                 description: Nome do artista
 *               album:
 *                 type: string
 *                 description: Nome do álbum
 *               year:
 *                 type: string
 *                 description: Ano de lançamento
 *     responses:
 *       200:
 *         description: Música atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       404:
 *         description: Música não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.put('/api/songs/:id', (req, res) => {
    const songId = parseInt(req.params.id);
    const songIndex = songs.findIndex(s => s.id === songId);

    if (songIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Música não encontrada',
            message: `Música com ID ${songId} não foi encontrada`
        });
    }

    const { title, artist, album, year } = req.body;
    const updatedSong = { ...songs[songIndex] };

    if (title) updatedSong.title = title.trim();
    if (artist) updatedSong.artist = artist.trim();
    if (album !== undefined) updatedSong.album = album ? album.trim() : 'Sem álbum';
    if (year !== undefined) updatedSong.year = year || 'Ano desconhecido';

    songs[songIndex] = updatedSong;

    res.json({
        success: true,
        message: 'Música atualizada com sucesso',
        data: updatedSong
    });
});

/**
 * @swagger
 * /api/songs/{id}:
 *   delete:
 *     summary: Remover música
 *     description: Remove uma música da biblioteca
 *     tags: [Músicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da música
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Música removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Música removida com sucesso"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1234567890
 *       404:
 *         description: Música não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete('/api/songs/:id', (req, res) => {
    const songId = parseInt(req.params.id);
    const songIndex = songs.findIndex(s => s.id === songId);

    if (songIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Música não encontrada',
            message: `Música com ID ${songId} não foi encontrada`
        });
    }

    const removedSong = songs.splice(songIndex, 1)[0];

    res.json({
        success: true,
        message: 'Música removida com sucesso',
        data: removedSong
    });
});

/**
 * @swagger
 * /api/songs/{id}/favorite:
 *   patch:
 *     summary: Favoritar/desfavoritar música
 *     description: Alterna o status de favorita de uma música
 *     tags: [Músicas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da música
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Status de favorita alterado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       404:
 *         description: Música não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.patch('/api/songs/:id/favorite', (req, res) => {
    const songId = parseInt(req.params.id);
    const songIndex = songs.findIndex(s => s.id === songId);

    if (songIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Música não encontrada',
            message: `Música com ID ${songId} não foi encontrada`
        });
    }

    songs[songIndex].isFavorite = !songs[songIndex].isFavorite;
    const updatedSong = songs[songIndex];

    res.json({
        success: true,
        message: `Música ${updatedSong.isFavorite ? 'adicionada aos' : 'removida dos'} favoritos`,
        data: updatedSong
    });
});

/**
 * @swagger
 * /api/songs/stats/summary:
 *   get:
 *     summary: Estatísticas da biblioteca
 *     description: Retorna estatísticas gerais da biblioteca de músicas
 *     tags: [Estatísticas]
 *     responses:
 *       200:
 *         description: Estatísticas retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalSongs:
 *                       type: integer
 *                       description: Total de músicas
 *                       example: 15
 *                     totalFavorites:
 *                       type: integer
 *                       description: Total de favoritas
 *                       example: 5
 *                     totalArtists:
 *                       type: integer
 *                       description: Total de artistas únicos
 *                       example: 12
 *                     totalAlbums:
 *                       type: integer
 *                       description: Total de álbuns únicos
 *                       example: 18
 */
app.get('/api/songs/stats/summary', (req, res) => {
    const totalSongs = songs.length;
    const totalFavorites = songs.filter(s => s.isFavorite).length;
    const totalArtists = new Set(songs.map(s => s.artist)).size;
    const totalAlbums = new Set(songs.map(s => s.album)).size;

    res.json({
        success: true,
        data: {
            totalSongs,
            totalFavorites,
            totalArtists,
            totalAlbums
        }
    });
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Algo deu errado!',
        message: err.message
    });
});

// Rota 404 para páginas não encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Página não encontrada',
        message: 'A rota solicitada não existe'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📱 Aplicação disponível em http://localhost:${PORT}`);
    console.log(`🔍 Status da API: http://localhost:${PORT}/api/status`);
    console.log(`ℹ️  Informações: http://localhost:${PORT}/api/info`);
    console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs`);
    console.log(`\n💡 Para parar o servidor, pressione Ctrl+C`);
});

module.exports = app; 