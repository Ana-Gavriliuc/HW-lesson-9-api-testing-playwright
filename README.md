API Checklist (PUT / DELETE / GET)  (Added pipeline check for Lesson 9)

| № | Method | Endpoint                    | Description                                                 | Expected Result   | Actual Result | Status  |
|---|--------|-----------------------------|-------------------------------------------------------------|-------------------|---------------|---------|
| 1 | GET    | /test-orders                | Login with username and password to get API key             | 200 OK            | 200 OK        | Passed  |
| 2 | GET    | /test-orders/{id}           | Get an order by ID (1-10)                                   | 200 OK            | 200 OK        | Passed  |
| 3 | GET    | /test-orders/{id}           | Get an order by incorrect ID less then 1 or highest then 10 | 400               | 400           | Passed  | //не соответствует свагер
| 4 | GET    | /test-orders/time/{id}      | Get order info and current time                             | 200 OK            | 200 OK        | Passed  |
| 5 | GET    | /test-orders/payment/{id}   | Check order payment status by order id                      | 200 OK            | 200 OK        | Passed  |
| 6 | PUT    | /test-orders/{id}           | Update an order by ID                                       | 200 OK            | 200 OK        | Passed  |
| 7 | PUT    | /test-orders/{id}           | Update an order by ID with empty body                       | 400               | 400           | Passed  |
| 8 | DELETE | /test-orders/{id}           | Delete an order by ID                                       | 204               | 204           | Passed  |