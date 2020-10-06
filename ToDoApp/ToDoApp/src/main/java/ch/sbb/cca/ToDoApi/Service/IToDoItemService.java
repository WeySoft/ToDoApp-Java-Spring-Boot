package ch.sbb.cca.ToDoApi.Service;

import ch.sbb.cca.ToDoApi.Model.ToDoItem;
import ch.sbb.cca.ToDoApi.Repository.ToDoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface IToDoItemService {

    ToDoItem createToDoItem(ToDoItem toDoItem);
    ToDoItem getToDoItemById(long id);
    List<ToDoItem> getToDoItems();
    void deleteToDoItemById(long Id);
    ToDoItem updateToDoItem(ToDoItem toDoItem);
}
