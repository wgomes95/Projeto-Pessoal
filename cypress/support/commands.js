// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando para adicionar uma música rapidamente
Cypress.Commands.add('addSong', (songData) => {
  const defaultSong = {
    title: 'Música Teste',
    artist: 'Artista Teste',
    album: 'Álbum Teste',
    year: '2024'
  }
  
  const song = { ...defaultSong, ...songData }
  
  cy.get('#songTitle').type(song.title)
  cy.get('#songArtist').type(song.artist)
  if (song.album) cy.get('#songAlbum').type(song.album)
  if (song.year) cy.get('#songYear').type(song.year)
  
  cy.get('#addSongForm').submit()
  
  // Aguardar a música ser adicionada
  cy.get('.song-card').should('have.length.at.least', 1)
})

// Comando para limpar a biblioteca
Cypress.Commands.add('clearLibrary', () => {
  cy.clearLocalStorage()
  cy.reload()
})

// Comando para verificar se uma música existe
Cypress.Commands.add('songShouldExist', (title, artist) => {
  cy.get('.song-card').should('contain', title)
  cy.get('.song-card').should('contain', artist)
})

// Comando para verificar se uma música não existe
Cypress.Commands.add('songShouldNotExist', (title, artist) => {
  cy.get('.song-card').should('not.contain', title)
  cy.get('.song-card').should('not.contain', artist)
})

// Comando para marcar música como favorita
Cypress.Commands.add('markAsFavorite', (index = 0) => {
  cy.get('.song-card').eq(index).within(() => {
    cy.get('.favorite-btn').click()
    cy.get('.favorite-btn').should('have.class', 'favorited')
  })
})

// Comando para desmarcar música como favorita
Cypress.Commands.add('unmarkAsFavorite', (index = 0) => {
  cy.get('.song-card').eq(index).within(() => {
    cy.get('.favorite-btn').click()
    cy.get('.favorite-btn').should('not.have.class', 'favorited')
  })
})

// Comando para remover música
Cypress.Commands.add('removeSong', (index = 0, confirm = true) => {
  cy.get('.song-card').eq(index).within(() => {
    cy.get('.delete-btn').click()
  })
  
  if (confirm) {
    cy.on('window:confirm', () => true)
  } else {
    cy.on('window:confirm', () => false)
  }
})

// Comando para filtrar por favoritas
Cypress.Commands.add('filterByFavorites', () => {
  cy.get('#showFavorites').click()
  cy.get('#showFavorites').should('have.class', 'active')
})

// Comando para mostrar todas as músicas
Cypress.Commands.add('showAllSongs', () => {
  cy.get('#showAll').click()
  cy.get('#showAll').should('have.class', 'active')
})

// Comando para verificar estatísticas
Cypress.Commands.add('checkStats', (totalSongs, totalFavorites) => {
  cy.get('#totalSongs').should('contain', totalSongs)
  cy.get('#totalFavorites').should('contain', totalFavorites)
})

// Comando para aguardar carregamento da página
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('h1').should('be.visible')
  cy.get('#addSongForm').should('be.visible')
})

// Comando para verificar estado vazio
Cypress.Commands.add('shouldShowEmptyState', (type = 'library') => {
  if (type === 'favorites') {
    cy.get('.empty-state h3').should('contain', 'Nenhuma música favorita')
  } else {
    cy.get('.empty-state h3').should('contain', 'Sua biblioteca está vazia')
  }
})

// Comando para verificar formulário limpo
Cypress.Commands.add('formShouldBeClean', () => {
  cy.get('#songTitle').should('have.value', '')
  cy.get('#songArtist').should('have.value', '')
  cy.get('#songAlbum').should('have.value', '')
  cy.get('#songYear').should('have.value', '')
})

// Comando para testar responsividade
Cypress.Commands.add('testResponsiveness', (viewport) => {
  cy.viewport(viewport.width, viewport.height)
  cy.get('h1').should('be.visible')
  cy.get('#addSongForm').should('be.visible')
  cy.get('.stats').should('be.visible')
}) 