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
import '@edx/tinymce-language-selector';

import contentUiCss from 'tinymce/skins/ui/oxide/content.css';
import contentCss from 'tinymce/skins/content/default/content.css';

export default function TextEditor(props) {
  const {
    onChange, onKeyUp, onInit, disabled,
  } = props;

  return (
    <Editor
      initialValue=""
      init={{
        selector: 'textarea#editor',
        height: 600,
        branding: false,
        menubar: 'edit view insert format table tools',
        plugins: 'advlist code emoticons link lists table image language',
        toolbar: 'formatselect fontselect bold italic underline forecolor | code bullist numlist alignlef aligncenter alignright alignjustify indent | blockquote link emoticons image | language',
        skin: false,
        content_css: false,
        content_style: `${contentUiCss.toString()}\n${contentCss.toString()}`,
        extended_valid_elements: 'span[lang|id] -span',
        block_unsupported_drop: false,
        paste_data_images: true,
      }}
      onChange={onChange}
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
};

TextEditor.propTypes = {
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  onInit: PropTypes.func,
  disabled: PropTypes.bool,
};
