document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const inputs = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        password: document.getElementById('password')
    };

    const errorMessages = {
        fullName: document.getElementById('fullNameError'),
        email: document.getElementById('emailError'),
        phone: document.getElementById('phoneError'),
        password: document.getElementById('passwordError')
    };

    const successMessage = document.getElementById('successMessage');

    // Validation patterns
    const patterns = {
        fullName: /^[A-Za-z\s]{2,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\d{10,15}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    };

    // Error messages
    const messages = {
        fullName: 'Please enter a valid name (letters and spaces only)',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number (10-15 digits)',
        password: 'Password must be at least 8 characters with one uppercase, one lowercase, and one number'
    };

    // Real-time validation
    Object.keys(inputs).forEach(field => {
        inputs[field].addEventListener('input', () => validateField(field));
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        Object.keys(inputs).forEach(field => {
            if (!validateField(field)) isValid = false;
        });

        if (isValid) {
            successMessage.classList.remove('hidden');
            form.reset();
            setTimeout(() => successMessage.classList.add('hidden'), 3000);
        }
    });

    function validateField(field) {
        const value = inputs[field].value.trim();
        const isValid = patterns[field].test(value);
        
        if (!isValid) {
            inputs[field].classList.add('invalid');
            errorMessages[field].textContent = messages[field];
            return false;
        } else {
            inputs[field].classList.remove('invalid');
            errorMessages[field].textContent = '';
            return true;
        }
    }
});