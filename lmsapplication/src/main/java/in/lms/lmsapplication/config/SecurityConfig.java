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
                        .requestMatchers("/", "/signup", "/css/**", "/images/**").permitAll()
                        .requestMatchers(
                                "/user-dashboard", "/user-profile", "/user-help", "/user-leads",
                                "/user-assigned-leads", "/user-comments", "/user-owned-leads",
                                "/edit-user-lead", "/edit-user-comment", "/view-user-lead", "/view-user-comment"
                        ).hasRole("USER_ROLE")
                        .requestMatchers(
                                "/admin-dashboard", "/admin-profile", "/admin-help", "/admin-leads",
                                "/admin-owned-leads", "/edit-admin-lead", "/edit-admin-comment",
                                "/view-admin-lead", "/admin-users", "/view-admin-comment"
                        ).hasRole("ADMIN_ROLE")

                        // Superadmin Pages (Includes Admin & User Pages)
                        .requestMatchers(
                                "/superadmin-dashboard", "/superadmin-profile", "/superadmin-help", "/superadmin-leads",
                                "/superadmin-owned-leads", "/superadmin-comments", "/superadmin-companies",
                                "/superadmin-admins", "/superadmin-users", "/superadmin-assigned-leads",
                                "/edit-superadmin-lead", "/edit-superadmin-comment", "/edit-superadmin-company",
                                "/view-superadmin-lead", "/view-superadmin-comment", "/view-superadmin-company"
                        ).hasRole("SUPERADMIN_ROLE")

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

            if ("SUPERADMIN_ROLE".equals(role)) {
                response.sendRedirect("/superadmin-dashboard");
            } else if ("ADMIN_ROLE".equals(role)) {
                response.sendRedirect("/admin-dashboard");
            } else {
                response.sendRedirect("/user-dashboard");
            }
        };
    }
}
