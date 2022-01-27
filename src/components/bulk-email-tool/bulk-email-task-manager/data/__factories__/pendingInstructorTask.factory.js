import { Factory } from 'rosie'; // eslint-disable-line import/no-extraneous-dependencies

export default function buildPendingInstructorTaskData(numTasks) {
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
    duration_sec: Math.floor(Math.random * 1000),
    requester: 'edx',
    status: 'Incomplete',
    task_message: '{"action_name": "certificates generated", "attempted": 1, "succeeded": 0, "skipped": 5, "failed": 0, "total": 6, "preassigned": 0, "duration_ms": 359, "step": "Generating Certificates"}',
    task_state: 'PROGRESS',
    task_type: 'regenerate_certificates_all_student',
    task_input: '{"statuses_to_regenerate": ["downloadable"]}',
  })
  .sequence('task_id');
