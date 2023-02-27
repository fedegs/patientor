import { EntryFormValues, EntryType, NewEntry } from "./types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewEntry = (entry: EntryFormValues): NewEntry => {
  switch (entry.type) {
    case EntryType.HealthCheck:
      return {
        date: entry.date,
        description: entry.description,
        diagnosisCodes: entry.diagnosisCodes,
        specialist: entry.specialist,
        healthCheckRating: entry.healthCheckRating,
        type: EntryType.HealthCheck,
      };
    case EntryType.Hospital:
      return {
        date: entry.date,
        description: entry.description,
        diagnosisCodes: entry.diagnosisCodes,
        specialist: entry.specialist,
        ...(entry.dischargeDate && entry.dischargeCriteria
          ? {
              discharge: {
                date: entry.dischargeDate,
                criteria: entry.dischargeCriteria,
              },
            }
          : {}),
        type: EntryType.Hospital,
      };
    case EntryType.OccupationalHealthcare:
      return {
        date: entry.date,
        description: entry.description,
        diagnosisCodes: entry.diagnosisCodes,
        specialist: entry.specialist,
        employerName: entry.employerName,
        ...(entry.sickLeaveStartDate && entry.sickLeaveEndDate
          ? {
              sickLeave: {
                startDate: entry.sickLeaveStartDate,
                endDate: entry.sickLeaveEndDate,
              },
            }
          : {}),
        type: EntryType.OccupationalHealthcare,
      };
    default:
      return assertNever(entry.type);
  }
};
