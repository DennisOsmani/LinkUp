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
