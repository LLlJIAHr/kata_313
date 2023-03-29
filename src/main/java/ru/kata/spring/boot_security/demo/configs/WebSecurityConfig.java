package ru.kata.spring.boot_security.demo.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;


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
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/login/**").anonymous()///
                .antMatchers("/admin/**").hasRole("ADMIN")//Для админов
                .antMatchers("/user/**").hasAnyRole("USER", "ADMIN") // и для юзеров и для админов
                .anyRequest()
                .authenticated()
                .and()
                .formLogin()
//                .loginPage("/login")
                .successHandler(successUserHandler)
//                .loginProcessingUrl("/login")///
//                .usernameParameter("j_email") //
//                .passwordParameter("j_password")
                .permitAll()
                .and()
                .logout()
                .clearAuthentication(true);
//                .logoutSuccessUrl("/login"); ////
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Bean

    public DaoAuthenticationProvider userDetailService() {//логика создания юзеров в системе
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userService);

        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
}