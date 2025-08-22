const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Biblioteca de Músicas API',
      version: '1.0.0',
      description: 'API para gerenciar biblioteca pessoal de músicas',
      contact: {
        name: 'Desenvolvedor',
        email: 'dev@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor de desenvolvimento'
        }
      ]
    },
    tags: [
      {
        name: 'Frontend',
        description: 'Endpoints relacionados à interface do usuário'
      },
      {
        name: 'API',
        description: 'Endpoints de informações e status da API'
      },
      {
        name: 'Músicas',
        description: 'Endpoints para gerenciar músicas na biblioteca'
      },
      {
        name: 'Estatísticas',
        description: 'Endpoints para estatísticas da biblioteca'
      }
    ],
    components: {
      schemas: {
        Song: {
          type: 'object',
          required: ['title', 'artist'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único da música',
              example: 1234567890
            },
            title: {
              type: 'string',
              description: 'Título da música',
              example: 'Bohemian Rhapsody'
            },
            artist: {
              type: 'string',
              description: 'Nome do artista',
              example: 'Queen'
            },
            album: {
              type: 'string',
              description: 'Nome do álbum',
              example: 'A Night at the Opera'
            },
            year: {
              type: 'string',
              description: 'Ano de lançamento',
              example: '1975'
            },
            isFavorite: {
              type: 'boolean',
              description: 'Se a música é favorita',
              example: false
            },
            quantity: {
              type: 'integer',
              description: 'Quantidade da música na biblioteca',
              example: 1
            },
            dateAdded: {
              type: 'string',
              description: 'Data de adição à biblioteca',
              example: '22/08/2025'
            }
          }
        },
        APIStatus: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              description: 'Status da API',
              enum: ['online', 'offline', 'error'],
              example: 'online'
            },
            message: {
              type: 'string',
              description: 'Mensagem de status',
              example: 'Biblioteca de Músicas API está funcionando!'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp da verificação',
              example: '2025-08-22T14:06:51.409Z'
            },
            version: {
              type: 'string',
              description: 'Versão da API',
              example: '1.0.0'
            }
          }
        },
        APIInfo: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nome da aplicação',
              example: 'Biblioteca de Músicas'
            },
            description: {
              type: 'string',
              description: 'Descrição da aplicação',
              example: 'Aplicação web para gerenciar biblioteca pessoal de músicas'
            },
            features: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Lista de funcionalidades',
              example: [
                'Adicionar músicas',
                'Remover músicas',
                'Favoritar músicas',
                'Totalizador de músicas',
                'Filtros de visualização'
              ]
            },
            technologies: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Tecnologias utilizadas',
              example: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Express.js']
            },
            endpoints: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Lista de endpoints disponíveis',
              example: [
                'GET / - Página principal',
                'GET /api/status - Status da API',
                'GET /api/info - Informações da aplicação'
              ]
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Tipo do erro',
              example: 'Página não encontrada'
            },
            message: {
              type: 'string',
              description: 'Descrição do erro',
              example: 'A rota solicitada não existe'
            }
          }
        }
      },
      responses: {
        NotFound: {
          description: 'Recurso não encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        ServerError: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./server.js']
};

module.exports = swaggerOptions; 