/*----------------- On Page Reload -----------------*/

document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();

  let currentPath = window.location.pathname;
  if (currentPath.includes("dashboard")) {
  } else if (currentPath.includes("leads")) {
  } else if (currentPath.includes("profile")) {
    fetch("/me")
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("name").textContent = data.fullName;
        document.getElementById("role").textContent = data.role;
        document.getElementById("email").textContent = data.email;
        document.getElementById("phone").textContent = data.phoneNumber;
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }
  if (currentPath.includes("leads")) {
    document
      .getElementById("searchLead")
      .addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          searchLeads();
        }
      });
  }
});

function initEventListeners() {
  document.getElementById("lmsLogo")?.addEventListener("click", () => {
    window.location.href = "user-dashboard";
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
  console.log(JSON.stringify(lead));
  await submitData("/leads", lead, "Lead added successfully!");
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
  return (
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ||
    (alert("Invalid email"), false)
  );
}

function validatePhone(phone) {
  return /^[0-9]{10}$/.test(phone) || (alert("Invalid phone number"), false);
}

async function submitData(url, data, successMessage) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
  const searchQuery = document
    .getElementById("searchLead")
    .value.trim()
    .toLowerCase();
  const rows = document.querySelectorAll("#leadList tr");
  let resultCount = 0;
  const resultMessage = document.getElementById("searchResultMessage");

  rows.forEach((row) => {
    const leadId = row.cells[0].textContent.toLowerCase();
    const leadName = row.cells[1].textContent.toLowerCase();
    const leadEmail = row.cells[2].textContent.toLowerCase();
    const leadPhone = row.cells[3].textContent.toLowerCase().replace(/-/g, "");
    const leadStatus = row.cells[5].textContent.toLowerCase();

    if (
      leadId.includes(searchQuery) ||
      leadName.includes(searchQuery) ||
      leadPhone.includes(searchQuery) ||
      leadEmail.includes(searchQuery) ||
      leadStatus.includes(searchQuery)
    ) {
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
    resultMessage.textContent =
      resultCount > 0 ? `${resultCount} result(s) found` : "No results found";
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
  document.getElementById("leadList").innerHTML = leads
    .map(
      (lead) => `
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
    `
    )
    .join("");
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
      .then((response) => {
        if (response.ok) {
          alert("Lead deleted successfully");
          loadLeads();
        } else {
          alert("Error deleting lead");
        }
      })
      .catch((error) => console.error("Error:", error));
  }
}

/*------------------- Owned Leads -------------------*/
/*------------------ Assigned Leads -----------------*/
/*-------------------- View Lead --------------------*/
/*-------------------- Edit Lead --------------------*/

/*------------------- All Comments ------------------*/
/*------------------- Edit Comment ------------------*/
/*------------------- View Comment ------------------*/

/*------------------------ Help ---------------------*/

/*---------------------- Profile --------------------*/
