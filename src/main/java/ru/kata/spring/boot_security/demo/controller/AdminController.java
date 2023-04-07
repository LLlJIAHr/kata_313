package ru.kata.spring.boot_security.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.Optional;


@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;


    public AdminController(UserService userService, RoleService roleService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @GetMapping
    public String showAllUsers(Model model, Principal principal) {
        model.addAttribute("users", userService.getAllUsers());
//        User user = ;
        model.addAttribute("newUser", new User());
        model.addAttribute("allRoles", roleService.findAll());
        model.addAttribute("current", userService.findByEmail(principal.getName()));
        return "admin-page";
    }

    @RequestMapping("/getOne")
    @ResponseBody
    public User getOne(Long Id) {
        return userService.findById(Id).get();
    }

    @GetMapping("/profile/{id}")
    public String showUser(@PathVariable("id") Long id, Model userModel) {
        userModel.addAttribute("user", userService.getUser(id));
        return "user";
    }

//    @GetMapping("/new")
//    public String newUserPage(Model model) {
//        model.addAttribute("user", new User());
//        model.addAttribute("allRoles", roleService.findAll());
//        return "new";
//    }

    @PostMapping("/adding")
//    @ModelAttribute("user")
    public String createUser(User user) {
        userService.addUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/edit/{id}")
    public String editeUserPage(@PathVariable("id") Long id, Model model) {
        model.addAttribute("userUpdate", userService.getUser(id));
        model.addAttribute("allRoles", roleService.findAll());
        return "edit";
    }
    @PatchMapping("/updating/{id}")
    @GetMapping("/updating")
//
    public String updateUser(@PathVariable("id") Long id, @ModelAttribute("useR") User user,  Model model) {
        model.addAttribute("userUpdate", userService.getUser(id));
        model.addAttribute("allRoles", roleService.findAll());
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/deleting")
    @DeleteMapping("/deleting")
//    /profile/{id}
    public String deleteUser(@PathVariable Long id) { //
        userService.deleteUser(id);
        return "redirect:/admin";
    }


}
