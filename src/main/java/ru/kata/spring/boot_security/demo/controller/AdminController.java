package ru.kata.spring.boot_security.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;


@Controller
@RequestMapping("/api")
public class AdminController {
    private final UserService userService;
//    private final RoleService roleService;
//
    public AdminController(UserService userService) {
//        this.roleService = roleService;
        this.userService = userService;
    }
    @GetMapping("/admin")
    public String showAllUsers(Model model, Principal principal) {
//        model.addAttribute("users", userService.getAllUsers());
//        model.addAttribute("newUser", new User());
//        model.addAttribute("allRoles", roleService.findAll());
        model.addAttribute("current", userService.findByEmail(principal.getName()));
        return "admin-page";
    }

//    @PostMapping("/adding")
////    @ModelAttribute("user")
//    public String createUser(User user) {
//        userService.addUser(user);
//        return "redirect:/admin";
//    }
//    @PatchMapping("/updating")
//    public String updateUser(User user) {
//        userService.updateUser(user);
//        return "redirect:/admin";
//    }
//    @GetMapping("/deleting/{id}")
//    public String deleteUser(@PathVariable Long id) { //
//        userService.deleteUser(id);
//        return "redirect:/admin";
//    }


}
