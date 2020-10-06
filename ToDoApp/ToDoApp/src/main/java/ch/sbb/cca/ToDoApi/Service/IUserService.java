package ch.sbb.cca.ToDoApi.Service;

import ch.sbb.cca.ToDoApi.Model.ToDoItem;
import ch.sbb.cca.ToDoApi.Model.User;

import java.util.List;

public interface IUserService {
    User getUserById(long id);
    List<User> getUsers();
    User createUser(User user);
    User updateUser(User user);
    void deleteUserById(long id);
    

}
