import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Icon, StatefulButton, useCheckboxSetValues, useToggle,
} from '@edx/paragon';
import { SpinnerSimple, CheckCircle, Cancel } from '@edx/paragon/icons';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import TextEditor from '../text-editor/TextEditor';
import { postBulkEmail } from './api';
import BulkEmailRecipient from './BulkEmailRecipient';
import TaskAlertModal from './TaskAlertModal';
import useTimeout from '../../../utils/useTimeout';

export const FORM_SUBMIT_STATES = {
  DEFAULT: 'default',
  PENDING: 'pending',
  COMPLETE: 'complete',
  COMPLETED_DEFAULT: 'completed_default',
  ERROR: 'error',
};

export default function BulkEmailForm(props) {
  const { courseId } = props;
  const [subject, setSubject] = useState('');
  const [emailFormStatus, setEmailFormStatus] = useState(FORM_SUBMIT_STATES.DEFAULT);
  const [emailFormValidation, setEmailFormValidation] = useState({
    // set these as true on initialization, to prevent invalid messages from prematurely showing
    subject: true,
    body: true,
    recipients: true,
  });
  const [selectedRecipients, { add, remove }] = useCheckboxSetValues([]);
  const [isTaskAlertOpen, openTaskAlert, closeTaskAlert] = useToggle(false);
  const editorRef = useRef(null);
  const resetEmailForm = useTimeout(() => {
    setEmailFormStatus(FORM_SUBMIT_STATES.COMPLETED_DEFAULT);
  }, 3000);

  const onRecipientChange = (event) => {
    if (event.target.checked) {
      add(event.target.value);
    } else {
      remove(event.target.value);
    }
  };
  const onInit = (event, editor) => {
    editorRef.current = editor;
  };

  const onSubjectChange = (event) => setSubject(event.target.value);

  const validateEmailForm = () => {
    const subjectValid = subject.length !== 0;
    const bodyValid = editorRef.current.getContent().length !== 0;
    const recipientsValid = selectedRecipients.length !== 0;

    setEmailFormValidation({
      subject: subjectValid,
      recipients: recipientsValid,
      body: bodyValid,
    });

    return subjectValid && bodyValid && recipientsValid;
  };

  const createEmailTask = async () => {
    const emailData = new FormData();
    if (validateEmailForm()) {
      setEmailFormStatus(() => FORM_SUBMIT_STATES.PENDING);
      emailData.append('action', 'send');
      emailData.append('send_to', JSON.stringify(selectedRecipients));
      emailData.append('subject', subject);
      emailData.append('message', editorRef.current.getContent());
      let data;
      try {
        data = await postBulkEmail(emailData, courseId);
      } catch (e) {
        setEmailFormStatus(FORM_SUBMIT_STATES.ERROR);
        return;
      }
      if (data.status === 200) {
        setEmailFormStatus(FORM_SUBMIT_STATES.COMPLETE);
        resetEmailForm();
      }
    }
  };

  return (
    <div className="w-100 m-auto p-lg-4 py-2.5 px-5">
      <TaskAlertModal
        isOpen={isTaskAlertOpen}
        alertMessage={(
          <>
            <p>
              <FormattedMessage
                id="bulk.email.task.alert.recipients"
                defaultMessage="You are sending an email message with the subject {subject} to the following recipients:"
                description="A warning shown to the user after submitting the email, to confirm the email recipients."
                values={{
                  subject,
                }}
              />
            </p>
            <ul>
              {selectedRecipients.map((group) => (
                <li key={group}>{group}</li>
              ))}
            </ul>
            <p>
              <FormattedMessage
                id="bulk.email.task.alert.warning"
                defaultMessage="CAUTION! When you select Send Email, your email message is added to the queue for sending, and cannot be cancelled."
                description="Warns the user in an alert that the email may not be immediately sent out to users."
              />
            </p>
          </>
        )}
        close={(event) => {
          closeTaskAlert();
          if (event.target.name === 'continue') {
            createEmailTask();
          }
        }}
      />
      <Form>
        <BulkEmailRecipient
          selectedGroups={selectedRecipients}
          handleCheckboxes={onRecipientChange}
          isValid={emailFormValidation.recipients}
        />
        <Form.Group controlId="emailSubject">
          <Form.Label>
            <FormattedMessage
              id="bulk.email.subject.label"
              defaultMessage="Subject:"
              description="Email subject line input label. Meant to have colon or equivilant punctuation."
            />
          </Form.Label>
          <Form.Control name="subject" className="w-lg-50" onChange={onSubjectChange} />
          {!emailFormValidation.subject && (
            <Form.Control.Feedback className="px-3" hasIcon type="invalid">
              <FormattedMessage
                id="bulk.email.form.subject.error"
                defaultMessage="A subject is required"
                description="An Error message located under the subject line. Visible only on failure."
              />
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="emailBody">
          <Form.Label>
            <FormattedMessage
              id="bulk.email.body.label"
              defaultMessage="Body:"
              description="Email Body label. Meant to have colon or equivilant punctuation."
            />
          </Form.Label>
          <TextEditor onInit={onInit} />
          {!emailFormValidation.body && (
            <Form.Control.Feedback className="px-3" hasIcon type="invalid">
              <FormattedMessage
                id="bulk.email.form.body.error"
                defaultMessage="The message cannot be blank"
                description="An error message located under the body editor. Visible only on failure."
              />
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="d-flex flex-row">
          <StatefulButton
            variant="primary"
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              openTaskAlert();
            }}
            state={emailFormStatus}
            icons={{
              default: <Icon className="icon-download" />,
              pending: <Icon src={SpinnerSimple} className="icon-spin" />,
              complete: <Icon src={CheckCircle} />,
              error: <Icon src={Cancel} />,
            }}
            labels={{
              default: 'Submit',
              pending: 'Submitting',
              complete: 'Task Created',
              error: 'Error',
            }}
            disabledStates={['pending', 'complete']}
          >
            <FormattedMessage
              id="bulk.email.submit.button"
              defaultMessage="Submit"
              description="Submit/Send email button"
            />
          </StatefulButton>
          {emailFormStatus === FORM_SUBMIT_STATES.ERROR && (
            <Form.Control.Feedback className="px-3" hasIcon={false} type="invalid">
              <FormattedMessage
                id="bulk.email.form.error"
                defaultMessage="An error occured while attempting to send the email."
                description="An Error message located under the submit button for the email form. Visible only on a failure."
              />
            </Form.Control.Feedback>
          )}
          {(emailFormStatus === FORM_SUBMIT_STATES.COMPLETED_DEFAULT
            || emailFormStatus === FORM_SUBMIT_STATES.COMPLETE) && (
            <Form.Control.Feedback className="px-3" hasIcon={false} type="valid">
              <FormattedMessage
                id="bulk.email.form.complete"
                defaultMessage="A task to send the emails has been successfully created!"
                description="A success message displays under the submit button when successfully completing the form."
              />
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Form>
    </div>
  );
}

BulkEmailForm.propTypes = {
  courseId: PropTypes.string.isRequired,
};
