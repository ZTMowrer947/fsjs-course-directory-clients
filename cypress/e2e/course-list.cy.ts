import { faker } from '@faker-js/faker';

import type { CoursePreview } from '~/entities/course.ts';

describe('Course list page', () => {
  it('renders a list of course links and a link to create more', () => {
    // Generate fake course list
    const courses = Array.from({ length: 5 }, (_, index) => {
      const min = index * 10 + 1;
      const max = (index + 1) * 10;

      return {
        id: faker.number.int({ min, max }),
        title: faker.lorem.words(4),
      } satisfies CoursePreview;
    });

    // Intercept API request to return fake data
    cy.intercept('http://localhost:5000/api/courses', courses).as('fetchCourses');

    // Visit page and wait for intercepted API request
    cy.visit('/');
    cy.wait('@fetchCourses');

    // Query for course links
    cy.findByTestId('main-content').within(() => {
      cy.findAllByRole('link').should(($courseLinks) => {
        // Expect links for all courses, plus a link to create more, verify text for all of them
        expect($courseLinks, '5 course links and add course link').to.have.length(6);
        courses.forEach((course, index) => {
          expect($courseLinks.get(index), `Course #${index + 1} link`).to.contain.text(course.title);
        });
        expect($courseLinks.last(), 'Create course link').to.contain.text('Create Course');
      });
    });
  });
});
