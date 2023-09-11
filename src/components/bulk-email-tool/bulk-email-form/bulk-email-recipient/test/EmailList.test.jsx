import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render, initializeMockApp } from '../../../../../setupTest';
import EmailList from '../components/EmailList';

describe('EmailList Component', () => {
  beforeAll(() => {
    // Call initializeMockApp to configure authService
    initializeMockApp();
  });

  const mockEmailList = [
    { id: '1', email: 'user1@example.com' },
    { id: '2', email: 'user2@example.com' },
  ];

  it('renders the component without errors', () => {
    render(<EmailList emailList={mockEmailList} />);
  });

  it('renders the component with main components', () => {
    render(<EmailList emailList={mockEmailList} />);

    // Check if the component renders without errors
    const emailInputLabel = screen.getByTestId('learners-email-input-label');
    const emailInput = screen.getByTestId('learners-email-input');
    const emailAddButton = screen.getByTestId('learners-email-add-button');
    const emailListLabel = screen.getByTestId('learners-email-list-label');

    expect(emailInputLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(emailAddButton).toBeInTheDocument();
    expect(emailListLabel).toBeInTheDocument();
  });

  it('should render two email chips', () => {
    render(<EmailList emailList={mockEmailList} />);

    const emailChips = screen.getAllByTestId('email-list-chip');

    expect(emailChips).toHaveLength(2);
  });

  it('displays an error message for invalid email', () => {
    render(<EmailList emailList={mockEmailList} />);

    // Enter an invalid email
    const emailInput = screen.getByTestId('learners-email-input');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    // Click the add button
    const emailAddButton = screen.getByTestId('learners-email-add-button');
    fireEvent.click(emailAddButton);

    // Check if the error message is displayed
    const errorMessage = screen.getByText('Invalid email address');
    expect(errorMessage).toBeInTheDocument();
  });
});
