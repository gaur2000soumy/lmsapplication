package in.lms.lmsapplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import in.lms.lmsapplication.service.LoginService;

@Controller
public class AuthController {

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
    public String signup(@RequestParam String fullName,
                         @RequestParam String email,
                         @RequestParam String phone,
                         @RequestParam Long company,
                         @RequestParam String role,
                         @RequestParam String password,
                         @RequestParam String confirmPassword) {

        if (!password.equals(confirmPassword)) {
            return "redirect:/signup?error=Passwords do not match";
        }

        loginUserService.registerUser(fullName, email, phone, password, role, company);

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
