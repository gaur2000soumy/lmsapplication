package in.lms.lmsapplication.dto;

import in.lms.lmsapplication.model.LoginUser;

public class UserDTO {
	
	private long id;
	private String fullName;
	private String phoneNumber;
	private String email;
	private long companyId;
	private String companyName;
	private String role;
	
	public UserDTO() {
		
	}
	public UserDTO(LoginUser user) {
		this.id = user.getId();
		this.fullName = user.getFullName();
		this.phoneNumber = user.getPhoneNumber();
		this.email = user.getEmail();
		this.companyId = user.getCompany().getCompanyId();
		this.companyName = user.getCompany().getCompanyName();
		this.role = user.getRole();
	}
	public UserDTO(long id, String fullName, String phoneNumber, String email, long companyId, String companyName, String role) {
		this.companyId = companyId;
		this.companyName = companyName;
		this.role = role;
		this.id = id;
		this.fullName = fullName;
		this.phoneNumber = phoneNumber;
		this.email = email;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String toString() {
		return "UserDTO [id=" + id + ", fullName=" + fullName + ", phoneNumber=" + phoneNumber + ", email=" + email
				+ ", companyId =" + companyId + ", companyName=" + companyName + ", role=" + role + "]";
	}
	
	public long getCompanyId() {
		return companyId;
	}
	public String getCompanyName() {
		return companyName;
	}		
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
}