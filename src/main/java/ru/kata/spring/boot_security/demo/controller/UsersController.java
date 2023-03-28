package ru.kata.spring.boot_security.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;


@Controller
@RequestMapping("/user")
public class UsersController {
    private final UserServiceImpl userService;

    public UsersController(UserServiceImpl userService) {
        this.userService = userService;
    }

    // всем homePage
    // useru только страница юзера(не может менять бд) ПО URL /USER/
    // admin всё ПО URL /admin/
    // добавить логаут на всех страницах с помощью таймлиф

//    @GetMapping("/login")
//    public String showLogin() {
//        return "/login";
//    }

////////////////////////////
    @GetMapping("/profile")
    public String showUser(Principal principal, Model model) {
        User user = userService.findByEmail(principal.getName());
        model.addAttribute("user", user);
        return "user";
    }
/////////////////////////

}
