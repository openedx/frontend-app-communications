import React from 'react';
import PropTypes from 'prop-types';

function MockTinyMCE({ onInit }) {
  const mockedEditor = {
    getContent: () => 'test body',
  };
  onInit({}, mockedEditor);

  return <div />;
}

MockTinyMCE.propTypes = {
  onInit: PropTypes.func.isRequired,
};

export default function TextEditor({ onInit }) {
  return <MockTinyMCE onInit={onInit} />;
}

TextEditor.propTypes = {
  onInit: PropTypes.func.isRequired,
};
