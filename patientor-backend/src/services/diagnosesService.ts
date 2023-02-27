import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses = diagnosesData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};
