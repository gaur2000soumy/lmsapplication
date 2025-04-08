/*----------------- On Page Reload -----------------*/

document.addEventListener("DOMContentLoaded", () => {
	initEventListeners();

	let currentPath = window.location.pathname;
	if (currentPath.includes("dashboard")) {
		fetchCompanies(); // Load companies only on the dashboard
	} else if (currentPath.includes("superadmin-leads")) {
		loadLeads(); // Load leads only on the leads page
	} else if (currentPath.includes("companies")) {
		fetchAndDisplayCompanies(); // Load companies only on the companies page
	} else if (currentPath.includes("admins")) {
		loadAdmins();
	} else if (currentPath.includes("users")) {
		loadUsers();
	} else if (currentPath.includes("comments")) {
		loadComments();
	} 
	else if (currentPath.includes("superadmin-asssigned-leads")) {
		loadAssignedLeads();
	}else if (currentPath.includes("view-superadmin-lead")) {
		const leadId = currentPath.split("/").pop();
		loadLeadDetails(leadId);
	} else if (currentPath.includes("view-superadmin-user")) {
		const userId = currentPath.split("/").pop();
		loadUserDetails(userId);
	} else if (currentPath.includes("profile")) {
		fetch("/me")
			.then(response => response.json())
			.then(data => {
				document.getElementById("name").textContent = data.fullName;
				document.getElementById("role").textContent = data.role;
				document.getElementById("email").textContent = data.email;
				document.getElementById("phone").textContent = data.phoneNumber;
			})
			.catch(error => console.error("Error fetching user details:", error));
	}
	if (currentPath.includes("users")) {
		document.getElementById("searchUser").addEventListener("keyup", function(event) {
			if (event.key === "Enter") {
				searchUsers();
			}
		});
	}
	if (currentPath.includes("superadmin-leads")) {
		document.getElementById("searchLead").addEventListener("keyup", function(event) {
			if (event.key === "Enter") {
				searchLeads();
			}
		});
	}
	if (currentPath.includes("companies")) {
		document.getElementById("searchCompany").addEventListener("keyup", function(event) {
			if (event.key === "Enter") {
				searchCompany();
			}
		});
	}
	if (currentPath.includes("comments")) {
		document.getElementById("searchComments").addEventListener("keyup", function(event) {
			if (event.key === "Enter") {
				searchComments();
			}
		});
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
	const searchQuery = document.getElementById('searchLead').value.trim().toLowerCase();
	const rows = document.querySelectorAll("#leadList tr");
	let resultCount = 0;
	const resultMessage = document.getElementById("searchResultMessage");

	rows.forEach(row => {
		const leadId = row.cells[0].textContent.toLowerCase();
		const leadName = row.cells[1].textContent.toLowerCase();
		const leadEmail = row.cells[2].textContent.toLowerCase();
		const leadPhone = row.cells[3].textContent.toLowerCase().replace(/-/g, '');
		const leadStatus = row.cells[5].textContent.toLowerCase();

		if (leadId.includes(searchQuery) || leadName.includes(searchQuery) || leadPhone.includes(searchQuery) || leadEmail.includes(searchQuery) || leadStatus.includes(searchQuery)) {
			row.style.display = "";
			resultCount++;
		} else {
			row.style.display = "none";
		}
	});

	if (searchQuery.trim() === "") {
		resultMessage.style.display = "none"; // Hide message if input is empty
	} else {
		resultMessage.style.display = "block"; // Show message only when searching
		resultMessage.textContent = resultCount > 0 ? `${resultCount} result(s) found` : "No results found";
		resultMessage.style.color = resultCount > 0 ? "green" : "red";
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
			<td>${lead.status}</td>
            <td>
                <button onclick="viewLead(${lead.leadId})">View</button>
                <button onclick="editLead(${lead.leadId})">Edit</button>
                <button onclick="deleteLead(${lead.leadId})">Delete</button>
                <button onclick="addComment(${lead.leadId})">Add Comment</button>
            </td>
        </tr>
    `).join('');
}

function viewLead(id) {
	window.location.href = `/view-superadmin-lead/${id}`;
}

function editLead(id) {
	window.location.href = `/edit-superadmin-lead/${id}`;
}

function addComment(id) {
	window.location.href = `/add-superadmin-comment/${id}`;
}

function deleteLead(id) {
	if (confirm("Are you sure you want to delete this lead?")) {
		fetch(`/leads/${id}`, { method: "DELETE" })
			.then(response => {
				if (response.ok) {
					alert("Lead deleted successfully");
					loadLeads();
				} else {
					alert("Error deleting lead");
				}
			})
			.catch(error => console.error("Error:", error));
	}
}
async function loadLeadDetails(leadId) {
	try {
		const leadRes = await fetch(`/leads/${leadId}`);
		const lead = await leadRes.json();
		displayLead(lead);

		const commentRes = await fetch(`/comments/lead/${leadId}`);
		const comments = await commentRes.json();
		displayComments(comments);

		document.getElementById("editLeadBtn").onclick = () =>
			window.location.href = `/edit-superadmin-lead/${leadId}`;

		document.getElementById("deleteLeadBtn").onclick = async () => {
			if (confirm("Are you sure?")) {
				await fetch(`/leads/${leadId}`, { method: "DELETE" });
				alert("Lead deleted.");
				window.location.href = "/superadmin-leads";
			}
		};

		document.getElementById("addCommentBtn").onclick = () =>
			window.location.href = `/add-superadmin-comment/${leadId}`;
	} catch (e) {
		console.error("Error loading lead or comments", e);
	}
}

function displayLead(lead) {
	const div = document.getElementById("leadDetails");
	if (!div) return;
	div.innerHTML = `
		<p><strong>ID:</strong> ${lead.leadId}</p>
		<p><strong>Name:</strong> ${lead.fullName}</p>
		<p><strong>Email:</strong> ${lead.email}</p>
		<p><strong>Phone:</strong> ${lead.phoneNo}</p>
		<p><strong>Status:</strong> ${lead.status}</p>
		<p><strong>Company:</strong> ${lead.company.companyName}</p>
		<p><strong>Created By:</strong> ${lead.ownerUser.email}</p>
		<p><strong>Assigned To:</strong> ${lead.assignedUser.email}</p>
	`;
}


function displayComments(comments) {
	const list = document.getElementById("leadCommentList");
	if (!list) return;

	comments.forEach(comment => {
		const row = document.createElement('tr');

		row.innerHTML = `
					<td>${comment.commentId}</td>
					<td style="text-align: left;">${comment.user.email}</td>
					<td>${comment.lead.leadId}</td>
					<td>${comment.status}</td>
					<td>${comment.creationDate}</td>
					<td>${comment.description}</td>
					<td>
						<button onclick="editComment(${comment.commentId})">Edit</button>
						<button onclick="deleteComment(${comment.commentId})">Delete</button>
					</td>`;
		list.appendChild(row);
	});
}



/*------------------- Owned Leads -------------------*/

async function loadOwnLeads() {
	try {
		const response = await fetch("/leads/own-leads");
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
			<td>${lead.status}</td>
            <td>
                <button onclick="viewLead(${lead.leadId})">View</button>
                <button onclick="editLead(${lead.leadId})">Edit</button>
                <button onclick="deleteLead(${lead.leadId})">Delete</button>
                <button onclick="addComment(${lead.leadId})">Add Comment</button>
            </td>
        </tr>
    `).join('');
}
/*------------------ Assigned Leads -----------------*/
async function loadAssignedLeads() {
	try {
		const user = await getLoggedInUser();

		const response = await fetch(`/leads/assigned/${user.id}`);
		const data = await response.json();
		displayAssignedLeads(data);
	} catch (error) {
		console.error("Error loading leads:", error);
	}
}
function displayAssignedLeads(leads) {
	document.getElementById("assignedLeadList").innerHTML = leads.map(lead => `
        <tr>
            <td>${lead.leadId}</td>
            <td>${lead.fullName}</td>
            <td>${lead.email}</td>
            <td>${lead.phoneNo}</td>
            <td>${lead.company.companyName}</td>
			<td>${lead.status}</td>
            <td>
                <button onclick="viewLead(${lead.leadId})">View</button>
                <button onclick="editLead(${lead.leadId})">Edit</button>
                <button onclick="deleteLead(${lead.leadId})">Delete</button>
                <button onclick="addComment(${lead.leadId})">Add Comment</button>
            </td>
        </tr>
    `).join('');
}
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
						<button onclick="viewUser(${user.id})">View</button>
                        <button onclick="editUser(${user.id})">Edit</button>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                `;

				userList.appendChild(row);
			});
		})
		.catch(error => console.error('Error loading users:', error));
}
async function loadUserDetails(userId) {
	try {
		const userRes = await fetch(`/users/${userId}`);
		const user = await userRes.json();
		displayUser(user);

		const commentRes = await fetch(`/comments/${userId}`);
		const comments = await commentRes.json();
		displayUserComments(comments);

		document.getElementById("editUserBtn").onclick = () =>
			window.location.href = `/edit-superadmin-user/${userId}`;

		document.getElementById("deleteUserBtn").onclick = async () => {
			if (confirm("Are you sure?")) {
				await fetch(`/admins/${userId}`, { method: "DELETE" });
				alert("User deleted.");
				window.location.href = "/superadmin-users";
			}
		};

	} catch (e) {
		console.error("Error loading User or comments", e);
	}
}

function displayUser(user) {
	const div = document.getElementById("userDetails");
	if (!div) return;
	div.innerHTML = `
		<p><strong>Name:</strong> ${user.fullName}</p>
		<p><strong>Email:</strong> ${user.email}</p>
		<p><strong>Phone:</strong> ${user.phoneNumber}</p>
		<p><strong>Company:</strong> ${user.companyName}</p>
	`;
}

function displayUserComments(comments) {
	const list = document.getElementById("leadCommentList");
	if (!list) return;

	comments.forEach(comment => {
		const row = document.createElement('tr');

		row.innerHTML = `
					<td>${comment.commentId}</td>
					<td style="text-align: left;">${comment.user.email}</td>
					<td>${comment.lead.leadId}</td>
					<td>${comment.status}</td>
					<td>${comment.creationDate}</td>
					<td>${comment.description}</td>
					<td>
						<button onclick="editComment(${comment.commentId})">Edit</button>
						<button onclick="deleteComment(${comment.commentId})">Delete</button>
					</td>`;
		list.appendChild(row);
	});
}
function searchUsers() {
	const searchQuery = document.getElementById("searchUser").value.trim().toLowerCase();
	const rows = document.querySelectorAll("#userList tr");
	let resultCount = 0;
	const resultMessage = document.getElementById("searchResultMessage");

	rows.forEach(row => {
		const userId = row.cells[0].textContent.toLowerCase();
		const userName = row.cells[1].textContent.toLowerCase();
		const userEmail = row.cells[2].textContent.toLowerCase();
		const userPhone = row.cells[3].textContent.toLowerCase().replace(/-/g, '');

		if (userId.includes(searchQuery) || userName.includes(searchQuery) || userPhone.includes(searchQuery) || userEmail.includes(searchQuery)) {
			row.style.display = "";
			resultCount++;
		} else {
			row.style.display = "none";
		}
	});

	if (searchQuery.trim() === "") {
		resultMessage.style.display = "none"; // Hide message if input is empty
	} else {
		resultMessage.style.display = "block"; // Show message only when searching
		resultMessage.textContent = resultCount > 0 ? `${resultCount} result(s) found` : "No results found";
		resultMessage.style.color = resultCount > 0 ? "green" : "red";
	}
}
function viewUser(userId) {
	window.location.href = `/view-superadmin-user/${userId}`;
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


function loadComments() {
	fetch('/comments')
		.then(response => response.json())
		.then(data => {
			const userList = document.getElementById('commentList');
			userList.innerHTML = ''; // Clear any existing content

			data.forEach(comment => {
				const row = document.createElement('tr');
				const formattedDate = new Date(comment.creationDate).toLocaleString('en-GB', {
					day: '2-digit',
					month: 'short',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					hour12: true
				});
				row.innerHTML = `
                    <td>${comment.commentId}</td>
                    <td style="text-align: left;">${comment.user.email}</td>
                    <td>${comment.lead.leadId}</td>
                    <td>${comment.status}</td>
                    <td>${formattedDate}</td>
                    <td>${comment.description}</td>
                    <td>
                        <button onclick="editComment(${comment.commentId})">Edit</button>
                        <button onclick="deleteComment(${comment.commentId})">Delete</button>
                    </td>
                `;

				commentList.appendChild(row);
			});
		})
		.catch(error => console.error('Error loading comments:', error));
}


function searchComments() {
	const searchQuery = document.getElementById("searchComments").value.trim().toLowerCase();
	const rows = document.querySelectorAll("#commentList tr");
	let resultCount = 0;
	const resultMessage = document.getElementById("searchResultMessage");

	rows.forEach(row => {
		const commentId = row.cells[0].textContent.toLowerCase();
		const userName = row.cells[1].textContent.toLowerCase();
		const leadId = row.cells[2].textContent.toLowerCase();
		const status = row.cells[3].textContent.toLowerCase();

		if (commentId.includes(searchQuery) || userName.includes(searchQuery) || leadId.includes(searchQuery) || status.includes(searchQuery)) {
			row.style.display = "";
			resultCount++;
		} else {
			row.style.display = "none";
		}
	});

	if (searchQuery.trim() === "") {
		resultMessage.style.display = "none"; // Hide message if input is empty
	} else {
		resultMessage.style.display = "block"; // Show message only when searching
		resultMessage.textContent = resultCount > 0 ? `${resultCount} result(s) found` : "No results found";
		resultMessage.style.color = resultCount > 0 ? "green" : "red";
	}
}

function editComment(id) {
	window.location.href = `/edit-superadmin-comment/${id}`; // Redirect to edit page with user ID
}

function deleteComment(id) {
	if (confirm('Are you sure you want to delete this Comment?')) {
		fetch(`/comments/${id}`, {
			method: 'DELETE',
		})
			.then(response => {
				if (response.ok) {
					alert('Comment deleted successfully');
					loadComments(); // Reload the users list after deletion
				} else {
					alert('Failed to delete Comment');
				}
			})
			.catch(error => console.error('Error deleting user:', error));
	}
}

/*------------------- Edit Comment ------------------*/
/*------------------- View Comment ------------------*/
/*------------------- All Companies -----------------*/

async function searchCompany() {
	const searchQuery = document.getElementById('searchCompany').value.trim().toLowerCase();
	const rows = document.querySelectorAll("#companyList tr");
	let resultCount = 0;
	const resultMessage = document.getElementById("searchResultMessage");

	rows.forEach(row => {
		const companyId = row.cells[0].textContent.toLowerCase();
		const companyName = row.cells[1].textContent.toLowerCase();
		const companyEmail = row.cells[2].textContent.toLowerCase();
		const companyPhone = row.cells[3].textContent.toLowerCase().replace(/-/g, '');

		if (companyId.includes(searchQuery) || companyName.includes(searchQuery) || companyPhone.includes(searchQuery)) {
			row.style.display = "";
			resultCount++;
		} else {
			row.style.display = "none";
		}
	});

	if (searchQuery.trim() === "") {
		resultMessage.style.display = "none"; // Hide message if input is empty
	} else {
		resultMessage.style.display = "block"; // Show message only when searching
		resultMessage.textContent = resultCount > 0 ? `${resultCount} result(s) found` : "No results found";
		resultMessage.style.color = resultCount > 0 ? "green" : "red";
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
			<td>${company.companyContactPersonEmail}</td>
			<td>${company.companyContactPersonPhone}</td>
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

function showRequests(type) {
	const tabs = document.querySelectorAll('.tabs button');
	const lists = document.querySelectorAll('.request-list');

	tabs.forEach(tab => tab.classList.remove('active'));
	lists.forEach(list => list.classList.remove('active'));

	document.querySelector('.tabs button[onclick="showRequests(\'' + type + '\')"]').classList.add('active');
	document.getElementById(type).classList.add('active');
}

function addHelpRequest() {
	const fullName = document.getElementById('fullName').value;
	const email = document.getElementById('email').value;
	const phoneNo = document.getElementById('phoneNo').value;
	const subject = document.getElementById('subject').value;
	const note = document.getElementById('note').value;

	if (!fullName || !email || !phoneNo || !subject || !note) {
		alert("Please fill in all fields.");
		return;
	}

	alert("Help request created successfully!");
	document.getElementById('fullName').value = '';
	document.getElementById('email').value = '';
	document.getElementById('phoneNo').value = '';
	document.getElementById('subject').value = '';
	document.getElementById('note').value = '';
}



/*---------------------- Profile --------------------*/




