import { Factory } from 'rosie'; // eslint-disable-line import/no-extraneous-dependencies
import './courseEmail.factory';

export default Factory.define('scheduledEmailFactory')
  .attr(
    'next',
    'http://localhost:18000/api/instructor_task/v1/schedules/course-v1:edX+DemoX+Demo_Course/bulk_email/?page=$2',
  )
  .attr('previous', 'null')
  .option('count', '1')
  .attr('current_page', 1)
  .attr('start', 0)
  .attr('results', ['count'], (count) => {
    const emails = [];
    for (let i = 1; i <= count; i++) {
      emails.push(Factory.build('courseEmailFactory'));
    }
    return emails;
  });
