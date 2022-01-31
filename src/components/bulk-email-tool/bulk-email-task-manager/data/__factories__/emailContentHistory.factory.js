import { Factory } from 'rosie'; // eslint-disable-line import/no-extraneous-dependencies

export default function buildEmailContentHistoryData(numMessages) {
  const emailList = [];
  for (let i = 0; i < numMessages; i++) {
    emailList.push(Factory.build('emailTaskData'));
  }

  return {
    emails: emailList,
  };
}

Factory.define('emailTaskData')
  .attrs({
    created: () => new Date().toString(),
    number_sent: '1 sent',
    requester: 'edx',
    sent_to: ['Myself'],
    email: {
      subject: 'Test Subject',
      html_message: '<p>Test Message</p>',
      id: 1,
    },
  });
