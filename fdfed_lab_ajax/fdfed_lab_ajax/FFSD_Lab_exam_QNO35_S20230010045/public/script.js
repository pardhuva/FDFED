document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

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
        return;
    }

    // AJAX submission using XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/submit', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Redirect to /display on success
                window.location.href = '/display';
            } else {
                // Show server error message
                alert('Error: ' + xhr.responseText);
            }
        }
    };

    // Prepare form data as URL-encoded string
    const params = 
        'S0045FName=' + encodeURIComponent(fname) +
        '&S0045LName=' + encodeURIComponent(lname) +
        '&S0045Email=' + encodeURIComponent(email) +
        '&S0045Feedback=' + encodeURIComponent(feedback) +
        '&S0045Rating=' + encodeURIComponent(rating);

    xhr.send(params);
});

// ...existing button event listeners...
const submitBtn = document.getElementById('S0045Submit');

// Enhanced onmouseover: Change background color and add a tooltip-like effect
submitBtn.addEventListener('mouseover', function() {
    this.style.backgroundColor = 'green';
    this.style.transform = 'scale(1.05)';
    this.title = 'Click to submit your survey!';
});

// onmouseout: Reset styles
submitBtn.addEventListener('mouseout', function() {
    this.style.backgroundColor = '#db3490ff';
    this.style.transform = 'scale(1)';
    this.title = '';
});

// onmousedown: Change appearance when mouse is pressed
submitBtn.addEventListener('mousedown', function() {
    this.style.backgroundColor = '#a10de6ff';
    this.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.2)';
});

// onclick: Provide feedback or perform an action
submitBtn.addEventListener('click', function() {
    console.log('Submit button clicked!');
    this.style.backgroundColor = '#fd0909ff';
    this.style.boxShadow = 'none';
});