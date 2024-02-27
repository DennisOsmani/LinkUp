drop table "UserRelations" cascade;
drop table "EventRelations" cascade;
drop table "Events" cascade;
drop table "Users" cascade;
drop table "Locations" cascade;



INSERT INTO "Users"
    ("UserID", "Firstname", "Lastname", "DateBorn", "Phone", "RelationshipStatus", "Gender", "Description", "Email", "ProfileImage", "Password", "Salt", "EventsCreated", "EventsJoined", "EventBails", "Role")
VALUES
    ('user1', 'Petter', 'Pilgaard', '1990-01-01', '69696969', 2, 'M', 'Yo im petter', 'petter@mail.no', 'image.png', 'password', 'salt', 0, 0, 0, 2),
    ('user2', 'Jan', 'Teigen', '1990-01-01', '12312344', 2, 'M', 'Mil etter mil, skjønte du?', 'jantheman@mail.no', 'image.png', 'password', 'salt', 0, 0, 0, 2),
    ('user3', 'Jan', 'Banan', '1990-01-01', '88991122', 2, 'M', 'Sønn av blomsterfinn', 'banan@mail.no', 'image.png', 'password', 'salt', 0, 0, 0, 2),
    ('user4', 'Sigrid', 'Undset', '1990-01-01', '12121212', 2, 'F', 'Sandwich dronninga', 'sigrid@mail.no', 'image.png', 'password', 'salt', 0, 0, 0, 2),
    ('user5', 'Dennis', 'Fremming', '1990-01-01', '98989898', 2, 'F', 'Sønn av Amund Fremming', 'pennis@mail.no', 'image.png', 'password', 'salt', 0, 0, 0, 2),
    ('user6', 'Cato Salve', 'Pedersen', '1990-01-01', '22222222', 2, 'M', 'Stoppes aldri', 'cato@mail.no', 'image.png', 'password', 'salt', 0, 0, 0, 2),
    ('user7', 'Emma', 'Ellingsen', '1990-01-01', '33333333', 2, 'M', 'Influenser', 'emma@mail.no', 'image.png', 'password', 'salt', 0, 0, 0, 2),
    ('user8', 'Edward', 'Snowden', '1990-01-01', '00000000', 2, '-', '-', 'snowden@mail.no', 'image.png', 'password', 'salt', 0, 0, 0, 2),
    ('user9', 'Nina', 'Fremming', '1990-01-01', '69698888', 2, 'F', 'Amund Fremming<33', 'nina@mail.no', 'image.png', 'password', 'salt', 0, 0, 0, 2),
    ('user10', 'Dinosaurus', 'Rex', '1990-01-01', '11223344', 2, 'M', 'Raaawwwwrrrr', 'rex@mail.no', 'image.png', 'password', 'salt', 0, 0, 0, 2),
    ('user11', 'Håvard', 'Salsten', '2000-08-19', '99339933', 1, 'M', 'Hockey speller', 'håvard.hockey@gmail.com', 'håv.jpg', 'håvard1', 'salt', 0, 0, 0, 2),
    ('user12', 'Vetle', 'Salsten', '2000-08-19', '99933311', 1, 'M', 'Dårlig hockey spiller', 'sally@gmail.com', 'sally.jpeg', 'sally1', 'salt', 0, 0, 0, 2),
    ('user13', 'Julie', 'Bjørneby', '2000-05-23', '45454545', 2, 'F', 'Dennis er Best<3', 'julie@gmail.com', 'jue.jpg', 'julie1', 'salt', 0, 0, 0, 2),
    ('user14', 'Elise', 'Roise', '2000-04-21', '46464646', 4, 'F', 'Pen', 'elise@hotmail.com', 'elise.jpg', 'elise1', 'salt', 0, 0, 0, 2),
    ('user15', 'Fredrik', 'Gyene', '2000-06-04', '90909090', 2, 'M', 'Fred Kenneth bby', 'fred@gmail.com', 'fred.jpg', 'fredrik1', 'salt', 0, 0, 0, 2),
    ('user16', 'Atif', 'Berget', '2000-11-20', '97979797', 2, 'M', 'Small arms, but no regreets', 'atif@gmail.com', 'atif.jpg', 'atif1', 'salt', 0, 0, 0, 2),
    ('user17', 'Erna', 'Solberg', '1969-08-21', '99999999', 1, 'F', 'Ex statsminister', 'erna@hotmail.com', 'erna.jpg', 'erna1', 'salt', 0, 0, 0, 2),
    ('user18', 'Markus', 'Solbakken', '2000-06-06', '98765432', 3, 'M', 'Fotball spellar', 'markus@hotmail.com', 'markus.jpg', 'markus1', 'salt', 0, 0, 0, 2),
    ('user19', 'Tiril', 'Blindheim', '2000-01-28', '46454645', 4, 'F', 'Psykolog', 'tiril@gmail.com', 'tiril.jpeg', 'tiril1', 'salt', 0, 0, 0, 2),
    ('user20', 'Margrete', 'Roe', '2000-05-17', '42424242', 3, 'F', 'Bor i Køben', 'margrete@hotmail.com', 'maggie.jpg', 'margrete1', 'salt', 0, 0, 0, 2),
    ('dennis10', 'Dennis', 'Osmani', '2000-09-06', '90414810', 2, 'M', 'Sexy, talented, alpha', 'dennisosmani@hotmail.com', 'hot.png', 'admin', 'salt', 0, 0, 0, 1); 


INSERT INTO "UserRelations"
    ("User_first_ID", "User_second_ID", "Type")
VALUES
    ('user1', 'user2', 2),
    ('user1', 'user3', 2),
    ('user1', 'user4', 2),
    ('user1', 'user5', 2),
    ('user1', 'user6', 2),
    ('user1', 'user7', 2),
    ('user1', 'user8', 0),
    ('user1', 'user9', 0),
    ('user10', 'user1', 1),
    ('user11', 'user1', 1),
    ('user1', 'user13', 3),
    ('user1', 'user14', 3),
    ('user15', 'user1', 4),
    ('user16', 'user1', 4),
    ('user14', 'user15', 2),
    ('user14', 'user16', 2),
    ('user14', 'user17', 2),
    ('user14', 'user18', 2),
    ('user14', 'user19', 2),
    ('user14', 'user20', 2),
    ('user14', 'user12', 0),
    ('user14', 'user13', 0),
    ('user10', 'user14', 1),
    ('user11', 'user14', 1),
    ('user14', 'user9', 3),
    ('user14', 'user8', 3),
    ('user2', 'user14', 4),
    ('user3', 'user14', 4);




INSERT INTO "Locations"
    ("Address", "Postalcode", "City", "Country")
VALUES
    ('Hillside Dr', '42582', 'CedarHaven', 'CountryA'),
    ('Lakeside Ct', '94103', 'AmundTown', 'CountryA'),
    ('River Rd', '84051', 'Brightville', 'CountryC'),
    ('Starlight Blvd', '95100', 'Brightville', 'CountryC'),
    ('Forest Ln', '34525', 'AmundTown', 'CountryA'),
    ('Hillside Dr', '32305', 'AmundTown', 'CountryB'),
    ('Forest Ln', '10110', 'Brightville', 'CountryA'),
    ('Starlight Blvd', '70861', 'Brightville', 'CountryC'),
    ('Moonlight Way', '48292', 'Brightville', 'CountryB'),
    ('Forest Ln', '21674', 'Brightville', 'CountryC'),
    ('Sunny Ave', '30135', 'Brightville', 'CountryB'),
    ('River Rd', '51642', 'Brightville', 'CountryC'),
    ('Starlight Blvd', '44676', 'Brightville', 'CountryC'),
    ('Starlight Blvd', '95957', 'CedarHaven', 'CountryA'),
    ('Main St', '58479', 'AmundTown', 'CountryB'),
    ('Lakeside Ct', '72594', 'Brightville', 'CountryB'),
    ('Moonlight Way', '80556', 'AmundTown', 'CountryC'),
    ('Hillside Dr', '34871', 'AmundTown', 'CountryC'),
    ('Sunny Ave', '33436', 'Brightville', 'CountryA'),
    ('Sunny Ave', '65737', 'AmundTown', 'CountryC');


INSERT INTO "Events"
    ("EventName", "EventDescription", "EventDateTimeStart", "EventDateTimeEnd", "Visibility", "InviteURL", "FrontImage", "MinCapacity", "MaxCapacity", "LocationID")
VALUES
    ('Event1', 'Description for Event1', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 0, 'http://invite.com', 'image.jpg', '1', '50', 1),
    ('Event2', 'Description for Event2', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 0, 'http://invite.com', 'image.jpg', '1', '20', 2),
    ('Event3', 'Description for Event3', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 0, 'http://invite.com', 'image.jpg', '1', '40', 3),
    ('Event4', 'Description for Event4', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 0, 'http://invite.com', 'image.jpg', '1', '35', 4),
    ('Event5', 'Description for Event5', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 0, 'http://invite.com', 'image.jpg', '1', '25', 5),
    ('Event6', 'Description for Event6', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 0, 'http://invite.com', 'image.jpg', '1', '15', 6),
    ('Event7', 'Description for Event7', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 0, 'http://invite.com', 'image.jpg', '1', '30', 7),
    ('Event8', 'Description for Event8', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 0, 'http://invite.com', 'image.jpg', '1', '22', 8),
    ('Event9', 'Description for Event9', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 0, 'http://invite.com', 'image.jpg', '1', '18', 9),
    ('Event10', 'Description for Event10', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 0, 'http://invite.com', 'image.jpg', '1', '28', 10),

    ('Event11', 'Description for Event11', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 1, 'http://invite.com', 'image.jpg', '1', '50', 11),
    ('Event12', 'Description for Event12', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 1, 'http://invite.com', 'image.jpg', '1', '50', 12),
    ('Event13', 'Description for Event13', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 1, 'http://invite.com', 'image.jpg', '1', '50', 13),
    ('Event14', 'Description for Event14', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 1, 'http://invite.com', 'image.jpg', '1', '50', 14),
    ('Event15', 'Description for Event15', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 1, 'http://invite.com', 'image.jpg', '1', '50', 15),
    ('Event16', 'Description for Event16', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 2, 'http://invite.com', 'image.jpg', '1', '50', 16),
    ('Event17', 'Description for Event17', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 2, 'http://invite.com', 'image.jpg', '1', '50', 17),
    ('Event18', 'Description for Event18', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 2, 'http://invite.com', 'image.jpg', '1', '50', 18),
    ('Event19', 'Description for Event19', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 2, 'http://invite.com', 'image.jpg', '1', '50', 19),
    ('Event20', 'Description for Event20', '2024-02-15 18:00:00', '2024-02-15 21:00:00', 2, 'http://invite.com', 'image.jpg', '1', '50', 20);





INSERT INTO "EventRelations"
    ("EventID", "UserID", "EventRelationParticipation", "EventRole")
VALUES
    (1, 'user2', 0, 0),
    (2, 'user2', 0, 0),
    (3, 'user2', 0, 0),
    (4, 'user2', 0, 0),
    (5, 'user2', 0, 0),

    (6, 'user3', 0, 0),
    (7, 'user3', 0, 0),
    (8, 'user3', 0, 0),
    (9, 'user3', 0, 0),
    (10, 'user3', 0, 0),

    (11, 'user2', 0, 0),
    (12, 'user2', 0, 0),
    (13, 'user3', 0, 0),
    (14, 'user4', 0, 0),
    (15, 'user4', 0, 0),

    (16, 'user16', 0, 0),
    (17, 'user17', 0, 0),
    (18, 'user6', 0, 0),
    (19, 'user7', 0, 0),
    (20, 'user8', 0, 0),

    (1, 'user1', 0, 1),
    (1, 'user14', 0, 1),
    (1, 'user5', 0, 2),
    (1, 'user6', 0, 2),
    (1, 'user7', 0, 2),
    (1, 'user8', 0, 2),
    (1, 'user9', 0, 2),
    (1, 'user10', 0, 2),

    (6, 'user1', 0, 1),
    (6, 'user14', 0, 2),
    (6, 'user5', 0, 2),
    (6, 'user6', 0, 2),
    (6, 'user7', 0, 2),
    (6, 'user8', 0, 2),
    (6, 'user9', 0, 2),
    (6, 'user10', 0, 2),

    (11, 'user1', 2, 2),
    (11, 'user14', 2, 2),
    (13, 'user1', 2, 2),
    (13, 'user14', 2, 2),
    (15, 'user1', 2, 2),

    (1, 'user13', 1, 2),
    (1, 'user15', 1, 2),

    (1, 'user18', 3, 2),
    (1, 'user19', 3, 2);