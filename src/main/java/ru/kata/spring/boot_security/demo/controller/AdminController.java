package ru.kata.spring.boot_security.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.kata.spring.boot_security.demo.dao.RoleDAO;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.List;


@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserServiceImpl userService;
    private final RoleDAO roleDAO;

    public AdminController(UserServiceImpl userService, RoleDAO roleDAO) {
        this.roleDAO = roleDAO;
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
    public ModelAndView newUserPage() {

        User user = new User();
        ModelAndView mav = new ModelAndView("new");
        mav.addObject("user", user);
        mav.addObject("allRoles", roleDAO.findAll());
        return mav;
    }

    @PostMapping("/users")
    public String createUser(@ModelAttribute("user") User user) {
        userService.addUser(user);
        return "redirect:/admin/users";
    }

    @GetMapping("/profile/{id}/edit")
    public String editeUserPage(@PathVariable Long id, Model model) {
        model.addAttribute("userUpdate", userService.getUser(id));
        model.addAttribute("allRoles", roleDAO.findAll());
        return "edit";
    }

    @PatchMapping("/updating")//@PathVariable Long id
    public String updateUser(@ModelAttribute("user") User user) {
        userService.updateUser(user);
        return "redirect:/users";
    }

    @DeleteMapping("/delUser/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "redirect:/admin/users";
    }
}
