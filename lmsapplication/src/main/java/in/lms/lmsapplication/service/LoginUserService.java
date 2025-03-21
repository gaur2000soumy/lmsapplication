package in.lms.lmsapplication.service;

import in.lms.lmsapplication.model.LoginUser;
import in.lms.lmsapplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginUserService {

    private final UserRepository userRepository;

    @Autowired
    public LoginUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Method to find a user by username or email
    public LoginUser findByUsernameOrEmail(String usernameOrEmail) {
        return userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
    }

    // Method to validate user login (checking password match)
    public boolean validateLogin(String usernameOrEmail, String password) {
        LoginUser user = findByUsernameOrEmail(usernameOrEmail);

        // Check if the user exists and if the password matches
        return user != null && user.getPassword().equals(password);
    }
}
