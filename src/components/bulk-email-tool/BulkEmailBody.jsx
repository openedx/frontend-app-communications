import React, { useRef } from 'react';
import { Button, Form } from '@edx/paragon';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import TextEditor from './TextEditor';

export default function BulkEmailBody() {
  const editorRef = useRef(null);
  const onInit = (event, editor) => { editorRef.current = editor; };

  return (
    <div className="w-100 m-auto p-lg-4 p-2.5">
      <Form>
        <Form.Group controlId="emailSubject">
          <Form.Label>
            <FormattedMessage
              id="bulk.email.subject.label"
              defaultMessage="Subject:"
              description="Email subject line input label. Meant to have colon or equivilant punctuation."
            />
          </Form.Label>
          <Form.Control className="w-lg-50" />
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
        </Form.Group>
        <Button variant="primary" type="submit">
          <FormattedMessage
            id="bulk.email.submit.button"
            defaultMessage="Submit"
            description="Submit/Send email button"
          />
        </Button>
      </Form>
    </div>
  );
}
