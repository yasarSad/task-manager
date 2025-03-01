import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {Auth} from 'aws-amplify';
import Signup from './signup';
import {BrowserRouter as Router} from 'react-router-dom';

// authorization

jest.mock('aws-amplify', () => ({
    Auth: {
        signUp: jest.fn(),
    },
}));

describe('Signup Component', () => {
    test('renders Signup component', () => {
        render(
            <Router>
                <Signup/>
            </Router>
        );

        // user input 
        userEvent.type(screen.getByLabelText(/email/i), 'test@gmail.com');
        userEvent.type(screen.getByLabelText(/password/i), 'password123');
        
        expect(screen.getAllByLabelText(/email/i)).toHaveValue('test@example.com');
        expect(screen.getByLabelText(/password/i)).toHaveValue('password123');
    });

    
})