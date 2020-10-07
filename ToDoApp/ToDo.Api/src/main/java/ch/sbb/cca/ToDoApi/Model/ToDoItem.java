package ch.sbb.cca.ToDoApi.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "todoitem")
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ToDoItem {
    @Id
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "todoitem_seq", sequenceName = " student_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "todoitem_seq")
    private long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private boolean isCompleted;


    @ManyToOne
    private User user;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
