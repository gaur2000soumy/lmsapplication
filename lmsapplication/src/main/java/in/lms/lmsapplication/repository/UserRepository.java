package in.lms.lmsapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import in.lms.lmsapplication.model.LoginUser;

public interface UserRepository extends JpaRepository<LoginUser, Long> {
	LoginUser findByUsername(String username);

	// Find a user by their email
	LoginUser findByEmail(String email);

	// Find a user by either username or email
	LoginUser findByUsernameOrEmail(String username, String email);

}
