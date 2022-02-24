|Codecov| |license|

.. |codecov| image:: https://codecov.io/gh/edx/frontend-app-learning/branch/master/graph/badge.svg?token=3z7XvuzTq3
   :target: https://codecov.io/gh/edx/frontend-app-communications
.. |license| image:: https://img.shields.io/badge/license-AGPL-informational
   :target: https://github.com/edx/frontend-app-account/blob/master/LICENSE

frontend-app-communications
==============================

Please tag **edx-aperture** on any PRs or issues.  Thanks!

Introduction
------------

A tool used by course teams to communicate with thier learners. The interface for anything related to instructor to learner communications. Instructor bulk email, for example.


Getting started
------------

For now, this repo is not intergrated with devstack. You'll be running the app locally and not through docker. This does make setup a little easier.

1. Clone the repo into your usual workspace

   .. code-block::

      mkdir -p ~/workspace/
      cd ~/workspace/
      git clone https://github.com/edx/frontend-app-communications.git

2. Install frontend dependencies

   .. code-block::

      npm i

3. Start the devserver. The app will be running at ``localhost:1984``, or whatever port you change it too.

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
