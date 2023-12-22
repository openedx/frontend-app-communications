import { isPluginAvailable } from './utils';

describe('isPluginAvailable util', () => {
  test('returns true if a plugin is installed', async () => {
    const checkBoxPlugin = await isPluginAvailable('communications-app-check-box-form');
    expect(checkBoxPlugin).toBe(true);
  });

  test('returns false if a plugin is not installed', async () => {
    const nonexistentPlugin = await isPluginAvailable('nonexistentPlugin');
    expect(nonexistentPlugin).toBe(false);
  });

  test('returns false if an empty string is provided as plugin name', async () => {
    const emptyPlugin = await isPluginAvailable('');
    expect(emptyPlugin).toBe(false);
  });

  test('returns false if null is provided as plugin name', async () => {
    const nullPLugin = await isPluginAvailable(null);
    expect(nullPLugin).toBe(false);
  });
});
