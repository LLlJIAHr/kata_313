package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.UserDAO;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImpl implements UserDetailsService {

    private final UserDAO userDAO;

    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }
    @Transactional
    public void addUser(User user) {
        userDAO.save(user);
    }
    @Transactional
    public void updateUser(User updatedUser) {
        userDAO.save(updatedUser);
    }
    @Transactional
    public void deleteUser(Long id) {
        userDAO.deleteById(id);
    }
    public User getUser(Long id) {
        return userDAO.findById(id).orElse(null);
    }
    public List<User> getAllUsers() {
        return userDAO.findAll();
    }
    public User findByEmail(String email) {
        return userDAO.findByEmail(email);
    }
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userDAO.findByEmail(email);
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.getAuthorities()
        );
    }
}