import { faker } from '@faker-js/faker';

import type { CoursePreview } from '~/entities/course.ts';
import ListItem from '~/routes/courses/ListItem.vue';

describe('ListItem component', () => {
  it('renders a link and details for the provided course', () => {
    // Generate fake course
    const course = {
      id: faker.number.int({ min: 1, max: 70 }),
      title: faker.lorem.words(4),
    } satisfies CoursePreview;

    // Mount component
    cy.mount(ListItem, {
      props: {
        course,
      },
    });

    // Find title in component
    cy.findByText(course.title);

    // TODO: Ensure item links to correct place based on ID
  });
});
