import { faker } from '@faker-js/faker';
import { defineComponent } from 'vue';

import type { CoursePreview } from '~/entities/course.ts';
import ListItem from '~/routes/courses/ListItem.vue';

// Wrapper component for styling
const TestLayout = defineComponent({
  setup(_props, { slots }) {
    return () => <div class="grid">{slots.default()}</div>;
  },
});

// Test Suite
describe('ListItem component', () => {
  it('renders a link and details for the provided course', () => {
    // Generate fake course
    const course = {
      id: faker.number.int({ min: 1, max: 70 }),
      title: faker.lorem.words(4),
    } satisfies CoursePreview;

    // Mount component
    cy.mount(
      <TestLayout>
        <ListItem course={course} />
      </TestLayout>,
    );

    // Find title in component
    cy.findByText(course.title);

    // Ensure item links to correct place based on ID
    const expectedHref = `/courses/${encodeURIComponent(course.id)}`;
    cy.findByRole('link').should('have.attr', 'href', expectedHref);
  });
});
