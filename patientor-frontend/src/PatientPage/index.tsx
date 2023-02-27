import React from "react";
import { Button, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { EntryFormValues, Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { updatePatient } from "../state";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { toNewEntry } from "../utils";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>() as { id: string };
  const [patient, setPatient] = React.useState<Patient>(patients[id]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        if (!patientFromApi) {
          throw new Error("patient not found");
        }
        dispatch(updatePatient(patientFromApi));
        setPatient(patientFromApi);
      } catch (error) {
        console.error(error);
      }
    };

    if (!patient || !patient.ssn) {
      void fetchPatient(id);
    }
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const submitNewEntry = async (entry: EntryFormValues) => {
    try {
      const parsedEntry = toNewEntry(entry);
      console.log(parsedEntry);
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        parsedEntry
      );
      closeModal();
      dispatch(updatePatient(updatedPatient));
      setPatient(updatedPatient);
    } catch (e) {
      console.error(e.response.data);
    }
  };

  if (!patient) return null;

  return (
    <div>
      <Typography variant="h4" style={{ margin: "1em 0em" }}>
        {patient.name}{" "}
        {patient.gender === "male"
          ? "♂️"
          : patient.gender === "female"
          ? "♀️"
          : "⚥"}
      </Typography>
      <Typography>
        <b>SSN:</b> {patient.ssn}
        <br />
        <b>Occupation:</b> {patient.occupation}
      </Typography>
      <Typography variant="h4" style={{ margin: "1em 0em" }}>
        Entries
      </Typography>
      {patient.entries?.map((e, i) => (
        <div key={i} style={{ marginBottom: "1em" }}>
          <EntryDetails entry={e} />
        </div>
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
      />
      <Button variant="contained" onClick={openModal}>
        Add entry
      </Button>
    </div>
  );
};

export default PatientPage;
