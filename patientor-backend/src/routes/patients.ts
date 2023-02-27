import { Router } from 'express';
import patientsService from '../services/patientsService';
import { toNewEntry, toNewPatient } from '../utils';

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
  res.json(patientsService.getNonSensitivePatients());
});

patientsRouter.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    return res.json(addedPatient);
  } catch (error) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    return res.send(errorMessage);
  }
});

patientsRouter.get('/:id', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (patient) {
    return res.json(patient);
  }
  return res.status(404).send('patient not found');
});

patientsRouter.post('/:id/entries', (req, res) => {
  try {
    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entry = toNewEntry(req.body);
    const updatedPatient = patientsService.addNewEntry(req.params.id, entry);
    return res.status(200).json(updatedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    return res.status(400).json({
      error: errorMessage
    });
  }
});

export default patientsRouter;
