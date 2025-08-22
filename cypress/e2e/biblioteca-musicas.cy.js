describe('Biblioteca de Músicas - Testes E2E', () => {
  beforeEach(() => {
    // Visitar a página antes de cada teste
    cy.visit('/');
    
    // Limpar localStorage antes de cada teste
    cy.clearLocalStorage();
    
    // Recarregar a página para aplicar limpeza
    cy.reload();
  });

  describe('Página inicial', () => {
    it('deve carregar a página principal corretamente', () => {
      cy.get('h1').should('contain', 'Biblioteca de Músicas');
      cy.get('#totalSongs').should('contain', '0');
      cy.get('#totalFavorites').should('contain', '0');
    });

    it('deve exibir formulário de adição de música', () => {
      cy.get('#addSongForm').should('be.visible');
      cy.get('#songTitle').should('be.visible');
      cy.get('#songArtist').should('be.visible');
      cy.get('#songAlbum').should('be.visible');
      cy.get('#songYear').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Adicionar Música');
    });

    it('deve exibir filtros de visualização', () => {
      cy.get('#showAll').should('be.visible').and('contain', 'Todas');
      cy.get('#showFavorites').should('be.visible').and('contain', 'Favoritas');
      cy.get('#showAll').should('have.class', 'active');
    });
  });

  describe('Funcionalidade de adicionar música', () => {
    it('deve adicionar uma nova música com sucesso', () => {
      const songTitle = 'Teste de Música';
      const songArtist = 'Artista Teste';
      const songAlbum = 'Álbum Teste';
      const songYear = '2024';

      cy.get('#songTitle').type(songTitle);
      cy.get('#songArtist').type(songArtist);
      cy.get('#songAlbum').type(songAlbum);
      cy.get('#songYear').type(songYear);
      
      cy.get('#addSongForm').submit();

      // Verificar se a música foi adicionada
      cy.get('.song-card').should('have.length', 1);
      cy.get('.song-card h3').should('contain', songTitle);
      cy.get('.song-card p').should('contain', songArtist);
      cy.get('.song-card p').should('contain', songAlbum);
      cy.get('.song-card p').should('contain', songYear);
      cy.get('.song-card p').should('contain', 'Quantidade: 1');
      
      // Verificar se o total foi atualizado
      cy.get('#totalSongs').should('contain', '1');
    });

    it('deve validar campos obrigatórios', () => {
      // Tentar submeter sem preencher campos obrigatórios
      cy.get('#addSongForm').submit();
      
      // Deve mostrar alerta (não é ideal, mas é o que temos atualmente)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Título e artista são obrigatórios!');
      });
    });

    it('deve limpar o formulário após adicionar música', () => {
      cy.get('#songTitle').type('Música Teste');
      cy.get('#songArtist').type('Artista Teste');
      cy.get('#addSongForm').submit();

      // Verificar se os campos foram limpos
      cy.get('#songTitle').should('have.value', '');
      cy.get('#songArtist').should('have.value', '');
      cy.get('#songAlbum').should('have.value', '');
      cy.get('#songYear').should('have.value', '');
    });
  });

  describe('Funcionalidade de favoritar música', () => {
    beforeEach(() => {
      // Adicionar uma música para testar
      cy.get('#songTitle').type('Música para Favoritar');
      cy.get('#songArtist').type('Artista Favorito');
      cy.get('#addSongForm').submit();
    });

    it('deve marcar música como favorita', () => {
      cy.get('.song-card').first().within(() => {
        cy.get('.favorite-btn').click();
        cy.get('.favorite-btn').should('have.class', 'favorited');
        cy.get('.song-card').should('have.class', 'favorite');
      });

      // Verificar se o total de favoritas foi atualizado
      cy.get('#totalFavorites').should('contain', '1');
    });

    it('deve desmarcar música como favorita', () => {
      // Primeiro marcar como favorita
      cy.get('.song-card').first().within(() => {
        cy.get('.favorite-btn').click();
        cy.get('.favorite-btn').should('have.class', 'favorited');
      });

      // Depois desmarcar
      cy.get('.song-card').first().within(() => {
        cy.get('.favorite-btn').click();
        cy.get('.favorite-btn').should('not.have.class', 'favorited');
        cy.get('.song-card').should('not.have.class', 'favorite');
      });

      // Verificar se o total de favoritas foi atualizado
      cy.get('#totalFavorites').should('contain', '0');
    });
  });

  describe('Funcionalidade de remover música', () => {
    beforeEach(() => {
      // Adicionar uma música para testar
      cy.get('#songTitle').type('Música para Remover');
      cy.get('#songArtist').type('Artista Remover');
      cy.get('#addSongForm').submit();
    });

    it('deve remover música da biblioteca', () => {
      cy.get('.song-card').should('have.length', 1);
      
      cy.get('.song-card').first().within(() => {
        cy.get('.delete-btn').click();
      });

      // Confirmar remoção
      cy.on('window:confirm', () => true);

      // Verificar se a música foi removida
      cy.get('.song-card').should('have.length', 0);
      cy.get('#totalSongs').should('contain', '0');
    });

    it('deve cancelar remoção quando usuário cancela confirmação', () => {
      cy.get('.song-card').should('have.length', 1);
      
      cy.get('.song-card').first().within(() => {
        cy.get('.delete-btn').click();
      });

      // Cancelar remoção
      cy.on('window:confirm', () => false);

      // Verificar se a música não foi removida
      cy.get('.song-card').should('have.length', 1);
      cy.get('#totalSongs').should('contain', '1');
    });
  });

  describe('Filtros de visualização', () => {
    beforeEach(() => {
      // Adicionar algumas músicas para testar filtros
      const songs = [
        { title: 'Música 1', artist: 'Artista 1' },
        { title: 'Música 2', artist: 'Artista 2' },
        { title: 'Música 3', artist: 'Artista 3' }
      ];

      songs.forEach(song => {
        cy.get('#songTitle').type(song.title);
        cy.get('#songArtist').type(song.artist);
        cy.get('#addSongForm').submit();
        cy.wait(100); // Pequena pausa para evitar conflitos
      });

      // Marcar algumas como favoritas
      cy.get('.song-card').eq(0).within(() => {
        cy.get('.favorite-btn').click();
      });
      cy.get('.song-card').eq(2).within(() => {
        cy.get('.favorite-btn').click();
      });
    });

    it('deve mostrar todas as músicas por padrão', () => {
      cy.get('#showAll').should('have.class', 'active');
      cy.get('.song-card').should('have.length', 3);
    });

    it('deve filtrar apenas músicas favoritas', () => {
      cy.get('#showFavorites').click();
      cy.get('#showFavorites').should('have.class', 'active');
      cy.get('#showAll').should('not.have.class', 'active');
      cy.get('.song-card').should('have.length', 2);
    });

    it('deve voltar para mostrar todas as músicas', () => {
      // Primeiro filtrar favoritas
      cy.get('#showFavorites').click();
      cy.get('.song-card').should('have.length', 2);

      // Depois voltar para todas
      cy.get('#showAll').click();
      cy.get('#showAll').should('have.class', 'active');
      cy.get('.song-card').should('have.length', 3);
    });
  });

  describe('Estado vazio da biblioteca', () => {
    it('deve mostrar mensagem quando não há músicas', () => {
      cy.get('.empty-state').should('be.visible');
      cy.get('.empty-state h3').should('contain', 'Sua biblioteca está vazia');
      cy.get('.empty-state p').should('contain', 'Adicione sua primeira música');
    });

    it('deve mostrar mensagem quando não há favoritas', () => {
      // Adicionar uma música sem marcar como favorita
      cy.get('#songTitle').type('Música Sem Favorita');
      cy.get('#songArtist').type('Artista Sem Favorita');
      cy.get('#addSongForm').submit();

      // Filtrar favoritas
      cy.get('#showFavorites').click();
      
      // Deve mostrar mensagem de favoritas vazias
      cy.get('.empty-state h3').should('contain', 'Nenhuma música favorita');
    });
  });

  describe('Persistência de dados', () => {
    it('deve persistir músicas após recarregar a página', () => {
      // Adicionar uma música
      cy.get('#songTitle').type('Música Persistente');
      cy.get('#songArtist').type('Artista Persistente');
      cy.get('#addSongForm').submit();

      // Verificar se foi adicionada
      cy.get('.song-card').should('have.length', 1);
      cy.get('#totalSongs').should('contain', '1');

      // Recarregar a página
      cy.reload();

      // Verificar se a música ainda está lá
      cy.get('.song-card').should('have.length', 1);
      cy.get('#totalSongs').should('contain', '1');
    });

    it('deve persistir estado de favoritos após recarregar', () => {
      // Adicionar e marcar como favorita
      cy.get('#songTitle').type('Música Favorita Persistente');
      cy.get('#songArtist').type('Artista Favorito Persistente');
      cy.get('#addSongForm').submit();

      cy.get('.song-card').first().within(() => {
        cy.get('.favorite-btn').click();
      });

      // Verificar se foi marcada como favorita
      cy.get('#totalFavorites').should('contain', '1');

      // Recarregar a página
      cy.reload();

      // Verificar se ainda está marcada como favorita
      cy.get('#totalFavorites').should('contain', '1');
      cy.get('.song-card').first().within(() => {
        cy.get('.favorite-btn').should('have.class', 'favorited');
      });
    });
  });

  describe('Responsividade', () => {
    it('deve funcionar em viewport mobile', () => {
      cy.viewport(375, 667); // iPhone SE
      
      cy.get('h1').should('be.visible');
      cy.get('#addSongForm').should('be.visible');
      cy.get('.stats').should('be.visible');
    });

    it('deve funcionar em viewport tablet', () => {
      cy.viewport(768, 1024); // iPad
      
      cy.get('h1').should('be.visible');
      cy.get('#addSongForm').should('be.visible');
      cy.get('.stats').should('be.visible');
    });
  });
}); 