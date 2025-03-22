package in.lms.lmsapplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import in.lms.lmsapplication.model.LoginUser;
import in.lms.lmsapplication.model.UserPrinciple;
import in.lms.lmsapplication.repository.UserRepository;

@Service
public class LoginService implements UserDetailsService {

	@Autowired
	private UserRepository userLoginRepo;
	
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		LoginUser user = userLoginRepo.findByUsernameOrEmail(username,username);
		if(user==null) {
			System.out.println("No users found!!");
			throw new UsernameNotFoundException(username);
		}
		return new UserPrinciple(user);
	}

}
