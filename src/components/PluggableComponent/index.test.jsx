import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import PluggableComponent from '.';

describe('PluggableComponent', () => {
  it('renders correctly', async () => {
    const props = {
      isValid: true,
      controlId: 'randomID',
      label: 'Hello',
      feedbackText: 'You are correct',
    };
    const { container } = render(
      <PluggableComponent
        id="pluggableComponent"
        as="communications-app-input-form"
        {...props}
      >
        <h1>Hi this is the original component</h1>
      </PluggableComponent>,
    );

    await waitFor(() => {
      const inputForm = screen.getByTestId('plugin-input');
      expect(inputForm).toBeInTheDocument();
      expect(screen.getByText(props.label)).toBeInTheDocument();
      expect(screen.getByText(props.feedbackText)).toBeInTheDocument();
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

  it('loads children component when import object', async () => {
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
});
