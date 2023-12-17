import React, { useState } from 'react';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import PluggableComponent from '.';

const ToggleContentComponent = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setShowContent((prev) => !prev)}>
        Toggle Content
      </button>
      {showContent && <div data-testid="toggle-content">Toggle On</div>}
    </div>
  );
};

describe('PluggableComponent', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('renders correctly', async () => {
    const handleClickMock = jest.fn();
    const props = {
      title: 'button title',
      handleClick: handleClickMock,
    };

    const { container } = render(
      <PluggableComponent
        id="pluggableComponent"
        as="communications-app-test-component"
        {...props}
      >
        <h1>Hi this is the original component</h1>
      </PluggableComponent>,
    );

    await waitFor(() => {
      const buttonComponent = screen.getByTestId('button-test');
      expect(buttonComponent).toBeInTheDocument();
      expect(screen.getByText(props.title)).toBeInTheDocument();
      fireEvent.click(buttonComponent);
      expect(handleClickMock).toHaveBeenCalled();
      expect(container).toMatchSnapshot();
    });
  });

  it('loads children component when import is invalid', async () => {
    render(
      <PluggableComponent id="est-pluggable" as="invalid import">
        <div data-testid="plugin">Plugin Loaded</div>
      </PluggableComponent>,
    );

    await waitFor(() => {
      const defaultComponent = screen.getByTestId('plugin');
      expect(screen.getByText('Plugin Loaded')).toBeInTheDocument();
      expect(defaultComponent).toBeInTheDocument();
    });
  });

  it('loads children component when import is empty', async () => {
    render(
      <PluggableComponent
        id="test-pluggable"
        as=""
      >
        <div data-testid="plugin">Plugin Loaded</div>
      </PluggableComponent>,
    );

    await waitFor(() => {
      const defaultComponent = screen.getByTestId('plugin');
      expect(screen.getByText('Plugin Loaded')).toBeInTheDocument();
      expect(defaultComponent).toBeInTheDocument();
    });
  });

  it('returns null when do not have children and import is invalid', async () => {
    render(
      <PluggableComponent
        id="test-pluggable"
        as="invalid-module"
      />,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('plugin')).not.toBeInTheDocument();
    });
  });

  test('updates component when props change', async () => {
    const { rerender } = render(
      <PluggableComponent
        id="test-pluggable"
        as="communications-app-test-component"
        title="Testing title component"
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Testing title component')).toBeInTheDocument();
    });

    rerender(
      <PluggableComponent
        id="test-pluggable"
        as="communications-app-test-component"
        title="Testing a new title component"
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Testing a new title component')).toBeInTheDocument();
    });
  });

  it('updates component when children change', async () => {
    const { getByText, getByTestId } = render(
      <PluggableComponent
        id="test-pluggable"
        as="default-children"
      >
        <ToggleContentComponent />
      </PluggableComponent>,
    );

    await waitFor(() => {
      const toggleContent = screen.queryByTestId('toggle-content');
      expect(toggleContent).not.toBeInTheDocument();
    });

    const toggleButton = getByText('Toggle Content');
    fireEvent.click(toggleButton);

    // Now, after toggling the content, we expect it to be visible inside PluggableComponent
    await waitFor(() => {
      const toggleContent = getByTestId('toggle-content');
      expect(toggleContent).toBeInTheDocument();
      expect(toggleContent).toHaveTextContent('Toggle On');
    });
  });
});
