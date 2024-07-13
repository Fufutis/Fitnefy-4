document.addEventListener('DOMContentLoaded', () => {
  // Get the login and create account forms
  const loginForm = document.querySelector('#login');
  const createAccountForm = document.querySelector('#createAccount');

  // Add event listener to the "Create Account" link to switch to the create account form
  document.querySelector('#linkCreateAccount').addEventListener('click', e => {
    e.preventDefault();
    loginForm.classList.add('form--hidden');
    createAccountForm.classList.remove('form--hidden');
  });

  // Add event listener to the "Login" link to switch back to the login form
  document.querySelector('#linkLogin').addEventListener('click', e => {
    e.preventDefault();
    loginForm.classList.remove('form--hidden');
    createAccountForm.classList.add('form--hidden');
  });

  // Add event listener to the login form submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    };

    try {
      // Send login request to the server
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('Login response status:', response.status);
      console.log('Login response message:', result);

      if (response.ok) {
        // Redirect to the main page on successful login
        window.location.href = '../html/Main.html';
      } else {
        console.error('Login failed', result);
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  });

  // Add event listener to the create account form submission
  createAccountForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(createAccountForm);
    const data = {
      username: formData.get('signupUsername'),
      email: formData.get('signupEmail'),
      password: formData.get('signupPassword'),
      confirmPassword: formData.get('signupConfirmPassword')
    };

    console.log('Submitting registration form:', data);

    try {
      // Send registration request to the server
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('Registration response status:', response.status);
      console.log('Registration response message:', result);

      if (response.ok) {
        // Switch back to login form on successful registration
        loginForm.classList.remove('form--hidden');
        createAccountForm.classList.add('form--hidden');
      } else {
        // Handle registration errors
        if (result.message === 'Username already exists') {
          alert('Username already exists. Please choose another one.');
        }
        console.error('Registration failed', result);
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
  });
});