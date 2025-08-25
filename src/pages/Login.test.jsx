// @vitest-environment jsdom
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';
import Login from './Login';
import authReducer from '../features/auth/authSlice';

// Mock API layer used by thunks so we can exercise real thunks without network
vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));
import api from '../services/api';

// Create a mock store
const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });
};

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = createMockStore({
      auth: {
        user: null,
        loading: false,
        error: null,
      },
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const renderWithProviders = (component) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders login form with all elements', () => {
    renderWithProviders(<Login />);

    // Check for main heading
    expect(screen.getByText('LSL Plus')).toBeInTheDocument();
    expect(screen.getByText('Built for Precision. Designed for Compliance.')).toBeInTheDocument();

    // Check for form elements
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
    expect(screen.getByText('Remember Me')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
  });

  test('handles email input changes', () => {
    renderWithProviders(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput.value).toBe('test@example.com');
  });

  test('handles password input changes', () => {
    renderWithProviders(<Login />);
    
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(passwordInput.value).toBe('password123');
  });

  test('handles remember me checkbox changes', () => {
    renderWithProviders(<Login />);
    
    const rememberMeCheckbox = screen.getByRole('checkbox', { name: /remember me/i });
    expect(rememberMeCheckbox.checked).toBe(false);
    
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox.checked).toBe(true);
    
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox.checked).toBe(false);
  });

  test('submits form with email and password', async () => {
    api.post.mockResolvedValueOnce({ data: { user: { id: 1, email: 'test@csu.edu.au' } } });

    renderWithProviders(<Login />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Email'), { 
      target: { value: 'test@csu.edu.au' } 
    });
    fireEvent.change(screen.getByLabelText('Password'), { 
      target: { value: 'testpassword' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getAllByRole('button', { name: 'Go' })[0]);
    
    // Check that API was called with correct credentials and navigation occurred
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/api/v1/auth/signin', {
        email: 'test@csu.edu.au',
        password: 'testpassword',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('navigates to dashboard on successful login', async () => {
    api.post.mockResolvedValueOnce({ data: { user: { id: 1, email: 'test@csu.edu.au' } } });

    renderWithProviders(<Login />);
    
    // Fill out and submit the form
    fireEvent.change(screen.getByLabelText('Email'), { 
      target: { value: 'test@csu.edu.au' } 
    });
    fireEvent.change(screen.getByLabelText('Password'), { 
      target: { value: 'testpassword' } 
    });
    fireEvent.click(screen.getAllByRole('button', { name: 'Go' })[0]);
    
    // Check that navigation occurred
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('handles login failure', async () => {
    api.post.mockRejectedValueOnce({ response: { data: { message: 'Login failed' } } });

    renderWithProviders(<Login />);
    
    // Fill out and submit the form
    fireEvent.change(screen.getByLabelText('Email'), { 
      target: { value: 'test@csu.edu.au' } 
    });
    fireEvent.change(screen.getByLabelText('Password'), { 
      target: { value: 'wrongpassword' } 
    });
    fireEvent.click(screen.getAllByRole('button', { name: 'Go' })[0]);
    
    // Check that navigation did not occur
    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    });
    
    // Error should be handled (you might want to add error display in the component)
  });

  // test('calls logoutUser when logout button is clicked', async () => {
  //   api.post.mockResolvedValueOnce({});

  //   renderWithProviders(<Login />);
    
  //   const logoutButton = screen.getAllByRole('button', { name: 'Logout' })[0];
  //   fireEvent.click(logoutButton);
    
  //   await waitFor(() => {
  //     expect(api.post).toHaveBeenCalledWith('/api/v1/auth/logout');
  //   });
  // });

  test('inputs are marked as required', () => {
    renderWithProviders(<Login />);

    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Password')).toBeRequired();
  });
});
