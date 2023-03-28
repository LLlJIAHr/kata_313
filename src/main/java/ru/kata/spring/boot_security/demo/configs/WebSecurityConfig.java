package ru.kata.spring.boot_security.demo.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import javax.sql.DataSource;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final SuccessUserHandler successUserHandler;
    private final UserServiceImpl userService;

    public WebSecurityConfig(SuccessUserHandler successUserHandler, UserServiceImpl userService) {
        this.userService = userService;
        this.successUserHandler = successUserHandler;
    }


    // настройки доступа а юрл
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
//                .anyRequest()
//                .authenticated()
                .antMatchers("/admin/**").hasRole("ADMIN")//Для админов
                .antMatchers("/user/**").hasAnyRole("USER", "ADMIN") // и для юзеров и для админов
                .and()
                .formLogin().successHandler(successUserHandler)
                .permitAll()
                .and()
                .logout().logoutSuccessUrl("/")
                .permitAll();
//                .authorizeRequests()
//                .antMatchers("/", "/index").permitAll()
//                .anyRequest().authenticated()
//                .antMatchers("/admin/**").hasRole("ADMIN")          ////////////////
//                .antMatchers("/user/**").hasAnyRole("ADMIN", "USER")       ////////////////
//                .and()
//                .formLogin().successHandler(successUserHandler)
//                .permitAll()
//                .and()
//                .logout()
//                .logoutSuccessUrl("/")
//                .permitAll();
    }



    @Bean
    public DaoAuthenticationProvider userDetailService() {//логика создания юзеров в системе

        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userService);
        return provider;
    }
}