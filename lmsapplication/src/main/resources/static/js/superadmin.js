document.addEventListener("DOMContentLoaded", () => {
   initEventListeners();
    
    let currentPath = window.location.pathname;
    if (currentPath.includes("dashboard")) {
        fetchCompanies(); // Load companies only on the dashboard
    } else if (currentPath.includes("leads")) {
        loadLeads(); // Load leads only on the leads page
    } else if (currentPath.includes("companies")) {
        fetchAndDisplayCompanies(); // Load companies only on the companies page
    }
});

function initEventListeners() {
    document.getElementById("lmsLogo")?.addEventListener("click", () => {
        window.location.href = "superadmin-dashboard";
    });
}

async function addCompany() {
    const fields = ["companyName", "companyAddress", "companyCinNumber", "companyContactPersonName", "companyContactPersonPhone", "companyContactPersonEmail"];
    const company = getFormData(fields);
    
    if (!company) return;
    if (!validateEmail(company.companyContactPersonEmail) || !validatePhone(company.companyContactPersonPhone)) return;
    
    await submitData("/companies", company, "Company added successfully");
}

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

async function addUser(role) {
    const fields = role === "ADMIN_ROLE" ? ["adminFullName", "adminEmail", "adminPhone", "adminCompany", "adminPassword", "adminConfirmPassword"] :
                                           ["userFullName", "userEmail", "userPhone", "userCompany", "userPassword", "userConfirmPassword"];
    const user = getFormData(fields);
    if (!user) return;
    if (!validateEmail(user.email) || !validatePhone(user.phone) || user.password !== user.confirmPassword) return alert("Passwords do not match");
    
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

async function addLead() {
    const user = await getLoggedInUser();
    if (!user) return alert("User not authenticated");
    
    const fields = ["leadName", "leadEmail", "leadPhone", "leadAddress"];
    const lead = getFormData(fields);
    if (!lead) return;
    if (!validateEmail(lead.leadEmail) || !validatePhone(lead.leadPhone)) return;
    
    lead.status = "New";
    lead.ownerUser = { id: user.id };
    lead.assignedUser = { id: user.id };
    lead.company = { companyId: user.company.companyId };
    lead.creationDate = new Date();
    lead.updationDate = new Date();
    
    await submitData("/leads", lead, "Lead added successfully!");
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
            <td>${lead.id}</td>
            <td>${lead.fullName}</td>
            <td>${lead.email}</td>
            <td>${lead.phone}</td>
            <td>${lead.company.name}</td>
            <td>
                <a href="/view-superadmin-lead/${lead.id}">View</a> |
                <a href="/edit-superadmin-lead/${lead.id}">Edit</a> |
                <a href="#" data-id="${lead.id}" onclick="deleteLead(this)">Delete</a>
            </td>
        </tr>
    `).join('');
}

async function deleteLead(element) {
    const leadId = element.dataset.id;
    if (confirm("Are you sure you want to delete this lead?")) {
        await fetch(`/leads/${leadId}`, { method: "DELETE" });
        alert("Lead deleted successfully");
        loadLeads();
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
