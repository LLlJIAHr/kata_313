package ru.kata.spring.boot_security.demo.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // user может имеит несколько ролей (set)

    @Column(unique = true, nullable = false)
    private String username;
    private String password;
    private String name;
    private String surname;
    private byte age;


    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles = new HashSet<>();

//    public StringBuilder getRolles() {
//        StringBuilder stringBuilder = new StringBuilder();
//        while (roles.iterator().hasNext()) {
//            stringBuilder.append(roles.iterator().next());
//        }
//        return stringBuilder;
//    }
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", age=" + age +
                '}';
    }
///////
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }



    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    ///////////////////
}
