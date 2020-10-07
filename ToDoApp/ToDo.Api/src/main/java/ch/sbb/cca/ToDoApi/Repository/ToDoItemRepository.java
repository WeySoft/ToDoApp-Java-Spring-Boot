package ch.sbb.cca.ToDoApi.Repository;

import ch.sbb.cca.ToDoApi.Model.ToDoItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoItemRepository extends JpaRepository<ToDoItem, Long> {
    
}
