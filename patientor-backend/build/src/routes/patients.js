"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const patientsRouter = (0, express_1.Router)();
patientsRouter.get('/', (_req, res) => {
    res.json(patientsService_1.default.getNonSensitivePatients());
});
patientsRouter.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = (0, utils_1.toNewPatient)(req.body);
        const addedPatient = patientsService_1.default.addPatient(newPatient);
        return res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ` Error: ${error.message}`;
        }
        return res.send(errorMessage);
    }
});
patientsRouter.get('/:id', (req, res) => {
    const patient = patientsService_1.default.getPatient(req.params.id);
    if (patient) {
        return res.json(patient);
    }
    return res.status(404).send('patient not found');
});
exports.default = patientsRouter;
