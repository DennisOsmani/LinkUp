# Critical for good user experience

- When a user gets a unauthorized response on a api request
  - clear the token in token provider
  - then the user will be returned to the login/register wall to login again
  - resulting in not blocking a user from getting their data
  - Also need to clear the token when a user log out
- Er ikke mulig å slette invites når man går tilbake til InviteModal
