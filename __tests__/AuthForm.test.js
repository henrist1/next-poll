import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AuthForm from '../components/AuthForm';


// Mock the useRouter hook
const mockedUsedRouter = { push: jest.fn() };
jest.mock('next/router', () => ({ useRouter: () => mockedUsedRouter }));

// Mock axios.post method
jest.mock('axios');
const mockedAxios = axios;

describe('AuthForm', () => {
  it('allows the user to login', async () => {
    // Prepare the component with the "login" mode
    const { getByText, getByPlaceholderText } = render(<AuthForm mode="login" />);

    // Mock the axios response for login
    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    // Simulate user input and submission
    fireEvent.change(getByPlaceholderText('Enter your email to login'), { target: { value: 'user@example.com' } });
    fireEvent.click(getByText('Login'));

    // Assert that axios.post was called with the correct URL and body
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/users', {
        email: 'user@example.com',
        action: 'login',
      });
    });

    // Assert that after successful login, push to the home page
    expect(mockedUsedRouter.push).toHaveBeenCalledWith('/');
  });

  // Add more tests
});
