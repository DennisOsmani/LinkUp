## Burde fikses

- Escape / Validere inkommende objekter
- Cascade fungerer ikke
  using(var transaction = await \_context.Database.BeginTransactionAsync())
  {
  try
  {
  }
  catch(Exception e)
  {
  await transaction.RollbackAsync();
  throw new InvalidOperationException($"Error updating EventRelation role: {e.Message}");
  }
  }

- Ingen mulighet for å hente ut noe informasjon om brukeren som er logget inn,
- Løsning er å legge til UserID i tokenet, og oppdatere TokenProvider i frontend.

## UserRelation

- Fiks transaksjoner for å opprette og oppdater bruker relasjoner..
