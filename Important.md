# Things to remember

## Dennis

- People Screen state update - Returnere UserRelation fra backend (CreateUserRelation) i handleFriendRequest - Hvis relation er FRIENDS fjern fra lista den var i (søkeresulatet) legge til personen i friends state eller PENDING så legges det til i Pending (FIXED)
  <br />

## Adrian

- remove/change CreateLocation in LocationController, model has changed and the method is probably not needed

<br />

## Amund

- Bug in Invite users (CreateEvent). Possible to remove users from the invite liste by invbiting then removin. Possible to remove users from the invite liste by invbiting then removing

TEST

- ulike caser med invitere venner fra create event
- ulike caser med å invitere venner som ikke allerede er i ett event.
