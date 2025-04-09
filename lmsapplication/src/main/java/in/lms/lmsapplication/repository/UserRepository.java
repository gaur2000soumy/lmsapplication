package in.lms.lmsapplication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.lms.lmsapplication.model.LoginUser;

public interface UserRepository extends JpaRepository<LoginUser, Long> {

	LoginUser findByEmail(String username);

	boolean existsByEmail(String email);

	List<LoginUser> findByRole(String role);
}
