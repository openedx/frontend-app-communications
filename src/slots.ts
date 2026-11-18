import { helpButtonSlotOperation, SlotOperation } from '@openedx/frontend-base';
import { appId, communicationsRole } from '@src/constants';

const slots: SlotOperation[] = [
  helpButtonSlotOperation({ appId, role: communicationsRole }),
];

export default slots;
