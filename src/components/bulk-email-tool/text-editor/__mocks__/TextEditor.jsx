import React from 'react';
import PropTypes from 'prop-types';

/**
 * We represent tinyMCE here as a textarea, because tinyMCE has no support for testing
 * with jest, so we need to mock it out. This is not ideal, but since the TextEditor
 * component is really just a wrapper, we're not too concerned about unit testing.
 */
function MockTinyMCE({ onChange }) {
  return <textarea data-testid="textEditor" onChange={onChange} />;
}

MockTinyMCE.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default function TextEditor({ onChange }) {
  return <MockTinyMCE onChange={onChange} />;
}

TextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};
