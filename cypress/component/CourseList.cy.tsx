import { faker } from '@faker-js/faker';

import type { CoursePreview } from '~/entities/course.ts';
import CourseList from '~/routes/courses/CourseList.vue';

describe('CourseList component', () => {
  it('renders a list of course links of equal length to provided list of courses, then a link to create another', () => {
    const courseNum = faker.number.int({ min: 5, max: 10 });
    const courses = Array.from({ length: courseNum }, (_, index) => {
      const min = index * 10 + 1;
      const max = (index + 1) * 10;

      return {
        id: faker.number.int({ min, max }),
        title: faker.lorem.words(4),
      } satisfies CoursePreview;
    });

    cy.mount(<CourseList courses={courses} />);

    cy.findAllByTestId('course-item').should('have.length', courseNum);

    cy.findByText('Create Course');
  });
});
