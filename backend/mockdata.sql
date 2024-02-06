INSERT INTO "Users" ("UserID", "Username", "Firstname", "Lastname", "DateBorn", "Phone", "RelationshipStatus", "Gender", "Description", "Email", "ProfileImage", "Password", "Salt", "EventsCreated", "EventsJoined", "EventBails", "Role") VALUES
('U1ABC', 'user1', 'John', 'Doe', '1990-01-01', '1234567890', 2, 'M', 'Description 1', 'john.doe@example.com', 'image1.jpg', 'password1', 'salt1', 5, 10, 2, 2),
('U2DEF', 'user2', 'Jane', 'Smith', '1985-05-05', '0987654321', 3, 'F', 'Description 2', 'jane.smith@example.com', 'image2.jpg', 'password2', 'salt2', 3, 8, 1, 2),
('U3GHI', 'user3', 'Alice', 'Johnson', '1992-02-02', '1122334455', 0, 'F', 'Description 3', 'alice.johnson@example.com', 'image3.jpg', 'password3', 'salt3', 7, 5, 3, 2),
('U4JKL', 'user4', 'Bob', 'Williams', '1988-08-08', '5566778899', 3, 'M', 'Description 4', 'bob.williams@example.com', 'image4.jpg', 'password4', 'salt4', 2, 15, 0, 2),
('U5MNO', 'user5', 'Charlie', 'Brown', '1995-12-12', '2233445566', 1, 'M', 'Description 5', 'charlie.brown@example.com', 'image5.jpg', 'password5', 'salt5', 4, 7, 4, 2);


INSERT INTO "UserRelations" ("User_first_ID", "User_second_ID", "Type") VALUES
('U1ABC', 'U2DEF', 2),
('U2DEF', 'U3GHI', 2),
('U3GHI', 'U4JKL', 2),
('U4JKL', 'U5MNO', 1),
('U5MNO', 'U1ABC', 4);


INSERT INTO "Events" ("CreatorUserID", "EventName", "EventDescription", "EventDateTimeStart", "EventDateTimeEnd", "Visibility", "InviteURL", "FrontImage", "MinCapacity", "MaxCapacity", "LocationID") VALUES
('U1ABC', 'Event 1', 'Description for Event 1', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 0, 'http://invite1.com', 'image1.jpg', '10', '50', 1),
('U2DEF', 'Event 2', 'Description for Event 2', '2024-03-20 09:00:00', '2024-03-20 12:00:00', 1, 'http://invite2.com', 'image2.jpg', '5', '20', 2),
('U3GHI', 'Event 3', 'Description for Event 3', '2024-04-10 14:00:00', '2024-04-10 17:00:00', 0, 'http://invite3.com', 'image3.jpg', '15', '60', 3),
('U4JKL', 'Event 4', 'Description for Event 4', '2024-05-05 20:00:00', '2024-05-06 00:00:00', 1, 'http://invite4.com', 'image4.jpg', '20', '100', 4),
('U5MNO', 'Event 5', 'Description for Event 5', '2024-06-15 10:00:00', '2024-06-15 13:00:00', 2, 'http://invite5.com', 'image5.jpg', '30', '150', 5);


INSERT INTO "EventRelations" ("EventID", "UserID", "EventRelationParticipation", "EventRole") VALUES
(16, 'U1ABC', 0, 0),
(17, 'U2DEF', 0, 2),
(18, 'U3GHI', 1, 2),
(19, 'U4JKL', 2, 2),
(20, 'U5MNO', 0, 2);


INSERT INTO "Locations" ("EventID", "Address", "Postalcode", "City", "Country") VALUES
(16, '123 Event St', '12345', 'City1', 'Country1'),
(17, '456 Festival Ave', '23456', 'City2', 'Country2'),
(18, '789 Conference Blvd', '34567', 'City3', 'Country3'),
(19, '101 Party Rd', '45678', 'City4', 'Country4'),
(20, '202 Gathering Pl', '56789', 'City5', 'Country5');