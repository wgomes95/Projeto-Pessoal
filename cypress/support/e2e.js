// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Configurações globais do Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna false para evitar que o Cypress falhe em erros não capturados
  // Útil para aplicações que podem ter erros esperados
  return false
})

// Configuração para capturar screenshots em caso de falha
Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
  screenshotOnRunFailure: true,
  screenshotOnRunFailure: true
})

// Configuração para vídeos
Cypress.config('video', false) 