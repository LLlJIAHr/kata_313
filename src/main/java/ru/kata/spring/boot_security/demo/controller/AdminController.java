package ru.kata.spring.boot_security.demo.controller;


import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;


@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;


    public AdminController(UserService userService, RoleService roleService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @GetMapping("/users")
    public String showAllUsers(Model userModel) {
        userModel.addAttribute("allUsers", userService.getAllUsers());
        return "layout";
    }

    @GetMapping
    public ModelAndView showsAllUsers(Model model, Principal principal) {
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("current", userService.findByEmail(principal.getName()));
        return new ModelAndView("admin-page");
    }

    @GetMapping("/profile/{id}")
    public String showUser(@PathVariable("id") Long id, Model userModel) {
        userModel.addAttribute("user", userService.getUser(id));
        return "user";
    }

    @GetMapping("/new")
    public String newUserPage(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("allRoles", roleService.findAll());
        return "new";
    }

    @PostMapping("/adding")
    public String createUser(@ModelAttribute("user") User user) {
        userService.addUser(user);
        return "redirect:/admin/users";
    }

    @GetMapping("/profile/{id}/edit")
    public String editeUserPage(@PathVariable("id") Long id, Model model) {
        model.addAttribute("userUpdate", userService.getUser(id));
        model.addAttribute("allRoles", roleService.findAll());
        return "edit";
    }

    @PatchMapping("/updating")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.updateUser(user);
        return "redirect:/admin/users";
    }

    @DeleteMapping("/profile/{id}/deleting")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "redirect:/admin/users";
    }
}
