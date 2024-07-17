import { faker } from '@faker-js/faker';

import type { CourseDetail } from '~/entities/course.ts';
import CourseDetails from '~/routes/courses/[id]/CourseDetails.vue';

describe('CourseDetails component', () => {
  it('renders course title, author, and description', () => {
    // Generate fake course data
    const desc = faker.lorem.paragraph();
    const listEntry = faker.lorem.words(4);

    const course = {
      id: faker.number.int({ min: 1, max: 10 }),
      userId: faker.number.int({ min: 1, max: 10 }),
      title: faker.lorem.words(3),
      description: `${desc}\n\n- ${listEntry}`,
      estimatedTime: null,
      materialsNeeded: null,
      user: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      },
    } satisfies CourseDetail;

    const authorText = `By ${course.user.firstName} ${course.user.lastName}`;

    // Mount component
    cy.mount(<CourseDetails course={course} />);

    // Assert for title and author attribution
    cy.findByRole('heading', { level: 1 }).should('have.text', course.title);
    cy.findByRole('heading', { level: 3 }).should('have.text', authorText);

    // Find paragraph and list item in description
    cy.findByRole('paragraph').should('have.text', desc);
    cy.findByRole('listitem').should('have.text', listEntry);

    // Expect no stats container to exist
    cy.findByTestId('stats').should('not.exist');
  });

  it('additionally renders time estimate and needed materials when provided', () => {
    // Generate fake course with time estimated and material list
    const estimatedTime = `${faker.number.int({ min: 1, max: 16 })} hours`;
    const materialsList = Array.from({ length: 5 }, () => faker.lorem.words(2));
    const materialsNeeded = materialsList.map((item) => `- ${item}`).join('\n');

    const course = {
      id: faker.number.int({ min: 1, max: 10 }),
      userId: faker.number.int({ min: 1, max: 10 }),
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      estimatedTime,
      materialsNeeded,
      user: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      },
    } satisfies CourseDetail;

    // Render component
    cy.mount(<CourseDetails course={course} />);

    // Find stats container, and query within it
    cy.findByTestId('stats').within(() => {
      // Find time estimate heading
      cy.findByRole('heading', { level: 3 }).should('have.text', course.estimatedTime);

      // Find material list items
      cy.findAllByRole('listitem').should(($matList) => {
        expect($matList, 'list of material items').to.have.length(materialsList.length);

        materialsList.forEach((item, index) => {
          expect($matList.get(index), `Material list item #${index + 1}`).to.have.text(item);
        });
      });
    });
  });
});
