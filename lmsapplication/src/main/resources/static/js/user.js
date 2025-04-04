
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
				adminCompanySelect.appendChild(option.cloneNode(true));
				userCompanySelect.appendChild(option);
			});
		})
		.catch(error => console.error("Error fetching companies:", error));
}
function fetchAndDisplayCompanies() {
	fetch("/companies")
		.then(response => response.json())
		.then(data => {
			displayCompanies(data);
		})
		.catch(error => console.error("Error fetching companies for table:", error));
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
async function getLoggedInUser() {
	try {
		const response = await fetch('/me', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});

		if (!response.ok) {
			throw new Error("User not authenticated");
		}
		const user = await response.json();
		return {
			id: user.id,
			companyId: user.company.companyId
		};
	} catch (error) {
		console.error("Error fetching logged-in user:", error);
		return null;
	}
}
async function addLead() {
	const user = await getLoggedInUser();
	if (!user) {
		alert("User not authenticated");
		return;
	}
	const requiredFields = ['leadName', 'leadEmail', 'leadPhone', 'leadAddress'];
	const missingFields = requiredFields.filter(id => !document.getElementById(id)?.value.trim());

	if (missingFields.length > 0) {
		alert("Full Name, Email, Phone Number, and Address are required.");
		return;
	}

	const fullName = document.getElementById('leadName').value.trim();
	const email = document.getElementById('leadEmail').value.trim();
	const phoneNo = document.getElementById('leadPhone').value.trim();
	const address = document.getElementById('leadAddress').value.trim();
	const altPhone = document.getElementById('leadAltPhone')?.value.trim() || null;
	const note = document.getElementById('leadNote')?.value.trim() || null;
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailPattern.test(email)) {
		alert("Please enter a valid email address.");
		return;
	}

	const phonePattern = /^[0-9]{10}$/;
	if (!phonePattern.test(phoneNo)) {
		alert("Please enter a valid 10-digit phone number.");
		return;
	}

	if (altPhone && !phonePattern.test(altPhone)) {
		alert("Alternate phone number must be a valid 10-digit number.");
		return;
	}

	const lead = {
		fullName: fullName,
		email: email,
		phoneNo: phoneNo,
		altPhone: altPhone || null,
		address: address,
		status: "New",
		note: note,
		ownerUser: { id: user.id },
		assignedUser: { id: user.id },
		company: { companyId: user.companyId },
		creationDate: new Date(),
		updationDate: new Date()
	};
	try {
		const response = await fetch('/leads', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(lead)
		});
		if (response.ok) {
			alert("Lead added successfully!");
			location.reload();
		} else {
			alert("Failed to add lead. Please try again.");
		}
	} catch (error) {
		console.error("Error adding lead:", error);
		alert("An error occurred while adding the lead.");
	}
}





