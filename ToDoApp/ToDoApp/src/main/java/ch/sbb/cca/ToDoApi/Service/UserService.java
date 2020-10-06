package ch.sbb.cca.ToDoApi.Service;

import ch.sbb.cca.ToDoApi.Model.ToDoItem;
import ch.sbb.cca.ToDoApi.Model.User;
import ch.sbb.cca.ToDoApi.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;



    @Override
    public User getUserById(long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        User user1 = getUserById(user.getId());
        if (user1 == null){
            return null;
        }
        user1.setFirstname(user.getFirstname());
        user1.setLastname(user.getLastname());
        user1.setUsername(user.getUsername());
        user1.setBirthdate(user.getBirthdate());
        user1.setPassword(user.getPassword());
        return userRepository.save(user1);
    }

    @Override
    public void deleteUserById(long id) {
        userRepository.deleteById(id);
    }


}
