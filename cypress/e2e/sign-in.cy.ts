import { faker } from '@faker-js/faker';

import type { User } from '~/entities/user.ts';

describe('Signin page', () => {
  it('redirects to home page and hides signin/signup links after successful signin', () => {
    // Generate a fake user
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const password = faker.internet.password();
    const user = {
      id: faker.number.int({ min: 1, max: 10 }),
      firstName,
      lastName,
      emailAddress: faker.internet.email({ firstName, lastName }),
    } satisfies User;

    // Intercept GET user to return fake user, and GET courses to be empty list
    cy.intercept('GET', 'http://localhost:5000/api/users', user).as('getUser');
    cy.intercept('GET', 'http://localhost:5000/api/courses', []);

    cy.visit('/signin');

    // Fill out and submit form
    cy.findByLabelText('Email Address').type(user.emailAddress);
    cy.findByLabelText('Password').type(password);

    cy.findByRole('button', { name: /^\s*Sign In\s*$/ }).click();

    cy.wait('@getUser');

    // Expect homepage redirect and header to not show signin/signup links
    cy.url().should('match', /\/courses$/);

    cy.findByText(/^\s*Sign In\s*$/).should('not.exist');
    cy.findByText(/^\s*Sign Up\s*$/).should('not.exist');
    cy.findByText(/^\s*Sign Out\s*$/);

    // Revisit page, expect to be redirected back immediately
    cy.visit('/signin');

    cy.url().should('match', /\/courses$/);
  });

  it('displays an error after failed signin attempts and does not redirect', () => {
    // Simulated an authentication failure from API
    cy.intercept('GET', 'http://localhost:5000/api/users', (req) => {
      req.reply(401);
    }).as('getUser');

    cy.visit('/signin');

    // Fill out and submit form
    cy.findByLabelText('Email Address').type(faker.internet.email());
    cy.findByLabelText('Password').type(faker.internet.password());

    cy.findByRole('button', { name: /^\s*Sign In\s*$/ }).click();

    cy.wait('@getUser');

    // Expect error message on same page
    cy.findByText('Incorrect email/password combination.');
    cy.url().should('match', /\/signin$/);
  });
});
