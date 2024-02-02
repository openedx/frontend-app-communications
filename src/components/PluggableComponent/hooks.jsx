import React, { useState, useEffect, useRef } from 'react';
import loadable from '@loadable/component';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { isPluginAvailable, getPluginsByPrefix } from './utils';

/**
 * Component that dynamically loads and displays a list of plugins.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - Children components to be passed to each plugin.
 * @param {Array} props.plugins - An array of plugin objects to be loaded.
 * @param {React.ReactNode} props.loadingComponent - Component to display while each plugin is loading.
 * @param {Object} props.pluggableComponentProps - Additional props to be passed to each dynamically loaded plugin.
 * @returns {React.ReactNode} The rendered component.
 */
export const usePlugins = (plugins, pluggableComponentProps, prefix, loadingComponent) => {
  const [pluginComponents, setPluginComponents] = useState({});
  const loadedAllPluginsRef = useRef(null);

  useEffect(() => {
    const loadPlugins = (pluginsList) => {
      pluginsList.forEach((plugin, index) => {
        // Initially set the loading component for each plugin
        setPluginComponents(previousPluginComponents => ({
          ...previousPluginComponents,
          [plugin.id]: loadingComponent || null,
        }));

        const loadPlugin = async () => {
          try {
            const hasModuleInstalled = await isPluginAvailable(plugin.name);
            if (hasModuleInstalled) {
              const PluginComponent = loadable(() => import(`@node_modules/@openedx-plugins/${plugin.name}`));
              setPluginComponents(previousPluginComponents => ({
                ...previousPluginComponents,
                [plugin.id]: (
                  <PluginComponent {...pluggableComponentProps} />
                ),
              }));
            }
          } catch (error) {
            console.error(`Failed to load plugin ${plugin.name}:`, error);
            // Set to null in case of an error
            setPluginComponents(previousPluginComponents => ({
              ...previousPluginComponents,
              [plugin.id]: null,
            }));
          } finally {
            const isLastPlugin = index === pluginsList.length - 1;
            if (isLastPlugin) {
              loadedAllPluginsRef.current = true;
            }
          }
        };

        loadPlugin();
      });
    };

    const pluginsToLoad = prefix ? getPluginsByPrefix(prefix) : plugins;

    if (pluginsToLoad.length) {
      loadPlugins(pluginsToLoad);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDeepCompareEffect(() => {
    const updatePluginsWithNewProps = () => {
      const updatedComponents = Object.keys(pluginComponents).reduce((previousPluginComponents, pluginKey) => {
        const PluginComponent = pluginComponents[pluginKey];
        // Check if the component is a valid React element and not a loading or error state
        if (React.isValidElement(PluginComponent)) {
          const UpdatedComponent = React.cloneElement(PluginComponent, pluggableComponentProps);
          return {
            ...previousPluginComponents,
            [pluginKey]: UpdatedComponent,
          };
        }
        return previousPluginComponents;
      }, {});

      setPluginComponents(updatedComponents);
    };

    if (loadedAllPluginsRef.current) {
      updatePluginsWithNewProps();
    }
  }, [pluggableComponentProps]);

  return pluginComponents;
};
