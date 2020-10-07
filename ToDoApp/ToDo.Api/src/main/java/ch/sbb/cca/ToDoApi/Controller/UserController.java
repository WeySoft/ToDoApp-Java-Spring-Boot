package ch.sbb.cca.ToDoApi.Controller;

import ch.sbb.cca.ToDoApi.Model.ToDoItem;
import ch.sbb.cca.ToDoApi.Model.User;
import ch.sbb.cca.ToDoApi.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id){
        User user = userService.getUserById(id);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.getUsers();
        if (users == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<User> createUser(@Validated @RequestBody User user){
        User user1 = userService.createUser(user);
        if (user1 == null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        else{
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        }
    }

    @CrossOrigin
    @PutMapping
    public ResponseEntity<?> updateUser(@Validated @RequestBody User user){
        User user1 = userService.updateUser(user);
        if (user1 == null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        else{
            return new ResponseEntity<>(user, HttpStatus.NO_CONTENT);
        }
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable long id){
        userService.deleteUserById(id);
        if (userService.getUserById(id) == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else
        {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }


}
