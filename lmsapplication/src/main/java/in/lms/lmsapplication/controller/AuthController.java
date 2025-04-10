package in.lms.lmsapplication.controller;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import in.lms.lmsapplication.dto.UserDTO;
import in.lms.lmsapplication.model.Company;
import in.lms.lmsapplication.model.LoginUser;
import in.lms.lmsapplication.service.LoginService;

@RestController
public class AuthController {

	private final LoginService loginUserService;

	public AuthController(LoginService loginUserService) {
		this.loginUserService = loginUserService;
	}

	@PostMapping("/signup")
	public ResponseEntity<String> signup(@RequestBody Map<String, Object> signupRequest) {

		String fullName = (String) signupRequest.get("userFullName");
		String email = (String) signupRequest.get("userEmail");
		String phone = (String) signupRequest.get("userPhone");
		Long companyId = Long.valueOf(String.valueOf(signupRequest.get("userCompany")));
		String role = (String) signupRequest.get("role");
		String password = (String) signupRequest.get("userPassword");

		try {
			loginUserService.registerUser(fullName, email, phone, password, role, companyId);
			return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error during signup: " + e.getMessage());
		}
	}

	@GetMapping("/me")
	public ResponseEntity<LoginUser> getLoggedInUser() {
		LoginUser user = loginUserService.getLoggedInUser();

		if (Objects.isNull(user)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		LoginUser proxy = new LoginUser();
		Company proxyCompany = new Company();
		proxyCompany.setCompanyName(user.getCompany().getCompanyName());
		proxyCompany.setCompanyId(user.getCompany().getCompanyId());
		proxy.setCompany(proxyCompany);
		proxy.setId(user.getId());
		proxy.setPhoneNumber(user.getPhoneNumber());
		proxy.setEmail(user.getEmail());
		proxy.setRole(user.getRole());
		proxy.setFullName(user.getFullName());

		return ResponseEntity.ok(proxy);
	}

	@GetMapping("/admins")
	public ResponseEntity<List<UserDTO>> getAdmins() {
		List<UserDTO> admins = loginUserService.getAdmins();
		return ResponseEntity.ok(admins);
	}

	@GetMapping("/users")
	public ResponseEntity<List<UserDTO>> getUsers() {
		List<UserDTO> admins = loginUserService.getUsers();
		return ResponseEntity.ok(admins);
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
		LoginUser user = loginUserService.getUserById(id);
		if (Objects.nonNull(user)) {
			UserDTO userDTO = new UserDTO(user);
			return ResponseEntity.ok(userDTO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/admins/{id}")
	public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {
		try {
			boolean deleted = loginUserService.deleteAdmin(id);
			if (deleted) {
				return ResponseEntity.ok("Admin deleted successfully");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error deleting admin: " + e.getMessage());
		}
	}

	@PutMapping("/admins/{id}")
	public ResponseEntity<String> editAdmin(@PathVariable Long id, @RequestBody LoginUser updatedAdmin) {
		try {
			boolean updated = loginUserService.updateAdmin(id, updatedAdmin);
			if (updated) {
				return ResponseEntity.ok("Admin updated successfully");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error updating admin: " + e.getMessage());
		}
	}

	@PutMapping("/users/{userId}")
	public ResponseEntity<String> editUser(@PathVariable Long userId, @RequestBody LoginUser updatedUser) {
		try {
			boolean updated = loginUserService.updateUser(userId, updatedUser);
			if (updated) {
				return ResponseEntity.ok("User updated successfully");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error updating user: " + e.getMessage());
		}
	}
}
