frontend-app-communications
#############################

|license-badge| |status-badge| |ci-badge| |codecov-badge|


Purpose
*******

A tool used by course teams to communicate with their learners. The interface for anything related to instructor to learner communications. Instructor bulk email, for example.

Getting started
------------

For now, this repo is not intergrated with devstack. You'll be running the app locally and not through docker. This does make setup a little easier.

Cloning and Startup
===================

   1. Clone your new repo:

   ``git clone https://github.com/edx/frontend-app-communications.git``

   2. Use node v18.x.

      The current version of the micro-frontend build scripts support node 18.
      Using other major versions of node *may* work, but this is unsupported.  For
      convenience, this repository includes an .nvmrc file to help in setting the
      correct node version via `nvm <https://github.com/nvm-sh/nvm>`_.

   3. Install npm dependencies:

   ``cd frontend-app-communications && npm install``

   4. Update the application port to use for local development:

      Default port is 1984. If this does not work for you, update the line
      `PORT=1984` to your port in all .env.* files

   5. Start the devserver. The app will be running at ``localhost:1984``, or whatever port you change it too.

      .. code-block::

         npm start


Environment Variables/Setup Notes
---------------------------------

If you wish to add new environment varibles for local testing, they should be listed in 2 places:

1. In ``.env.development``
2. Added to the ``mergeConfig`` found in ``src/index.jsx``

.. code-block::

   initialize({
      config: () => {
       mergeConfig({
       EXAMPLE_VALUE: true,
       }, 'CommuncationsAppConfig');

Running Tests
---------------------------

Tests use `jest` and `react-test-library`. To run all the tests for this repo:

   .. code-block::

      npm test

Plugins
=======
This MFE can be customized using `Frontend Plugin Framework <https://github.com/openedx/frontend-plugin-framework>`_.

The parts of this MFE that can be customized in that manner are documented `here </src/plugin-slots>`_.

**Production Build**

The production build is created with ``npm run build``.

Internationalization
====================

Please see refer to the `frontend-platform i18n howto`_ for documentation on
internationalization.

.. _frontend-platform i18n howto: https://github.com/openedx/frontend-platform/blob/master/docs/how_tos/i18n.rst

Getting Help
************

If you're having trouble, we have discussion forums at
https://discuss.openedx.org where you can connect with others in the community.

Our real-time conversations are on Slack. You can request a `Slack
invitation`_, then join our `community Slack workspace`_.  Because this is a
frontend repository, the best place to discuss it would be in the `#wg-frontend
channel`_.

For anything non-trivial, the best path is to open an issue in this repository
with as many details about the issue you are facing as you can provide.

https://github.com/openedx/frontend-app-communications/issues

For more information about these options, see the `Getting Help`_ page.

.. _Slack invitation: https://openedx.org/slack
.. _community Slack workspace: https://openedx.slack.com/
.. _#wg-frontend channel: https://openedx.slack.com/archives/C04BM6YC7A6
.. _Getting Help: https://openedx.org/community/connect

License
*******

The code in this repository is licensed under the AGPLv3 unless otherwise
noted.

Please see `LICENSE <LICENSE>`_ for details.

Contributing
************

Contributions are very welcome.  Please read `How To Contribute`_ for details.

.. _How To Contribute: https://openedx.org/r/how-to-contribute

This project is currently accepting all types of contributions, bug fixes,
security fixes, maintenance work, or new features.  However, please make sure
to have a discussion about your new feature idea with the maintainers prior to
beginning development to maximize the chances of your change being accepted.
You can start a conversation by creating a new issue on this repo summarizing
your idea.

The Open edX Code of Conduct
****************************

All community members are expected to follow the `Open edX Code of Conduct`_.

.. _Open edX Code of Conduct: https://openedx.org/code-of-conduct/

People
******

The assigned maintainers for this component and other project details may be
found in `Backstage`_. Backstage pulls this data from the ``catalog-info.yaml``
file in this repo.

.. _Backstage: https://open-edx-backstage.herokuapp.com/catalog/default/component/frontend-app-communications

Reporting Security Issues
*************************

Please do not report security issues in public, and email security@openedx.org instead.

.. |license-badge| image:: https://img.shields.io/github/license/openedx/frontend-app-communications.svg
    :target: https://github.com/openedx/frontend-app-communications/blob/master/LICENSE
    :alt: License

.. |status-badge| image:: https://img.shields.io/badge/Status-Maintained-brightgreen

.. |ci-badge| image:: https://github.com/openedx/frontend-app-communications/actions/workflows/ci.yml/badge.svg
    :target: https://github.com/openedx/frontend-app-communications/actions/workflows/ci.yml
    :alt: Continuous Integration

.. |codecov-badge| image:: https://codecov.io/github/openedx/frontend-app-communications/coverage.svg?branch=master
    :target: https://codecov.io/github/openedx/frontend-app-communications?branch=master
    :alt: Codecov