package ch.sbb.cca.ToDoApi.Repository;

import ch.sbb.cca.ToDoApi.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
