package in.lms.lmsapplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import in.lms.lmsapplication.model.LoginUser;
import in.lms.lmsapplication.repository.UserRepository;
import in.lms.lmsapplication.service.LoginUserService;

@Controller
class AuthController {
    @Autowired
    private UserRepository userRepository;

    private final LoginUserService loginUserService;

    @Autowired
    public AuthController(LoginUserService loginUserService) {
        this.loginUserService = loginUserService;
    }

    @GetMapping("/")
    public String welcome() {
        return "welcome";
    }

    @PostMapping("/signup")
    public String signup(@RequestParam String fullName, 
                         @RequestParam String email, 
                         @RequestParam String phone, 
                         @RequestParam String company, 
                         @RequestParam String username, 
                         @RequestParam String password, 
                         @RequestParam String confirmPassword) {
        
        if (!password.equals(confirmPassword)) {
            return "redirect:/signup?error=Passwords do not match";
        }

        LoginUser user = new LoginUser();
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPhoneNumber(phone);
        user.setCompanyName(company);
        user.setUsername(username);
        user.setPassword(password);  
        userRepository.save(user);

        return "redirect:/login";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/login")
    public String doLogin(@RequestParam String username, @RequestParam String password, Model model) {
        LoginUser user = userRepository.findByUsername(username);
        boolean isValid = loginUserService.validateLogin(username, password);

        if (isValid) {
            return "redirect:/dashboard";  // Redirect to dashboard if login is successful
        } else {
            model.addAttribute("error", "Invalid credentials, please try again.");
            return "login";  // Return to the login page if credentials are invalid
        }
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }
}
