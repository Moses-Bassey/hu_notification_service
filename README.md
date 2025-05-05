##  HU Notification Service (Kafka-based)

### Purpose
The Notification Service is responsible for listening to events that indicate a tutorial session has ended and notifying the **Admin Team** accordingly. It uses **Kafka** for real-time, event-driven communication between microservices.

---

### ✅ Responsibilities
- Subscribe to `session.completed` events from the event stream.
- Extract session metadata (e.g., student name, tutor name, duration, rating).
- Notify the Admin Team via dashboard update, email, or internal alert system.
- Log and persist notification data for audit and metrics.

---
