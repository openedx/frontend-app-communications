import React, { useRef } from 'react';
import { Button, Form } from '@edx/paragon';

import TextEditor from './TextEditor';

export default function BulkEmailBody() {
  const editorRef = useRef(null);
  const onInit = (event, editor) => { editorRef.current = editor; };

  return (
    <div className="w-100 m-auto p-lg-4 p-2.5">
      <Form>
        <Form.Group controlId="emailSubject">
          <Form.Label>Subject:</Form.Label>
          <Form.Control className="w-lg-50" />
        </Form.Group>
        <Form.Group controlId="emailBody">
          <Form.Label>Body:</Form.Label>
          <TextEditor onInit={onInit} />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
}
