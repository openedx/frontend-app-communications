import { Factory } from 'rosie'; // eslint-disable-line import/no-extraneous-dependencies

Factory.define('tab')
  .option('courseId', 'course-v1:edX+DemoX+Demo_Course')
  .option('path', 'course/')
  .option('host', 'http://localhost:18000')
  .attrs({
    title: 'Course',
    slug: 'courseware',
  })
  .attr('tab_id', ['slug'], slug => slug)
  .attr('url', ['courseId', 'path', 'host'], (courseId, path, host) => `${host}/courses/${courseId}/${path}`);
