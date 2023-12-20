export const isPluginAvailable = async (pluginName) => {
  if (!pluginName) { return false; }

  try {
    await import(`@node_modules/@openedx-plugins/${pluginName}`);
    return true;
  } catch {
    return false;
  }
};
