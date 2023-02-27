import patientsData from '../../data/patients';
import { Patient, newPatient, PublicPatient, NewEntry } from '../types';
import { v4 as uuid } from 'uuid';

let patients = patientsData;

const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: newPatient): Patient => {
  const patientToAdd = {
    id: uuid(),
    entries: [],
    ...patient
  };

  patients.push(patientToAdd);
  return patientToAdd;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addNewEntry = (id: string, entry: NewEntry): Patient => {
  const patient = getPatient(id);
  if (!patient) {
    throw new Error('patient not found');
  }

  const entryToAdd = {
    id: uuid(),
    ...entry
  };
  const updatedPatient = {
    ...patient,
    entries: [...patient.entries, entryToAdd]
  };

  patients = patients.map((p) => (p.id === id ? updatedPatient : p));
  return updatedPatient;
};

export default { getNonSensitivePatients, addPatient, getPatient, addNewEntry };
