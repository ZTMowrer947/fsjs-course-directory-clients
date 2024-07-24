import { faker } from '@faker-js/faker';

import type { User } from '~/entities/user.ts';

describe('Signup page', () => {
  it('signs in user after successful creation', () => {
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

    // Intercept POST user, GET user, GET course
    cy.intercept('POST', 'http://localhost:5000/api/users', (req) => {
      req.reply(201, user);
    }).as('createUser');
    cy.intercept('GET', 'http://localhost:5000/api/users', user);
    cy.intercept('GET', 'http://localhost:5000/api/courses', []);

    cy.visit('/signup');

    // Fill out and submit form
    cy.findByLabelText('First Name').type(firstName);
    cy.findByLabelText('Last Name').type(lastName);
    cy.findByLabelText('Email Address').type(user.emailAddress);
    cy.findByLabelText('Password').type(password);
    cy.findAllByLabelText('Confirm Password').type(password);

    cy.findByRole('button', { name: 'Sign Up' }).click();

    cy.wait('@createUser');

    // Expect redirect to home page with signout link in header
    cy.url().should('match', /\/courses$/);

    cy.findByText('Sign Out');
    cy.findByText('Sign In').should('not.exist');
    cy.findByText('Sign Up').should('not.exist');

    // Revisit page, expect to be redirected back immediately
    cy.visit('/signin');

    cy.url().should('match', /\/courses$/);
  });
});
