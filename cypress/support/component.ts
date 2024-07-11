// ***********************************************************
// This example support/component.ts is processed and
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
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
import { mount } from 'cypress/vue';
import { createMemoryHistory, createRouter } from 'vue-router';

import routes from '~/routes';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', (component, options) => {
  // Flesh out plugins list by ensuring it is defined
  options = options ?? {};
  options.global = options.global ?? {};
  options.global.plugins = options.global.plugins ?? [];

  // Setup router
  const router = createRouter({
    routes,
    history: createMemoryHistory(),
  });

  // Append plugin and proceed to mount component
  options.global.plugins.push({
    install(app) {
      app.use(router);
    },
  });

  return mount(component, options);
});

// Example use:
// cy.mount(MyComponent)
