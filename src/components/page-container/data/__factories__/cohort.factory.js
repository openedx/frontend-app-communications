import { Factory } from 'rosie';

export default Factory.define('cohort')
  .sequence('id', (i) => i)
  .sequence('name', i => `test cohort ${i}`)
  .attrs({
    assignment_type: 'test',
    user_count: 1,
  });
