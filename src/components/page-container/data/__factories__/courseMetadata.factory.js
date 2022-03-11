import { Factory } from 'rosie'; // eslint-disable-line import/no-extraneous-dependencies
import './tab.factory';

export default Factory.define('courseMetadata')
  .sequence('id', i => `course-v1:edX+DemoX+Demo_Course_${i}`)
  .option('host', 'http://localhost:18000')
  .attrs({
    is_staff: true,
    original_user_is_staff: false,
    number: 'DemoX',
    org: 'edX',
    title: 'Demonstration Course',
    verified_mode: {
      upgrade_url: 'test',
      price: 10,
      currency_symbol: '$',
    },
  })
  .attr('tabs', ['id', 'host'], (id, host) => {
    const tabs = [
      Factory.build(
        'tab',
        {
          title: 'Course',
          slug: 'courseware',
          type: 'courseware',
        },
        { courseId: id, host, path: 'course/' },
      ),
      Factory.build(
        'tab',
        {
          title: 'Discussion',
          slug: 'discussion',
          type: 'discussion',
        },
        { courseId: id, host, path: 'discussion/forum/' },
      ),
      Factory.build(
        'tab',
        {
          title: 'Wiki',
          slug: 'wiki',
          type: 'wiki',
        },
        { courseId: id, host, path: 'course_wiki' },
      ),
      Factory.build(
        'tab',
        {
          title: 'Progress',
          slug: 'progress',
          type: 'progress',
        },
        { courseId: id, host, path: 'progress' },
      ),
      Factory.build(
        'tab',
        {
          title: 'Instructor',
          slug: 'instructor',
          type: 'instructor',
        },
        { courseId: id, host, path: 'instructor' },
      ),
      Factory.build(
        'tab',
        {
          title: 'Dates',
          slug: 'dates',
          type: 'dates',
        },
        { courseId: id, host, path: 'dates' },
      ),
    ];

    return tabs;
  });
