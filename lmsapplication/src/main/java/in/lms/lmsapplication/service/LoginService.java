package in.lms.lmsapplication.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.lms.lmsapplication.dto.UserDTO;

import in.lms.lmsapplication.model.LoginUser;
import in.lms.lmsapplication.repository.CompanyRepository;
import in.lms.lmsapplication.repository.UserRepository;

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

    public LoginUser getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return userRepository.findByEmail(userDetails.getUsername());
        }
        return null;
    }
    
    public List<UserDTO> getAdmins() {
    	List<LoginUser> admins = userRepository.findByRole("ADMIN");
    	List<UserDTO> adminDTOs = admins.stream()
    	        .map(UserDTO::new).collect(Collectors.toList());
        return adminDTOs;
    }
    
    public boolean deleteAdmin(Long id) {
        if (userRepository.existsById(id)) {
        	userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean updateAdmin(Long id, LoginUser updatedAdmin) {
        Optional<LoginUser> existingAdmin = userRepository.findById(id);
        if (existingAdmin.isPresent()) {
            LoginUser admin = existingAdmin.get();
            admin.setFullName(updatedAdmin.getFullName());
            admin.setEmail(updatedAdmin.getEmail());
            admin.setPhoneNumber(updatedAdmin.getPhoneNumber());
            admin.setPassword(updatedAdmin.getPassword());  // Ensure proper password handling
            admin.setRole(updatedAdmin.getRole());
            userRepository.save(admin);
            return true;
        }
        return false;
    }

	public List<UserDTO> getUsers() {
		List<LoginUser> users = userRepository.findByRole("USER");
    	List<UserDTO> userDTOs = users.stream()
    	        .map(UserDTO::new).collect(Collectors.toList());
        return userDTOs;
	}

    public Optional<LoginUser> findById(Long id) {
        return userRepository.findById(id);
    }
}
