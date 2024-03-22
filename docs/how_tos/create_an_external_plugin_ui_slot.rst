########################################
How to create an external plugin UI slot
########################################

To create a new plugin that will live outside the MFE host, it will be in npm. The plugin needs to be compiled by `Babel <https://babeljs.io/>`_, that way webpack will be available to read the plugin. Here's an example for a small plugin:


**1. Plugin Structure:**

The plugin will have the following structure:

    - root
       - package.json
       - .babelrc
       - Makefile
       - src
          - index.jsx
          - index.css


**Example files:**

**1.1 package.json:**

This file contains the necessary dependencies for the plugin and also a Babel script to transpile the files inside the ``src`` folder of the plugin.

.. code-block:: json

   {
     "name": "@openedx-plugins/example-plugin",
     "version": "1.0.0",
     "scripts": {
         "babel:compile": "babel src --out-dir dist --source-maps --ignore '**/*.test.jsx,**/*.test.js' --copy-files"
     },
     "peerDependencies": {
       "@edx/browserslist-config": "^1.2.0",
       "@edx/frontend-app-communications": "https://github.com/eduNEXT/frontend-app-communications.git#jv/pluggable-component-slot",
       "@edx/frontend-build": "13.0.1",
       "@edx/frontend-platform": "5.5.2",
       "@edx/paragon": "^20.44.0",
       "eslint-import-resolver-webpack": "^0.13.8",
       "react": "17.0.2",
       "prop-types": "^15.8.1",
       "react-dom": "17.0.2"
     },
     "peerDependenciesMeta": {
       "@edx/frontend-app-communications": {
         "optional": true
       }
     },
     "devDependencies": {
       "@babel/cli": "^7.23.4",
       "@babel/core": "^7.23.7",
       "@babel/eslint-parser": "^7.23.3",
       "@babel/plugin-proposal-class-properties": "^7.18.6",
       "@babel/plugin-proposal-object-rest-spread": "^7.20.7",
       "@babel/preset-env": "^7.23.8",
       "@babel/preset-react": "^7.23.3",
       "@edx/browserslist-config": "^1.2.0",
       "@edx/frontend-build": "13.0.1"
     }
   }

**1.2. .babelrc:**

The essential configuration for Babel. This configuration works for any plugin. You could set it up if you need it.

.. code-block:: json

   {
     "presets": [
       [
         "@babel/preset-env",
         {
           "modules": false
         }
       ],
       "@babel/preset-react"
     ],
     "plugins": [
       "@babel/plugin-proposal-object-rest-spread",
       "@babel/plugin-proposal-class-properties"
     ],
     "env": {
       "test": {
         "plugins": ["@babel/plugin-proposal-class-properties"],
         "presets": [["@babel/preset-env"], "@babel/preset-react"]
       }
     },
     "ignore": ["**/*.test.jsx", "**/*.test.js"]
   }


**1.3. Makefile:**

This will create a folder called ``package`` that will have the compiled Babel files ready to upload to, for example, npm.

.. code-block:: makefile

   .ONESHELL: clean build

   clean:
       # Remove the package folder if it exists
       rm -rf package
       rm -rf dist

   build: clean
       # Run npm run babel
       npm run babel:compile

       # Create the package folder
       mkdir -p package

       # Copy package.json to the package folder
       cp package.json package/

       # Move files from dist folder to package folder
       find dist -type f ! -name "*.map" ! -name "*.test.js" ! -name "*.test.jsx" -exec cp {} package/ \;

       # Rename index.js to index.jsx in the package folder
       rm -rf  package/index.js
       cp dist/index.js package/index.jsx


**1.4. index.jsx:**

This will be the content of the plugin. In this case, it's a simple div.

.. code-block:: jsx

   import React from 'react';
   
   import './index.css';
   
   const MyPlugin = () => {
     return (
       <div className="openedx-plugin">
         <h1>Hello, World!</h1>
         {/* Add your plugin UI components here */}
       </div>
     );
   }
   
   export default MyPlugin;

**1.5. index.css:**

Styles for the plugin.

.. code-block:: css

   .openedx-plugin { 
       background-color: red;
       color: white;
   }


**2. Install Dependencies:**

After having the plugin structure, you can install the dependencies:

.. code-block:: bash

   npm install


**3. Compile the Plugin:**

Now you can compile the plugin by running the Makefile. This will create a folder called ``package`` with the necessary compiled files. Run the following command:

.. code-block:: bash

   make build

Notice that inside the ``package`` folder, there will always be a file called ``index.jsx`` and not ``index.js``. This ensures that when loading components, lazy loading won't have any problems.


**4. Upload the Plugin:**

Now that you have compiled the plugin, you can upload it to npm for example. Inside the ``package`` folder you can publish the plugin from there
