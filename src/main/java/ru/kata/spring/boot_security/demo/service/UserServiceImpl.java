package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.UserDAO;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImpl implements UserDetailsService {

    private final UserDAO userDAO;

    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public void addUser(User user) {
        User userFromDB = userDAO.findByUsername(user.getUsername());
        user.setRoles(Collections.singleton(new Role()));/////////////////////////////////
        userDAO.save(user);
    }

    public void updateUser(User updatedUser) {
        userDAO.save(updatedUser);
    }

    public void deleteUser(Long id) {
        userDAO.deleteById(id);
    }

    public User getUser(Long id) {
        return userDAO.getById(id);
    }

    public List<User> getAllUsers() {
        return userDAO.findAll();
    }

    public User findByUsername(String username) {
        return userDAO.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDAO.findByUsername(username);
        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), user.getAuthorities());
    }
}