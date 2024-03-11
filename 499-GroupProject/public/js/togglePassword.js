function togglePassword() {
    let passwordInput = document.getElementById('password-signup');
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }