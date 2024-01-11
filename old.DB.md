# Design

**??LEGGE TIL??**

- Maxusers i events og eller friend list???
- Rename FriendList til UserFriend?
- Fjerne eventsCreated, EventsJoined og bailscore og heller regne disse underveis? lettere å ha consistent data men mer spørringer...

**User**

- UserID (PK) <-- Må kanskje endres til STRING for å lage en lang id som ikke kan gjettes fram til.
- Username
- firstname
- lastname
- Password
- Salt
- Email
- Phone
- LastLogin
- EventsCreated
- EventsJoined
- EventBails
- profileimage
- rank
  !!!! NY -> Role
- activityicon
  NY?? relationshistatus

!! Her må nok lastlogin endres til noe annet, kanskje ha en timer med hvor lenge en har vært på, eller hvor mange dager på rad
(Kanskje en egen tabell????)

**UserRelation**

- UserrelationID (PK)
- Userid (FK)
- UserrelationOD (FK)
- Status (Pending, decline, blocked, friend)

**Event**

- Eventid (PK)
- CreatorUserid
- Eventname
- EventDescription
- EventDateTimeStart
- EventDateTimeEnd
- Location <-- kanskje endre til egen tabell med postnummer og adresse
- Visibility (public, private)
- InviteURL
- EventImages <-- Dette er en egen tabell
- !!! FrontImage <-- Ny, forsidebilde

**EventRelation**

- EventRelationID (PK)
- Eventid (FK)
- Userid (FK)
- Status (accepted, declined, waiting, blocked)

# Dont start on theese before the app runs

**Message**

- MessageID (PK)
- Eventid (FK)
- Userid (FK)
- Message
- Datetime

**Poll**
