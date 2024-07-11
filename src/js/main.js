document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login');
  const createAccountForm = document.querySelector('#createAccount');

  document.querySelector('#linkCreateAccount').addEventListener('click', e => {
    e.preventDefault();
    loginForm.classList.add('form--hidden');
    createAccountForm.classList.remove('form--hidden');
  });

  document.querySelector('#linkLogin').addEventListener('click', e => {
    e.preventDefault();
    loginForm.classList.remove('form--hidden');
    createAccountForm.classList.add('form--hidden');
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    };

    try {
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
        window.location.href = '../html/Main.html';
      } else {
        console.error('Login failed', result);
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  });

  createAccountForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(createAccountForm);
    const data = {
      username: formData.get('signupUsername'),
      email: formData.get('signupEmail'),
      password: formData.get('signupPassword'),
      confirmPassword: formData.get('signupConfirmPassword')
    };

    try {
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
        loginForm.classList.remove('form--hidden');
        createAccountForm.classList.add('form--hidden');
      } else {
        console.error('Registration failed', result);
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
  });
});
