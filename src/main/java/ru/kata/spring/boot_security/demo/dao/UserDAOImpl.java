package ru.kata.spring.boot_security.demo.dao;


import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;


public class UserDAOImpl {
//
//    @PersistenceContext
//    private EntityManager entityManager;
//
//    @Transactional
//    public void addUser(User user) {
//        entityManager.persist(user);
//    }
//
//    @Transactional
//    public void updateUser(User updatedUser) {
//        entityManager.merge(updatedUser);
//    }
//
//    @Transactional
//    public void deleteUser(Long id) {
//        entityManager.remove(getUser(id));
//    }
//
//    @Transactional
//    public User getUser(Long id) {
//        return entityManager.find(User.class, id);
//    }
//
//    @Transactional
//    public List<User> getAllUsers() {
//        return entityManager.createQuery("From User", User.class).getResultList();
//    }
//
//    @Override
//    public User findByUserName(String name) {
//        return entityManager.find(User.class, name);
//    }
}
