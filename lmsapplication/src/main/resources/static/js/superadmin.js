/*----------------- On Page Reload -----------------*/

document.addEventListener("DOMContentLoaded", () => {
	initEventListeners();

	let currentPath = window.location.pathname;
	if (currentPath.includes("dashboard")) {
		fetchCompanies(); // Load companies only on the dashboard
	} else if (currentPath.includes("leads")) {
		loadLeads(); // Load leads only on the leads page
	} else if (currentPath.includes("companies")) {
		fetchAndDisplayCompanies(); // Load companies only on the companies page
	} else if (currentPath.includes("admins")) {
		loadAdmins();
	}
});

function initEventListeners() {
	document.getElementById("lmsLogo")?.addEventListener("click", () => {
		window.location.href = "superadmin-dashboard";
	});
}

/*-------------------- Dashboard --------------------*/

async function fetchCompanies() {
	try {
		const response = await fetch("/companies");
		const data = await response.json();
		populateCompanyDropdowns(data);
	} catch (error) {
		console.error("Error fetching companies:", error);
	}
}
function populateCompanyDropdowns(companies) {
	const adminCompanySelect = document.getElementById("adminCompany");
	const userCompanySelect = document.getElementById("userCompany");

	companies.forEach(company => {
		const option = new Option(company.companyName, company.companyId);
		adminCompanySelect?.appendChild(option.cloneNode(true));
		userCompanySelect?.appendChild(option);
	});
}
async function addLead() {
	const user = await getLoggedInUser();
	if (!user) return alert("User not authenticated");

	const fields = ["fullName", "email", "phoneNo", "address"];
	const lead = getFormData(fields);
	if (!lead) return;
	if (!validateEmail(lead.email) || !validatePhone(lead.phoneNo)) return;
	
	lead.status = "New";
	lead.ownerUser = { id: user.id };
	lead.assignedUser = { id: user.id };
	lead.company = { companyId: user.company.companyId };
	lead.creationDate = new Date();
	lead.updationDate = new Date();
	console.log(JSON.stringify(lead))
	await submitData("/leads", lead, "Lead added successfully!");
}


async function addCompany() {
	const fields = ["companyName", "companyAddress", "companyCinNumber", "companyContactPersonName", "companyContactPersonPhone", "companyContactPersonEmail"];
	const company = getFormData(fields);

	if (!company) return;
	if (!validateEmail(company.companyContactPersonEmail) || !validatePhone(company.companyContactPersonPhone)) return;

	await submitData("/companies", company, "Company added successfully");
}
function addAdmin() {
	return addUser("ADMIN");
}
function createUser() {
	return addUser("USER");
}
async function addUser(role) {
	const fields = role === "ADMIN" ? ["adminFullName", "adminEmail", "adminPhone", "adminCompany", "adminPassword", "adminConfirmPassword"] :
		["userFullName", "userEmail", "userPhone", "userCompany", "userPassword", "userConfirmPassword"];
	const user = getFormData(fields);
	if (!user) return;
	if (!validateEmail(user.userEmail) || !validatePhone(user.userPhone) || user.userPassword !== user.userConfirmPassword) return alert("Passwords do not match");

	user.role = role;
	await submitData("/signup", user, "User added successfully!");
}

async function getLoggedInUser() {
	try {
		const response = await fetch("/me");
		if (!response.ok) throw new Error("User not authenticated");
		return await response.json();
	} catch (error) {
		console.error("Error fetching logged-in user:", error);
		return null;
	}
}

function getFormData(fields) {
	const data = {};
	for (let field of fields) {
		const value = document.getElementById(field)?.value.trim();
		if (!value) {
			alert("All fields are required");
			return null;
		}
		data[field] = value;
	}
	return data;
}

function validateEmail(email) {
	return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) || (alert("Invalid email"), false);
}

function validatePhone(phone) {
	return /^[0-9]{10}$/.test(phone) || (alert("Invalid phone number"), false);
}

async function submitData(url, data, successMessage) {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});
		if (response.ok) {
			alert(successMessage);
			location.reload();
		} else {
			alert("Operation failed");
		}
	} catch (error) {
		console.error("Error submitting data:", error);
	}
}
/*-------------------- All Leads --------------------*/

async function searchLeads() {
    const searchQuery = document.getElementById('searchLead').value.trim();
    if (!searchQuery) {
		loadLeads();
        return;
    }
    try {
        const response = await fetch(`/leads/search?query=${searchQuery}`);
        if (!response.ok) {
            alert("Error fetching search results.");
            return;
        }
        const leads = await response.json();
        displayLeads(leads);
    } catch (error) {
        console.error('Error searching Leads:', error);
    }
}

async function loadLeads() {
	try {
		const response = await fetch("/leads");
		const data = await response.json();
		displayLeads(data);
	} catch (error) {
		console.error("Error loading leads:", error);
	}
}

