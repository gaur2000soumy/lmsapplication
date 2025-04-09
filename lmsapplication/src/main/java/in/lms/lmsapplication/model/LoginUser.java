package in.lms.lmsapplication.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class LoginUser implements UserDetails{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true, nullable = false)
	private String email;
	@Column(unique = true, nullable = false)
	private String phoneNumber;
	@Column(nullable = false)
	private String fullName;
	@Column(nullable = false)
	private String role;
	@Column(nullable = false)
	private String password;
	@ManyToOne
	@JoinColumn(name = "company_id", nullable = false)
    @JsonIgnoreProperties({"companyAddress", "companyCinNumber","companyContactPersonName", "companyContactPersonEmail","companyContactPersonPhone"})
	private Company company;

	public LoginUser() {
	}

	public LoginUser(Long id, String email, String phoneNumber, String fullName, String role, String password,
			Company company) {
		this.id = id;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.fullName = fullName;
		this.role = role;
		this.password = password;
		this.company = company;
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

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public String toString() {
		return "LoginUser [id=" + id + ", email=" + email + ", phoneNumber=" + phoneNumber + ", fullName=" + fullName
				+ ", role=" + role + ", password=" + password + ", company=" + company + "]";
	}

	

}
