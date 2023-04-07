package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void addUser(User user);
    void updateUser(User updatedUser);
    void deleteUser(Long id);
    User getUser(Long id);
    List<User> getAllUsers();
    User findByEmail(String email);
    public Optional<User> findById(Long id);
}
