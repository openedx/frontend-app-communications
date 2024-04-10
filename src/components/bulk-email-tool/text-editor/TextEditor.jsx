import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
import 'tinymce';

import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/skins/ui/oxide/skin.css';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/code';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/plugins/image';
import 'tinymce/plugins/codesample';
import '@edx/tinymce-language-selector';

/* eslint import/no-webpack-loader-syntax: off */
// eslint-disable-next-line import/no-unresolved
import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.css';
// eslint-disable-next-line import/no-unresolved
import contentCss from '!!raw-loader!tinymce/skins/content/default/content.css';

export default function TextEditor(props) {
  const {
    onChange, onKeyUp, onInit, disabled, value,
  } = props;

  let contentStyle;
  // In the test environment this causes an error so set styles to empty since they aren't needed for testing.
  try {
    contentStyle = [contentCss, contentUiCss].join('\n');
  } catch (err) {
    contentStyle = '';
  }

  return (
    <Editor
      initialValue=""
      init={{
        selector: 'textarea#editor',
        height: 600,
        branding: false,
        menubar: 'edit view insert format table tools',
        plugins: 'advlist code link lists table image codesample',
        toolbar:
          'formatselect fontselect bold italic underline forecolor | codesample bullist numlist alignleft aligncenter alignright alignjustify indent | blockquote link image code ',
        skin: false,
        content_css: false,
        content_style: contentStyle,
        extended_valid_elements: 'span[lang|id] -span',
        block_unsupported_drop: false,
        image_advtab: true,
        name: 'emailBody',
        relative_urls: false,
        remove_script_host: false,
      }}
      onEditorChange={onChange}
      value={value}
      onKeyUp={onKeyUp}
      onInit={onInit}
      disabled={disabled}
    />
  );
}

TextEditor.defaultProps = {
  onChange: () => {},
  onKeyUp: () => {},
  onInit: () => {},
  disabled: false,
  value: '',
};

TextEditor.propTypes = {
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  onInit: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string,
};
