package ch.sbb.cca.ToDoApi.Service;

import ch.sbb.cca.ToDoApi.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository repo;
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        List<ch.sbb.cca.ToDoApi.Model.User> users = repo.findAll();
        for (ch.sbb.cca.ToDoApi.Model.User u: users){
            if (u.getUsername().equals(userName)){
                return new User(u.getUsername(), u.getPassword(),new ArrayList<>());
            }
        }

        throw new UsernameNotFoundException("Username not fund");
    }
}
