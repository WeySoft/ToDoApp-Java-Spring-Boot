package ch.sbb.cca.ToDoApi.Service;

import ch.sbb.cca.ToDoApi.Model.User;
import ch.sbb.cca.ToDoApi.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;


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
        if (checkIfUsernameisAlreadyTaken(user.getUsername())) {
            return null;
        }
        user.setPassword(encoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        User user1 = getUserById(user.getId());
        if (user1 == null) {
            return null;
        }
        if (checkIfUsernameisAlreadyTaken(user.getUsername())) {
            return null;
        }

        user1.setFirstname(user.getFirstname());
        user1.setLastname(user.getLastname());
        user1.setUsername(user.getUsername());
        user1.setBirthdate(user.getBirthdate());
        user1.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user1);
    }

    @Override
    public void deleteUserById(long id) {
        userRepository.deleteById(id);
    }

    @Override
    public boolean checkIfUsernameisAlreadyTaken(String name) {
        List<User> users = getUsers();
        for (User u : users) {
            if (u.getUsername().equals(name)) {
                return true;
            }
        }
        return false;
    }
}
