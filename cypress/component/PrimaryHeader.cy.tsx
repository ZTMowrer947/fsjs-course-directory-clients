import { faker } from '@faker-js/faker';

import PrimaryHeader from '~/components/PrimaryHeader.vue';
import { User } from '~/entities/user.ts';

import TestLayout from './TestLayout.tsx';

describe('PrimaryHeader component', () => {
  it('renders a heading regardless of user status', () => {
    cy.mount(
      <TestLayout class="w-full">
        <PrimaryHeader authPending={true} />
      </TestLayout>,
    );

    cy.findByRole('heading', { level: 1 }).should('have.text', 'Courses');
  });

  it('renders signin and signup links when no user is signed in', () => {
    cy.mount(
      <TestLayout class="w-full">
        <PrimaryHeader authPending={false} />
      </TestLayout>,
    );

    // Find the links and verify that they map to the correct paths
    cy.findAllByRole('link').should(($links) => {
      expect($links, 'List of nav links').to.have.length(2);
      expect($links.get(0), 'Signin link').to.have.attr('href', '/signin');
      expect($links.get(1), 'Signup link').to.have.attr('href', '/signup');
    });
  });

  it('renders greeting and signout button when a user is signed in', () => {
    // Generate fake user
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const user = {
      id: faker.number.int({ min: 1, max: 10 }),
      firstName,
      lastName,
      emailAddress: faker.internet.email({ firstName, lastName }),
    } satisfies User;

    // Mount component
    cy.mount(
      <TestLayout class="w-full">
        <PrimaryHeader user={user} authPending={false} />
      </TestLayout>,
    );

    // Assert on greeting and signout button
    const expectedMessage = `Welcome ${firstName} ${lastName}!`;

    cy.findByText(expectedMessage);
    cy.findByRole('button').should('have.text', 'Sign Out');
  });
});
