import { Factory } from 'rosie'; // eslint-disable-line import/no-extraneous-dependencies

export default function buildEmailTaskHistoryData(numTasks) {
  const taskList = [];
  for (let i = 0; i < numTasks; i++) {
    taskList.push(Factory.build('task'));
  }

  return {
    tasks: taskList,
  };
}

Factory.define('task')
  .attrs({
    created: () => new Date().toString(),
    duration_sec: 0,
    requester: 'edx',
    status: 'Complete',
    task_message: 'Message successfully emailed for X recipients',
    task_state: 'SUCCESS',
    task_type: 'bulk_course_email',
  })
  .sequence('task_id')
  .sequence('task_input', (i) => `{"email_id": ${i}, "to_option": ["myself"]}`);
