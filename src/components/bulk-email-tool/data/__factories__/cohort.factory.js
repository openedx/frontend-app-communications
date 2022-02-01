import { Factory } from 'rosie'; // eslint-disable-line import/no-extraneous-dependencies

export default Factory.define('cohort')
  .sequence('id', (i) => i)
  .sequence('name', i => `test cohort ${i}`)
  .attrs({
    assignment_type: 'test',
    user_count: 1,
  });
