API Checklist (PUT / DELETE / GET)

| №   | Method   | Endpoint                    | Description                                                   | Expected Result   | Actual Result   | Status    |
| --- | -------- | --------------------------- | ------------------------------------------------------------- | ----------------- | --------------- | --------- | ------------------------- |
| 1   | GET      | /test-orders                | Login with username and password to get API key               | 200 OK            | 200 OK          | Passed    |
| 2   | GET      | /test-orders/{id}           | Get an order by ID (1-10)                                     | 200 OK            | 200 OK          | Passed    |
| 3   | GET      | /test-orders/{id}           | Get an order by incorrect ID less then 1 or highest then 10   | 400               | 400             | Passed    | //не соответствует свагер |
| 4   | GET      | /test-orders/time/{id}      | Get order info and current time                               | 200 OK            | 200 OK          | Passed    |
| 5   | GET      | /test-orders/payment/{id}   | Check order payment status by order id                        | 200 OK            | 200 OK          | Passed    |
| 6   | PUT      | /test-orders/{id}           | Update an order by ID                                         | 200 OK            | 200 OK          | Passed    |
| 7   | PUT      | /test-orders/{id}           | Update an order by ID with empty body                         | 400               | 400             | Passed    |
| 8   | DELETE   | /test-orders/{id}           | Delete an order by ID                                         | 204               | 204             | Passed    |




API Loan Decision HW 10

| №   | Case                                                         | Test Data                                                                                                                | Expected Result                                 | Actual Result | Status                     |
| --- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- | ------------- | -------------------------- |
| 1   | Low Risk                                                     | {<br>"income": 8500,<br>"debt": 500,<br>"age": 25,<br>"employed": true,<br>"loanAmount": 1500,<br>"loanPeriod": 12<br>}  | 200 OK                                          | 200 OK        | Passed                     |
| 2   | Medium Risk (less income)                                    | {<br>"income": 3000,<br>"debt": 500,<br>"age": 25,<br>"employed": true,<br>"loanAmount": 1500,<br>"loanPeriod": 12<br>}  | 200 OK                                          | 200 OK        | Passed                     |
| 3   | High Risk (less income,high debt,unemployed and less period) | {<br>"income": 1000,<br>"debt": 1500,<br>"age": 25,<br>"employed": false,<br>"loanAmount": 1500,<br>"loanPeriod": 6<br>} | 200 OK                                          | 200 OK        | Passed                     |
| 4   | Very High Risk                                               | {<br>"income": 100,<br>"debt": 500,<br>"age": 25,<br>"employed": true,<br>"loanAmount": 500,<br>"loanPeriod": 12<br>}    | 200 OK                                          | 200 OK        | Passed                     |
| 5   | Invalid (Age < 16)                                           | {<br>"income": 8500,<br>"debt": 500,<br>"age": 13,<br>"employed": false,<br>"loanAmount": 1500,<br>"loanPeriod": 12<br>} | 400 Bad Request (age must be greater than 16)   | 200 OK        | Failed (Age not validated) |
| 6   | Invalid (Income = 0)                                         | {<br>"income": 0,<br>"debt": 500,<br>"age": 25,<br>"employed": true,<br>"loanAmount": 1500,<br>"loanPeriod": 12<br>}     | 400 Bad Request (income must be greater than 0) | 400           | Passed                     |
