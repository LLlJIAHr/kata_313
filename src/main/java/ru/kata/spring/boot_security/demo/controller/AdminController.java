package ru.kata.spring.boot_security.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.kata.spring.boot_security.demo.dao.RoleDAO;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.List;
import java.util.Set;


@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserServiceImpl userService;
    private final RoleService roleService;


    public AdminController(UserServiceImpl userService, RoleService roleService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    // всем homePage
    // useru только страница юзера(не может менять бд) ПО URL /USER/
    // admin всё ПО URL /admin/
    // добавить логаут на всех страницах с помощью таймлиф

    @GetMapping("/users")
    public ModelAndView showAllUsers(Model userModel) {
        userModel.addAttribute("allUsers", userService.getAllUsers());
        return new ModelAndView("users");
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
