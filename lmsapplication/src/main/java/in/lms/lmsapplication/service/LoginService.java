package in.lms.lmsapplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import in.lms.lmsapplication.model.LoginUser;
import in.lms.lmsapplication.repository.UserRepository;

@Service
public class LoginService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		LoginUser user = userRepository.findByUsernameOrEmail(username,username);
		if(user==null) {
			System.out.println("No users found!!");
			throw new UsernameNotFoundException(username);
		}
		return User.builder()
				.username(user.getUsername())
				.password(user.getPassword())
				.roles(user.getRole()).build();
	}

}
