package ch.sbb.cca.ToDoApi.Service;

import ch.sbb.cca.ToDoApi.Model.ToDoItem;
import ch.sbb.cca.ToDoApi.Model.User;
import ch.sbb.cca.ToDoApi.Repository.ToDoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ToDoItemService implements IToDoItemService {
    @Autowired
    private ToDoItemRepository toDoItemRepository;

    @Autowired
    private UserService userService;
    
    @Override
    public ToDoItem createToDoItem(ToDoItem toDoItem) {
        return toDoItemRepository.save(toDoItem);
    }

    @Override
    public ToDoItem getToDoItemById(long id) {
        return toDoItemRepository.findById(id).orElse(null);
    }

    @Override
    public List<ToDoItem> getToDoItems() {
        return toDoItemRepository.findAll();
    }

    @Override
    public void deleteToDoItemById(long id) {
        toDoItemRepository.deleteById(id);
    }

    @Override
    public ToDoItem updateToDoItem(ToDoItem toDoItem) {
        ToDoItem toDoItem1 = getToDoItemById(toDoItem.getId());
        if (toDoItem1 ==  null){
            return null;
        }
        else {
            toDoItem1.setCompleted(toDoItem.isCompleted());
            toDoItem1.setName(toDoItem.getName());
            return toDoItemRepository.save(toDoItem1);
        }

    }

    @Override
    public List<ToDoItem> getToDoItemsByUserId(long id) {
        User user = userService.getUserById(id);
        List<ToDoItem> allItems = getToDoItems();
        List<ToDoItem> items  = new ArrayList<>();
        for (ToDoItem item: allItems){
            if (item.getUser() == user){
                items.add(item);
            }
        }
        return items;
    }
    
}
