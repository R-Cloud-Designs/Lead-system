import { z } from 'zod';

export function surrealId<Table extends string = string>(table?: Table) {
  return z.custom<`${Table}:${string}`>(
    (val) => (typeof val === 'string' && table ? val.startsWith(`${table}:`) : true),
    {
      message: ['Must be a record', table && `Table must be: "${table}"`].filter(Boolean).join('; '),
    }
  );
}

export type SurrealId<Table extends string = string> = z.infer<ReturnType<typeof surrealId<Table>>>;

export function createSurrealId<Table extends string = string>(table: Table) {
  return (id: string) => `${table}:${id}` as SurrealId<Table>;
}
