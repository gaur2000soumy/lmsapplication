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
document.addEventListener("DOMContentLoaded", function () {
    fetchCompanies();
});

function fetchCompanies() {
    fetch("/companies")
        .then(response => response.json())
        .then(data => {
            const adminCompanySelect = document.getElementById("adminCompany");
            const userCompanySelect = document.getElementById("userCompany");

            data.forEach(company => {
                let option = document.createElement("option");
                option.value = company.id;
                option.textContent = company.companyName;

                adminCompanySelect.appendChild(option.cloneNode(true));
                userCompanySelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching companies:", error));
}

function addAdmin() {
    submitUser("ADMIN_ROLE");
}

function addUser() {
    submitUser("USER_ROLE");
}

function submitUser(role) {
    let fullName = document.getElementById(role === "ADMIN_ROLE" ? "adminFullName" : "userFullName").value;
    let email = document.getElementById(role === "ADMIN_ROLE" ? "adminEmail" : "userEmail").value;
    let phone = document.getElementById(role === "ADMIN_ROLE" ? "adminPhone" : "userPhone").value;
    let companyId = document.getElementById(role === "ADMIN_ROLE" ? "adminCompany" : "userCompany").value;
    let password = document.getElementById(role === "ADMIN_ROLE" ? "adminPassword" : "userPassword").value;
    let confirmPassword = document.getElementById(role === "ADMIN_ROLE" ? "adminConfirmPassword" : "userConfirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phoneNumber: phone, companyId, password, role })
    })
    .then(response => {
        if (response.ok) alert("User added successfully!");
        else alert("Error adding user!");
    })
    .catch(error => console.error("Error:", error));
}