function displayLeads(leads) {
	document.getElementById("leadList").innerHTML = leads.map(lead => `
        <tr>
            <td>${lead.leadId}</td>
            <td>${lead.fullName}</td>
            <td>${lead.email}</td>
            <td>${lead.phoneNo}</td>
            <td>${lead.company.companyName}</td>
            <td>
                <a href="/view-superadmin-lead/${lead.leadId}">View</a> |
                <a href="/edit-superadmin-lead/${lead.leadId}">Edit</a> |
                <a href="#" data-id="${lead.leadId}" onclick="deleteLead(this)">Delete</a>
            </td>
        </tr>
    `).join('');
}

async function deleteLead(leadId) {
	if (confirm("Are you sure you want to delete this lead?")) {
		await fetch(`/leads/${leadId}`, { method: "DELETE" });
		alert("Lead deleted successfully");
		loadLeads();
	}
}


/*------------------- Owned Leads -------------------*/
/*------------------ Assigned Leads -----------------*/
/*-------------------- View Lead --------------------*/
/*-------------------- Edit Lead --------------------*/
/*-------------------- All Users --------------------*/
/*-------------------- View User --------------------*/
/*-------------------- Edit User --------------------*/
/*-------------------- All Admins -------------------*/

function loadAdmins() {
	fetch('/admins')
		.then(response => response.json())
		.then(data => {
			const adminList = document.getElementById('adminList');
			adminList.innerHTML = ''; // Clear any existing content

			data.forEach(admin => {
				const row = document.createElement('tr');

				row.innerHTML = `
                    <td>${admin.id}</td>
                    <td>${admin.fullName}</td>
                    <td>${admin.email}</td>
                    <td>${admin.phoneNumber}</td>
                    <td>
                        <button onclick="editAdmin(${admin.id})">Edit</button>
                        <button onclick="deleteAdmin(${admin.id})">Delete</button>
                    </td>
                `;

				adminList.appendChild(row);
			});
		})
		.catch(error => console.error('Error loading admins:', error));
}

function searchAdmins() {
	const searchQuery = document.getElementById('searchAdmin').value.toLowerCase();
	const rows = document.querySelectorAll('#adminList tr');

	rows.forEach(row => {
		const adminId = row.cells[0].textContent.toLowerCase();
		const adminName = row.cells[1].textContent.toLowerCase();

		if (adminId.includes(searchQuery) || adminName.includes(searchQuery)) {
			row.style.display = '';
		} else {
			row.style.display = 'none';
		}
	});
}

function editAdmin(id) {
	window.location.href = `/edit-superadmin-admin/${id}`; // Redirect to edit page with admin ID
}

function deleteAdmin(id) {
	if (confirm('Are you sure you want to delete this admin?')) {
		fetch(`/admins/${id}`, {
			method: 'DELETE',
		})
			.then(response => {
				if (response.ok) {
					alert('Admin deleted successfully');
					loadAdmins(); // Reload the admins list after deletion
				} else {
					alert('Failed to delete admin');
				}
			})
			.catch(error => console.error('Error deleting admin:', error));
	}


}
/*-------------------- View Admin -------------------*/
/*-------------------- Edit Admin -------------------*/
/*------------------- All Comments ------------------*/
/*------------------- Edit Comment ------------------*/
/*------------------- View Comment ------------------*/
/*------------------- All Companies -----------------*/

async function searchCompanies() {
    const searchQuery = document.getElementById('searchCompany').value.trim();
    if (!searchQuery) {
		fetchAndDisplayCompanies();
        return;
    }
    try {
        const response = await fetch(`/companies/search?query=${searchQuery}`);
        if (!response.ok) {
            alert("Error fetching search results.");
            return;
        }
        const companies = await response.json();
        displayCompanies(companies);
    } catch (error) {
        console.error('Error searching companies:', error);
    }
}

async function fetchAndDisplayCompanies() {
	try {
		const response = await fetch("/companies");
		const data = await response.json();
		displayCompanies(data);
	} catch (error) {
		console.error("Error fetching companies for table:", error);
	}
}

function displayCompanies(companies) {
	const tableBody = document.getElementById("companyList");
	tableBody.innerHTML = companies.map(company => `
        <tr>
            <td>${company.companyId}</td>
            <td>${company.companyName}</td>
            <td>${company.companyAddress}</td>
            <td>${company.companyContactPersonName}</td>
            <td>
                <button onclick="viewCompany(${company.companyId})">View</button>
                <button onclick="editCompany(${company.companyId})">Edit</button>
                <button onclick="deleteCompany(${company.companyId})">Delete</button>
            </td>
        </tr>
    `).join('');
}

async function deleteCompany(id) {
	if (confirm("Are you sure you want to delete this company?")) {
		await fetch(`/companies/${id}`, { method: "DELETE" });
		alert("Company deleted successfully.");
		fetchAndDisplayCompanies();
	}
}
/*-------------------- View Company -----------------*/





/*-------------------- Edit Company -----------------*/




/*------------------------ Help ---------------------*/




/*---------------------- Profile --------------------*/




