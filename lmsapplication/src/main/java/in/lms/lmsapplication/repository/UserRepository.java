package in.lms.lmsapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.lms.lmsapplication.model.LoginUser;

public interface UserRepository extends JpaRepository<LoginUser, Long> {

	LoginUser findByUsernameOrEmail(String usernameOrEmail, String usernameOrEmail2);

}
