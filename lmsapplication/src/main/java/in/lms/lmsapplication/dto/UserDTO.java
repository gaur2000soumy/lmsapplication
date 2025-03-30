package in.lms.lmsapplication.dto;

import in.lms.lmsapplication.model.LoginUser;

public class UserDTO {
	
	private long id;
	private String fullName;
	private String phoneNumber;
	private String email;
	
	public UserDTO() {
		
	}
	public UserDTO(LoginUser user) {
		this.id = user.getId();
		this.fullName = user.getFullName();
		this.phoneNumber = user.getPassword();
		this.email = user.getEmail();
	}
	public UserDTO(long id, String fullName, String phoneNumber, String email) {
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
	
	
}