package ch.sbb.cca.ToDoApi.Controller;

import ch.sbb.cca.ToDoApi.Model.ToDoItem;
import ch.sbb.cca.ToDoApi.Model.User;
import ch.sbb.cca.ToDoApi.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @CrossOrigin
    @GetMapping("/user/{id}")
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
    @GetMapping("/user")
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.getUsers();
        if (users == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
    }


}
