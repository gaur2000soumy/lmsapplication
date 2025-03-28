package in.lms.lmsapplication.controller;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ser.std.ObjectArraySerializer;

import in.lms.lmsapplication.model.Company;
import in.lms.lmsapplication.model.LoginUser;
import in.lms.lmsapplication.service.LoginService;

@Controller
public class AuthController {

    private final LoginService loginUserService;

    @Autowired
    public AuthController(LoginService loginUserService) {
        this.loginUserService = loginUserService;
    }
    @PostMapping("/signup")
    public String signup(@RequestParam String fullName,
                         @RequestParam String email,
                         @RequestParam String phone,
                         @RequestParam Long companyId,
                         @RequestParam String role,
                         @RequestParam String password,
                         @RequestParam String confirmPassword) {

        System.out.println("Details----" + fullName + email + phone+ companyId+ role+ password+ confirmPassword);
        if (!password.equals(confirmPassword)) {
            return "redirect:/signup?error=Passwords do not match";
        }

        loginUserService.registerUser(fullName, email, phone, password, role, companyId);

        return "redirect:/login";
    }

    @GetMapping("/me")
    public ResponseEntity<LoginUser> getLoggedInUser() {
        LoginUser user = loginUserService.getLoggedInUser();      
        LoginUser proxy = new LoginUser();
        Company proxyCompany = new Company();
        proxyCompany.setCompanyId(user.getCompany().getCompanyId());
        proxy.setCompany(proxyCompany);
        proxy.setId(user.getId());
        if (Objects.nonNull(user)) {
            return ResponseEntity.ok(proxy);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
