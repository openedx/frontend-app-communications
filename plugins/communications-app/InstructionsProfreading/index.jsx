import React, { memo } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';

const InstructionsProofreading = () => {
  const intl = useIntl();
  return (
    <div>
      <p>{intl.formatMessage(messages.instructionsProofreading)}</p>
    </div>
  );
};

export default memo(InstructionsProofreading);
