package in.lms.lmsapplication.model;

import jakarta.persistence.*;

@Entity
public class LoginUser {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true, nullable = false)
	private String email;
	@Column(unique = true, nullable = false)
	private String username;
	@Column(unique = true, nullable = false)
	private String phoneNumber;
	@Column(nullable = false)
	private String fullName;
	@Column(nullable = false)
	private String role;
	@Column(nullable = false)
	private String companyName;
	@Column(nullable = false)
	private String password;

	public LoginUser() {
	}

	public LoginUser(Long id, String email, String username, String phoneNumber, String fullName, String role,
			String companyName, String password) {
		this.id = id;
		this.email = email;
		this.username = username;
		this.phoneNumber = phoneNumber;
		this.fullName = fullName;
		this.role = role;
		this.companyName = companyName;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}
