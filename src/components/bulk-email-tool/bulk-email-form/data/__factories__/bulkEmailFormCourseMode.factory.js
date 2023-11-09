import { Factory } from 'rosie'; // eslint-disable-line import/no-extraneous-dependencies

const courseModeFactory = () => {
  const AuditModeFactory = Factory.define('AuditModeFactory')
    .attr('slug', 'audit')
    .attr('name', 'Audit');

  const VerifiedModeFactory = Factory.define('VerifiedModeFactory')
    .attr('slug', 'verified')
    .attr('name', 'Verified Certificate');

  return [
    AuditModeFactory.build(),
    VerifiedModeFactory.build(),
  ];
};

export default courseModeFactory;
