package ch.sbb.cca.ToDoApi.Controller;

import ch.sbb.cca.ToDoApi.Model.ToDoItem;
import ch.sbb.cca.ToDoApi.Repository.ToDoItemRepository;
import ch.sbb.cca.ToDoApi.Service.ToDoItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todoitem")
public class ToDoItemController {
    @Autowired
    private ToDoItemService service;

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<ToDoItem> getToDoItem(@PathVariable Long id){
         ToDoItem toDoItem = service.getToDoItemById(id);
         if (toDoItem == null){
             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
         }
         else{
             return new ResponseEntity<>(toDoItem, HttpStatus.OK);
         }
    }

    @CrossOrigin
    @GetMapping()
    public ResponseEntity<List<ToDoItem>> getToDoItems(){
        List<ToDoItem> toDoItems = service.getToDoItems();
        if (toDoItems == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(toDoItems, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @GetMapping("/user/{id}")
    public ResponseEntity<List<ToDoItem>> getToDoItemByUserId(@PathVariable long id){
        List<ToDoItem> items = service.getToDoItemsByUserId(id);
        if (items == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(items, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @PostMapping()
    public ResponseEntity<ToDoItem> createToDoItem(@Validated @RequestBody ToDoItem toDoItem){
        ToDoItem toDoItem1 = service.createToDoItem(toDoItem);
        if (toDoItem1 == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(toDoItem1, HttpStatus.CREATED);
        }
    }

    @CrossOrigin
    @PutMapping()
    public  ResponseEntity<?> updateToDoItem(@Validated @RequestBody ToDoItem toDoItem){
        ToDoItem toDoItem1 = service.updateToDoItem(toDoItem);
        if (toDoItem1 == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteToDoItem(@PathVariable Long id){
        service.deleteToDoItemById(id);
        ToDoItem toDoItem = service.getToDoItemById(id);
        if (toDoItem == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }



}

