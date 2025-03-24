function addCompany() {
	const companyName = document.getElementById('companyName').value;
	const companyAddress = document.getElementById('companyAddress').value;
	const companyCinNumber = document.getElementById('companyCinNumber').value;
	const companyContactPersonName = document.getElementById('companyContactPersonName').value;
	const companyContactPersonPhone = document.getElementById('companyContactPersonPhone').value;
	const companyContactPersonEmail = document.getElementById('companyContactPersonEmail').value;

	
	if (!companyName || !companyAddress || !companyCinNumber || !companyContactPersonName || !companyContactPersonPhone || !companyContactPersonEmail) {
		alert("All fields are required.");
		return;
	}

	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailPattern.test(companyContactPersonEmail)) {
		alert("Please enter a valid email address.");
		return;
	}

	const phonePattern = /^[0-9]{10}$/;
	if (!phonePattern.test(companyContactPersonPhone)) {
		alert("Please enter a valid 10-digit phone number.");
		return; 
	}

	const company = {
		companyName: companyName,
		companyAddress: companyAddress,
		companyCinNumber: companyCinNumber,
		companyContactPersonName: companyContactPersonName,
		companyContactPersonPhone: companyContactPersonPhone,
		companyContactPersonEmail: companyContactPersonEmail
	};

	fetch('/companies', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
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
document.addEventListener("DOMContentLoaded", function() {
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
				option.value = company.companyId;
				option.textContent = company.companyName;
				console.log(company.companyId + '----' + company.companyName)
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
	let companyId = document.getElementById(role === "ADMIN_ROLE" ? "adminCompany" : "userCompany").value; // Get selected companyId
	let password = document.getElementById(role === "ADMIN_ROLE" ? "adminPassword" : "userPassword").value;
	let confirmPassword = document.getElementById(role === "ADMIN_ROLE" ? "adminConfirmPassword" : "userConfirmPassword").value;
	if (!companyId) {
		alert("Please select a company!");
		return;
	}
	if (!fullName || !email || !phone || !password || !confirmPassword) {
		alert("All fields are required!");
		return;
	}
	if (password !== confirmPassword) {
		alert("Passwords do not match!");
		return;
	}

	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailPattern.test(email)) {
		alert("Please enter a valid email address!");
		return;
	}

	const phonePattern = /^[0-9]{10}$/;
	if (!phonePattern.test(phone)) {
		alert("Please enter a valid 10-digit phone number!");
		return;
	}

	console.log("Selected Company ID:", companyId);

	fetch("/signup", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			fullName,
			email,
			phone,
			companyId, 
			role,
			password,
			confirmPassword
		})
	})
		.then(response => {
			if (response.ok) {
				alert("User added successfully!");
			} else {
				alert("Error adding user!");
			}
		})
		.catch(error => console.error("Error:", error));
}
