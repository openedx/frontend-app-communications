/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import loadable from '@loadable/component';
import PropTypes from 'prop-types';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { isPluginAvailable } from './utils';

/**
 * PluggableComponent - A component that allows dynamic loading and replacement of child components.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to be passed to the plugin component
 * @param {string} props.as - String indicating the module to import dynamically
 * @param {string} props.id - Identifier for the plugin
 * @param {object} props.pluggableComponentProps - Additional props to be passed to the component
 * @returns {React.ReactNode} - Rendered component
 */
const PluggableComponent = ({
  children,
  as,
  id,
  ...pluggableComponentProps
}) => {
  const [newComponent, setNewComponent] = useState(children || null);
  const loadedComponentRef = useRef(null);

  useEffect(() => {
    const loadPluginComponent = async () => {
      try {
        const hasModuleInstalled = await isPluginAvailable(as);

        if (hasModuleInstalled) {
          const PluginComponent = loadable(() => import(`@node_modules/@openedx-plugins/${as}`));

          const component = children ? (
            <PluginComponent key={id} {...pluggableComponentProps}>
              {children}
            </PluginComponent>
          ) : (
            <PluginComponent key={id} {...pluggableComponentProps} />
          );

          setNewComponent(component);
          loadedComponentRef.current = true;
        }
      } catch (error) {
        console.error(`Failed to load plugin ${as}:`, error);
      }
    };

    loadPluginComponent();
  }, [id, as]);

  useEffect(() => {
    if (newComponent && children && loadedComponentRef.current) {
      const updatedComponent = React.cloneElement(newComponent, pluggableComponentProps, children);
      setNewComponent(updatedComponent);
    }
  }, [children]);

  useDeepCompareEffect(() => {
    if (newComponent && loadedComponentRef.current) {
      const updatedComponent = React.cloneElement(newComponent, pluggableComponentProps, children);
      setNewComponent(updatedComponent);
    }
  }, [pluggableComponentProps]);

  return newComponent;
};

PluggableComponent.propTypes = {
  children: PropTypes.node,
  as: PropTypes.string,
  id: PropTypes.string,
};

export default PluggableComponent;
