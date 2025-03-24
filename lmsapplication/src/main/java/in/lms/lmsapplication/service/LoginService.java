package in.lms.lmsapplication.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.lms.lmsapplication.model.LoginUser;
import in.lms.lmsapplication.repository.CompanyRepository;
import in.lms.lmsapplication.repository.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class LoginService implements UserDetailsService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginService(UserRepository userRepository, PasswordEncoder passwordEncoder, CompanyRepository companyRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.companyRepository = companyRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LoginUser user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("No user found with email: " + username);
        }
        return User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }
  
    public LoginUser registerUser(String fullName, String email, String phone, String password, String role, Long company) {

    	LoginUser user = new LoginUser();
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPhoneNumber(phone);
        user.setPassword(passwordEncoder.encode(password));
        if(null==role) {
        	role="USER_ROLE";
        }
        user.setRole(role);
        user.setCompany(companyRepository.findById(company).get());
        return userRepository.save(user);
    }
}
