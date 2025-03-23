function addCompany() {
    // Get all the form field values
    const companyName = document.getElementById('companyName').value;
    const companyAddress = document.getElementById('companyAddress').value;
    const companyCinNumber = document.getElementById('companyCinNumber').value;
    const companyContactPersonName = document.getElementById('companyContactPersonName').value;
    const companyContactPersonPhone = document.getElementById('companyContactPersonPhone').value;
    const companyContactPersonEmail = document.getElementById('companyContactPersonEmail').value;

    // Validate if any of the fields are empty
    if (!companyName || !companyAddress || !companyCinNumber || !companyContactPersonName || !companyContactPersonPhone || !companyContactPersonEmail) {
        alert("All fields are required.");
        return; // Stop further execution if validation fails
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(companyContactPersonEmail)) {
        alert("Please enter a valid email address.");
        return; // Stop further execution if email is invalid
    }

    // Validate phone number format (assuming 10-digit phone number)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(companyContactPersonPhone)) {
        alert("Please enter a valid 10-digit phone number.");
        return; // Stop further execution if phone number is invalid
    }

    // If validation passes, create the company object and send the request
    const company = {
        companyName: companyName,
        companyAddress: companyAddress,
        companyCinNumber: companyCinNumber,
        companyContactPersonName: companyContactPersonName,
        companyContactPersonPhone: companyContactPersonPhone,
        companyContactPersonEmail: companyContactPersonEmail
    };

    // Send the company data to the server
    fetch('/companies', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(company)
    })
    .then(response => {
        if (response.ok) {
            alert('Company added successfully');
            location.reload();
        } else {
            alert('Error adding company');
        }
    })
    .catch(error => {
        alert('Network error or invalid response');
        console.error(error);
    });
}