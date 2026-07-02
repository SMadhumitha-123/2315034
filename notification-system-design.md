# Notification System Design

# Stage 1

The REST API Design, Contract and Structure to display notifications to the users when they are logged in.

As per the given scenario, the core actions the notification app should support like,
1. Providing appropriate notifications for the students at correct time
2. Students must receive real-time updates regarding Placements, Events and Results.

The API endpoints along with their JSON request, response and headers are like,

 http://4.224.186.213/evaluation-service/notifications

 {
    "notifications":[
        {
            "ID":"1",
            "Type":"Result",
            "Message":"mid-sem",
            "Timestamp":"2026-07-02 11:07:30"
        },
        {
            "ID":"2",
            "Type":"Placement",
            "Message":"CSX Corporation hiring",
            "Timestamp":"2026-07-02 11:08:32"
        },
        {
            "ID":"3",
            "Type":"Event",
            "Message":"Farewell",
            "Timestamp":"2026-07-02 11:09:22"
        }
    ]
 }

http://localhost:3000/notify (GET)
http://localhost:3000/notify (POST)


 JSON Schemas - Essential fields include,

 1. ID of the student
 2. Type of the updates (Events, Results, Placements)
 3. Message to be displayed as a notification
 4. Timestamp of the notification


The mechanism for the real-time notifications that can be implemented are like, when the user login to the notification app, as soon as the client should be updated with the real time updates with respect to their client ID.



# Stage 2

The persistent storage (DB) that I would suggest is MySQL Database because it has a structured schemas that is used efficiently in indexing also.

The applicable db schema is,

database - notification app
Tables - notifications
Fields:
studentID
notificationType (Events, Results, Placements)
Message
Timestamp


As the data volume increases, then the database exceeds its limitations of storing the datas that may be lead to loss of datas sometimes or it would result in redunduncy like issues.

SQL Queries:

create notificationapp;
use notificationapp;

create table notifications (int(10) studentID, char(20) notificationType, varchar Mesaage, varchar Timestamp);

select * from notifications where studentID=1 and notificationType=Event order by createdAt ASC;

select * from notifications;



# Stage 3

From the given query,

Select * from notifications where studentID = 1042 and isRead = false order by createdAt ASC;

The above query is slow because the databse which was created 3 months ago, is now grown to 50000 students and 5000000 notifications that made slow and the above query is not accurate.

To make the query accurate, I would change by adding indexes on every column for accurate filteration.

Query to find all students who got a  placement notification in last 7 days:

Select * from notifications where notificationType=Placement order by createdAt ASC having Timestamp between 2026-06-25 and 2026-07-01;


# Stage 4

As the notifications are being fetched on each page load for every student, the DB is getting overwhelmed which is causing a bad user experience. So to overcome this I would suggest a good DB to use to omprove performance. From the designing phase of the app itself, the developer must choose a high potential DB to work with that increases the user experience well.

# Stage 5

