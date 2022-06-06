import { Factory } from 'rosie'; // eslint-disable-line import/no-extraneous-dependencies

Factory.define('emailDataFactory')
  .sequence('id')
  .attrs({
    subject: 'subject',
    html_message: '<p>body</p>',
    text_message: 'body',
    course_id: 'course-v1:edX+DemoX+Demo_Course',
    to_option: '',
    sender: 'edx',
    targets: ['learners'],
  });

export default Factory.define('courseEmailFactory')
  .sequence('id')
  .attr('course_email', Factory.build('emailDataFactory'))
  .sequence('task')
  .attr('task_due', '2022-04-27T17:00:00Z');
