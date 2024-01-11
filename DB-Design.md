# Design

**Eventuelt etter bachelor**

- Maxusers i events og eller friend list???
- Rename FriendList til UserFriend?
- Fjerne eventsCreated, EventsJoined og bailscore og heller regne disse underveis? lettere å ha consistent data men mer spørringer...
- Spesielle brukere, typ influensere, som er admins
- Legge til votes på events, så en bruker kan ha event rank. Lukrativt for andre å se.
- Se på å ha ikon for aktivitet, streaks
- Pro versjon, unocker mer styling til events.

\*\*

**Burde/Må legge til**

- Mulighet for brukere å spørre om å forlate event uten å få bailscore, da må man kunne sende melding (ekstra entry i EventRelation)
- Mulighet for Host å sjekke av hvemn som faktisk møtte opp eller ikke, så bails blir delt ut
- Personlighets trade, regnes ut med bailscore og events opprettet og joined
- Legge til mulighet for admin å kunne legge ut innlegg/oppdateringer angående eventet som ekstra informasjon, med tilhørende bilde hvis ønskelig.
- Legge til mulighet for ett Event å ha flere bilder, som en carusel?

**User**

<!-- Rank, bails, trade regnes ut i frontend -->

- UserID (PK)
- Username
- Firstname
- Lastname
- DateBorn
- Phone
- Relationshipstatus (Singel, Relationship, Complicated, ...)
- Gender
- Description (Max 20 tegn els)
- Email
- Profileimage
- Password
- Salt
- EventsCreated <!-- Burde endres til spørring -->
- EventsJoined <!-- Burde endres til spørring -->
- EventBails <!-- Burde endres til spørring -->
- Role

**UserRelation**

<!-- Viktig å sjekke om det finnes en relasjon mellom brukerene før man gjør operasjoner -->

- UserrelationID (PK) <!-- Vurdere kombo nøkkel -->
- User_first_id (FK)
- User_second_id (FK)
- Type (pending_first_second, pending_second_first, friends, blocked_first_second, blocked_second_first, blocked_both) <!-- Slett ved decline??? -->

**Event**

- EventID (PK)
- Eventname
- EventDescription
- EventDateTimeStart
- EventDateTimeEnd
- Visibility (public, private, friends)
- InviteURL
- FrontImage

**Location**

- LocationID (PK)
- EventID (FK)
- Postalcode
- Address (Adresse og nummer)
- Country
- City

**EventRelation**

- EventRelationID (PK)
- EventID (FK)
- UserID (FK)
- Type (joined, declined, pending, bailed)
- EventRole (Creator, Host, participant)

<br />

# Dont start on theese before the app runs

**!Post!** <!-- Denne må kobles direkte til ett event, mulig brukeren som legger det ut også? -->

**Message**

**Poll**
