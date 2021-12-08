|Build Status| |Codecov| |license| |semantic-release| ## As many of these as you'd like to include, or others if you wish!

frontend-app-communications
==============================

Please tag **@edx/aperture-eng** on any PRs or issues.  Thanks!

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
      git clone https://github.com/edx/devstack.git

2. Install frontend dependencies

   .. code-block::

      npm i

3. start the devserver. The app will be running at `localhost:8080`, or whatever port you change it too.

   .. code-block::

      npm i

Environment Variables/Setup Notes
---------------------------------

TBD

Running Tests
---------------------------

tests use jest as usual. To run all the tests for this repo:

   .. code-block::

      npm test