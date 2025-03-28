package in.lms.lmsapplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/signup", "/css/**", "/images/**", "/js/**").permitAll()
                        .requestMatchers("/superadmin-dashboard", "/superadmin-**").hasRole("SUPERADMIN")
                        .requestMatchers("/admin-dashboard", "/admin-**").hasAnyRole("ADMIN", "SUPERADMIN")
                        .requestMatchers("/dashboard", "/user-**").hasAnyRole("USER", "ADMIN", "SUPERADMIN")
                        .anyRequest().authenticated())
                .formLogin(login -> login.loginPage("/login").successHandler(successHandler()).permitAll())
                .logout(logout -> logout.logoutUrl("/logout").logoutSuccessUrl("/"));

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return (request, response, authentication) -> {
            String role = authentication.getAuthorities().iterator().next().getAuthority();
            request.getSession().setAttribute("role", role);
            System.out.println("------------------------>>>>>>>>>>>>>"+role);
            if ("ROLE_SUPERADMIN".equals(role)) {
                response.sendRedirect("/superadmin-dashboard");
            } else if ("ROLE_ADMIN".equals(role)) {
                response.sendRedirect("/admin-dashboard");
            } else {
                response.sendRedirect("/user-dashboard");
            }
        };
    }
}
