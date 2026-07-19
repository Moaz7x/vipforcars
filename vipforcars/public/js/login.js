document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Stop default GET request

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  const errorMsg = document.getElementById('error-msg');

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Save the cookie
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      window.location.href = '/admin/dashboard';
    } else {
      errorMsg.textContent = result.message;
      errorMsg.style.display = 'block';
    }
  } catch (error) {
    errorMsg.textContent = 'An error occurred. Please try again.';
    errorMsg.style.display = 'block';
  }
});
