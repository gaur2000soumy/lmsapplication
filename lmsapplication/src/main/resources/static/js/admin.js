/*----------------- On Page Reload -----------------*/

document.addEventListener("DOMContentLoaded", () => {
	initEventListeners();

	let currentPath = window.location.pathname;
	if (currentPath.includes("leads")) {
		loadLeads(); // Load leads only on the leads page
	} else if (currentPath.includes("users")) {
		loadUsers();
	}
});

function initEventListeners() {
	document.getElementById("lmsLogo")?.addEventListener("click", () => {
		window.location.href = "admin-dashboard";
	});
}

/*-------------------- Dashboard --------------------*/


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
function createUser() {
	return addUser("USER");
}
async function addUser(role) {
	const fields = ["userFullName", "userEmail", "userPhone", "userCompany", "userPassword", "userConfirmPassword"];
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

function loadUsers() {
    fetch('/users')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('userList');
            userList.innerHTML = ''; // Clear any existing content

            data.forEach(user => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.fullName}</td>
                    <td>${user.email}</td>
                    <td>${user.phoneNumber}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Edit</button>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                `;

                userList.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading users:', error));
}

function searchUsers() {
    const searchQuery = document.getElementById('searchUser').value.toLowerCase();
    const rows = document.querySelectorAll('#userList tr');

    rows.forEach(row => {
        const userId = row.cells[0].textContent.toLowerCase();
        const userName = row.cells[1].textContent.toLowerCase();

        if (userId.includes(searchQuery) || userName.includes(searchQuery)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function editUser(id) {
    window.location.href = `/edit-superadmin-user/${id}`; // Redirect to edit page with user ID
}

function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/users/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    alert('User deleted successfully');
                    loadUsers(); // Reload the users list after deletion
                } else {
                    alert('Failed to delete user');
                }
            })
            .catch(error => console.error('Error deleting user:', error));
    }
}
/*-------------------- View User --------------------*/
/*-------------------- Edit User --------------------*/





/*------------------- All Comments ------------------*/
/*------------------- Edit Comment ------------------*/
/*------------------- View Comment ------------------*/




/*------------------------ Help ---------------------*/




/*---------------------- Profile --------------------*/




