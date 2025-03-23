package in.lms.lmsapplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import in.lms.lmsapplication.model.LoginUser;
import in.lms.lmsapplication.repository.UserRepository;
import in.lms.lmsapplication.service.LoginService;

@Controller
class AuthController {
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserRepository userRepository;

	private final LoginService loginUserService;

	@Autowired
	public AuthController(LoginService loginUserService) {
		this.loginUserService = loginUserService;
	}

	@GetMapping("/")
	public String welcome() {
		return "welcome";
	}

	@PostMapping("/signup")
	public String signup(@RequestParam String fullName, @RequestParam String email, @RequestParam String phone,
			@RequestParam Long company, @RequestParam String username, @RequestParam String password,
			@RequestParam String confirmPassword) {

		if (!password.equals(confirmPassword)) {
			return "redirect:/signup?error=Passwords do not match";
		}

		LoginUser user = new LoginUser();
		user.setFullName(fullName);
		user.setEmail(email);
		user.setPhoneNumber(phone);
		user.setCompanyId(company);
		user.setUsername(username);
		user.setPassword(passwordEncoder.encode(password));
		user.setRole("USER_ROLE");
		userRepository.save(user);

		return "redirect:/login";
	}

	@GetMapping("/login")
	public String login() {
		return "login";
	}

	@GetMapping("/dashboard")
	public String dashboard() {
		return "dashboard";
	}
}
