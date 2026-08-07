document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const signupForm = document.getElementById('signupForm');
    const signinForm = document.getElementById('signinForm');

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    // Password strength checker
    document.getElementById('signupPassword').addEventListener('input', function(e) {
        const password = e.target.value;
        const strengthMeter = document.querySelector('.strength-meter-fill');
        const strengthText = document.querySelector('.strength-text');
        
        // Reset
        strengthMeter.style.width = '0%';
        strengthMeter.style.backgroundColor = 'transparent';
        strengthText.textContent = '';
        
        if (password.length === 0) return;
        
        // Calculate strength
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Character variety
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update meter
        let width = 0;
        let color = '';
        let text = '';
        
        if (strength <= 2) {
            width = 33;
            color = '#F44336';
            text = 'Weak';
        } else if (strength <= 4) {
            width = 66;
            color = '#FFC107';
            text = 'Medium';
        } else {
            width = 100;
            color = '#4CAF50';
            text = 'Strong';
        }
        
        strengthMeter.style.width = width + '%';
        strengthMeter.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    });

    // Password match checker
    document.getElementById('confirmPassword').addEventListener('input', function() {
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = this.value;
        const matchText = document.querySelector('.password-match');
        
        if (confirmPassword.length === 0) {
            matchText.textContent = '';
            return;
        }
        
        if (password === confirmPassword) {
            matchText.textContent = 'Passwords match!';
            matchText.className = 'password-match valid';
        } else {
            matchText.textContent = 'Passwords do not match';
            matchText.className = 'password-match invalid';
        }
    });

    // Toggle password visibility
    window.togglePassword = function(inputId, icon) {
        const input = document.getElementById(inputId);
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    // Form submissions
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if passwords match
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // In a real app, you would submit the form here
            alert('Account created successfully!');
            container.classList.remove("active");
            
            // Auto-fill the email in sign-in form
            const email = document.getElementById('signupEmail').value;
            document.getElementById('signinEmail').value = email;
        });
    }

    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would validate credentials here
            alert('Logged in successfully!');
            // window.location.href = "homepage.html";
        });
    }

    // Create floating bubbles
    function createBubbles() {
        const bubblesContainer = document.body;
        const bubbleCount = 15;
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // Random size between 20px and 80px
            const size = Math.random() * 60 + 20;
            
            // Random position
            const left = Math.random() * 100;
            
            // Random animation duration between 10s and 25s
            const duration = Math.random() * 15 + 10;
            
            // Random delay
            const delay = Math.random() * 15;
            
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;
            
            bubblesContainer.appendChild(bubble);
        }
    }

    // Initialize bubbles
    createBubbles();

    
});

if (signinForm) {
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, you would validate credentials here
        alert('Logged in successfully! Redirecting to homepage...');
        
        // Set a small delay before redirecting
        setTimeout(function() {
            window.location.href = "homepage.html";
        }, 1500);
    });
}

// In login.js (after successful login)
localStorage.setItem('isLoggedIn', 'true');

// In homepage.js (at the top of the file)
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = "login.html";
    }
    
    // Logout functionality
    const logoutLink = document.querySelector('a[href="login.html"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = "login.html";
        });
    }
});

// In login.js, update the form submission handler for signup
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if passwords match
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // In a real app, you would submit the form here
        alert('Account created successfully! Please sign in.');
        
        // Switch to sign in panel
        container.classList.remove("active");
        
        // Auto-fill the email in sign-in form
        const email = document.getElementById('signupEmail').value;
        document.getElementById('signinEmail').value = email;
        
        // Focus on password field
        document.getElementById('signinPassword').focus();
    });
}