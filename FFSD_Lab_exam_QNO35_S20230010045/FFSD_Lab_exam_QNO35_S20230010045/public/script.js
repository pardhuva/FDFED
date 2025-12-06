document.getElementById('surveyForm').addEventListener('submit', function(e) {
    let isValid = true;
    const fname = document.getElementById('S0045FName').value;
    const lname = document.getElementById('S0045LName').value;
    const email = document.getElementById('S0045Email').value;
    const feedback = document.getElementById('S0045Feedback').value;
    const rating = document.getElementById('S0045Rating').value;

    // Clear previous errors
    document.getElementById('S0045FNameError').textContent = '';
    document.getElementById('S0045LNameError').textContent = '';
    document.getElementById('S0045EmailError').textContent = '';
    document.getElementById('S0045FeedbackError').textContent = '';
    document.getElementById('S0045RatingError').textContent = '';

    // Validate First Name
    if (!fname || fname.length > 50) {
        document.getElementById('S0045FNameError').textContent = 'First name is required and should be less than 50 characters';
        isValid = false;
    }

    // Validate Last Name
    if (!lname || lname.length > 50) {
        document.getElementById('S0045LNameError').textContent = 'Last name is required and should be less than 50 characters';
        isValid = false;
    }

    // Validate Email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('S0045EmailError').textContent = 'Valid email is required';
        isValid = false;
    }

    // Validate Feedback
    if (!feedback || feedback.length > 500) {
        document.getElementById('S0045FeedbackError').textContent = 'Feedback is required and should be less than 500 characters';
        isValid = false;
    }

    // Validate Rating
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
        document.getElementById('S0045RatingError').textContent = 'Rating must be a number between 1 and 5';
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
})
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
        const successmsg = document.getElementById("successMessage");
        if (successmsg) {
            successmsg.style.display = 'block';

            setTimeout(() => {
                successmsg.style.display = 'none';
            }, 3000);
        }
    }
    });
