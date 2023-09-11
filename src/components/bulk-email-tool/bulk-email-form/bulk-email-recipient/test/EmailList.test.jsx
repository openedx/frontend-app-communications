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

  it('renders the component with main components ', () => {
    render(
      <EmailList
        courseId="123"
        emailList={mockEmailList}
      />,
    );

    // Check if the component renders without errors
    const emailInputLabel = screen.getByTestId('learners-email-list-label');
    const emailInput = screen.getByRole('combobox');
    const emailListLabel = screen.getByTestId('learners-email-list-label');

    expect(emailInputLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(emailListLabel).toBeInTheDocument();
  });
  it('should render two email chips', () => {
    render(
      <EmailList
        courseId="123"
        emailList={mockEmailList}
      />,
    );

    const emailChips = screen.getAllByTestId('email-list-chip');

    expect(emailChips).toHaveLength(2);
  });
  it('invokes handleDeleteEmail when clicking on delete icons', () => {
    const handleDeleteEmail = jest.fn();
    render(
      <EmailList
        courseId="123"
        emailList={mockEmailList}
        handleDeleteEmail={handleDeleteEmail}
      />,
    );

    // Find all delete icons
    const emailChips = screen.getAllByTestId('email-list-chip');

    // Iterate through the email chips to find the button inside each one
    emailChips.forEach((chip) => {
      const deleteButton = chip.querySelector('[role="button"]');
      fireEvent.click(deleteButton);
    });

    // Ensure that handleDeleteEmail is called for each email chip
    expect(handleDeleteEmail).toHaveBeenCalledTimes(mockEmailList.length);

    // Check that handleDeleteEmail is called with the correct email IDs
    expect(handleDeleteEmail).toHaveBeenCalledWith(mockEmailList[0].id);
    expect(handleDeleteEmail).toHaveBeenCalledWith(mockEmailList[1].id);
  });
});
