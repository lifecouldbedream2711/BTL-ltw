package quanly.kham_benh.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "appointment")
public class Appointments {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
}
