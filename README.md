# Password Generator

Hosted at https://password-generator-ethanlam2.vercel.app/

This is a personal project that generates customizable passwords with strength analysis and password history tracking.

This project demonstrates a full-stack workflow with seven main components:
1. Flask Backend (app.py): handles password generation logic, strength calculation, and history management
2. Generate Button: triggers password creation with settings the user defined
3. Header: provides title
4. Password Display: shows generated password with copy functionality
5. Password History: tracks and displays the last 20 generated passwords
6. Password Settings: Configurable length slider and character type checkboxes
7. Strength Indicator: provides visual color coded feedback on password security

## Features:
- Customizable Password Generation:
  - Length adjustment from 4 to 64 characters using an interactive slider
  - Character type selection: uppercase, lowercase, digits, and symbols
  - Real-time validation to ensure at least one character type is selected
- Password Strength Analysis:
  - Evaluates passwords based on length
  - Checks for character variety (uppercase, lowercase, digits, symbols)
- Password History Tracking:
  - Stores last 20 generated passwords in chronological order
  - Displays password, strength, length and timestamp for each entry
 
## Password Setup Interface:
1. Adjust password length using the slider control (4-64 characters)
2. Select character types from checkboxes (uppercase, lowercase, digits, symbols)
3. Click "Generate Password" button to create a new password
4. View generated password with color-coded strength indicator
5. Click copy button to copy password to clipboard

## Tech Stack:
- Frontend: React 19.2, Tailwind CSS, Lucide REact icons
- Backend: Python 3.14, Flask, Flask-CORS
- Deployment: Vercel (frontend), Render (backend)

   

   

