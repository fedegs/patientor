import {
  newPatient,
  Gender,
  Diagnosis,
  BaseEntry,
  EntryType,
  HealthCheckRating,
  Discharge,
  SickLeave,
  NewEntry
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error('Incorrect or missing property');
  }
  return string;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

// equal to parseName, could be more validations in future
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error();
  }
  return gender;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}: Fields): newPatient => {
  const patient: newPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation)
  };
  return patient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidEntryType = (type: any): type is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(type);
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isValidEntryType(type)) {
    throw new Error('Entry type is invalid');
  }
  return type;
};

const isHealthCheckRating = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (HealthCheckRating[healthCheckRating]) {
    return true;
  }
  return false;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('invalid health check rating');
  }
  return healthCheckRating;
};

type EntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  type: unknown;
  healthCheckRating?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
  discharge?: unknown;
};

const isDiagnosisCodes = (codes: unknown): boolean => {
  if (Array.isArray(codes)) {
    return codes.every((c) => isString(c));
  }
  return false;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis['code']> => {
  if (!isDiagnosisCodes(diagnosisCodes)) {
    throw new Error('invalid diagnosis code');
  }
  return diagnosisCodes as Array<Diagnosis['code']>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any): discharge is Discharge => {
  if (
    discharge.date &&
    isString(discharge.date) &&
    isDate(discharge.date as string) &&
    discharge.criteria &&
    isString(discharge.criteria)
  )
    return true;
  return false;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('invalid discharge');
  }
  return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  if (
    sickLeave.startDate &&
    isString(sickLeave.startDate) &&
    isDate(sickLeave.startDate as string) &&
    sickLeave.endDate &&
    isString(sickLeave.endDate) &&
    isDate(sickLeave.endDate as string)
  )
    return true;
  return false;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('invalid sick leave');
  }
  return sickLeave;
};

const toBaseEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes
}: {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
}): Omit<BaseEntry, 'id'> => {
  return {
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
    ...(diagnosisCodes
      ? {
          diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
        }
      : {})
  };
};

const toNewEntry = (entry: EntryFields): NewEntry => {
  const newBaseEntry = toBaseEntry(entry);
  const parsedType = parseType(entry.type);
  switch (parsedType) {
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        type: parsedType,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
      };
    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        type: parsedType,
        ...(entry.discharge
          ? { discharge: parseDischarge(entry.discharge) }
          : {})
      };
    case EntryType.OccupationalHealthcare:
      return {
        ...newBaseEntry,
        type: parsedType,
        employerName: parseString(entry.employerName),
        ...(entry.sickLeave
          ? { sickLeave: parseSickLeave(entry.sickLeave) }
          : {})
      };
  }
};

export { toNewPatient, toNewEntry };
