package in.lms.lmsapplication.dto;

public class UserDTO {
	
	private long id;
	private String email;
	
	public UserDTO() {
		
	}
	public UserDTO(long id, String email) {
		this.id = id;
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
	
	
}