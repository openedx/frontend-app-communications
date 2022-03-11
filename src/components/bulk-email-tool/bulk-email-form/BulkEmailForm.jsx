import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Icon, StatefulButton, useCheckboxSetValues, useToggle,
} from '@edx/paragon';
import { SpinnerSimple, CheckCircle, Cancel } from '@edx/paragon/icons';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import TextEditor from '../text-editor/TextEditor';
import { postBulkEmail } from './api';
import BulkEmailRecipient from './bulk-email-recipient';
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
  const { courseId, cohorts, editorRef } = props;
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
            <ul className="list-unstyled">
              {selectedRecipients.map((group) => (
                <li key={group}>{group}</li>
              ))}
            </ul>
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
        <p className="h2">
          <FormattedMessage
            id="bulk.email.tool.label"
            defaultMessage="Email"
            description="Tool label. Describes the function of the tool (to send email)."
          />
        </p>
        <BulkEmailRecipient
          selectedGroups={selectedRecipients}
          handleCheckboxes={onRecipientChange}
          additionalCohorts={cohorts}
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
        <div>
          <p>
            <FormattedMessage
              id="bulk.email.instructions.proofreading"
              defaultMessage="We recommend sending learners no more than one email message per week. Before you send your email, review
              the text carefully and send it to yourself first, so that you can preview the formatting and make sure
              embedded images and links work correctly."
              description="A set of instructions to give users a heads up about the formatting of the email they are about to send"
            />
          </p>
          <p>
            <strong>
              <FormattedMessage id="bulk.email.instructions.caution" defaultMessage="Caution!" />
            </strong>
            <FormattedMessage
              id="bulk.email.instructions.caution.message"
              defaultMessage=" When you select Send Email, your email message is added to the queue for sending,
              and cannot be cancelled."
              description="A warning about how emails are sent out to users"
            />
          </p>
        </div>
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

BulkEmailForm.defaultProps = {
  cohorts: [],
};

BulkEmailForm.propTypes = {
  courseId: PropTypes.string.isRequired,
  cohorts: PropTypes.arrayOf(PropTypes.string),
  editorRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })])
    .isRequired,
};
