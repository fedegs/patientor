import { Button, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import {
  DiagnosisSelection,
  EntryTypeOption,
  HealthCheckRatingOption,
  SelectField,
  TextField,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryType, HealthCheckRating, EntryFormValues } from "../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const initialValues: EntryFormValues = {
  type: EntryType.Hospital,
  date: "",
  description: "",
  diagnosisCodes: [],
  specialist: "",
  dischargeDate: "",
  dischargeCriteria: "",
  healthCheckRating: HealthCheckRating.Healthy,
  employerName: "",
  sickLeaveStartDate: "",
  sickLeaveEndDate: "",
};

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required.";
        const invalidDate =
          "Invalid format. Please enter a date in format YYYY-MM-DD.";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date) {
          if (!RegExp(/\d{4}-\d{2}-\d{2}/).test(values.date)) {
            errors.date = invalidDate;
          }
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === EntryType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (values.sickLeaveStartDate) {
            if (!RegExp(/\d{4}-\d{2}-\d{2}/).test(values.sickLeaveStartDate)) {
              errors.sickLeaveStartDate = invalidDate;
            }
          }
          if (values.sickLeaveEndDate) {
            if (!RegExp(/\d{4}-\d{2}-\d{2}/).test(values.sickLeaveEndDate)) {
              errors.sickLeaveEndDate = invalidDate;
            }
          }
        }
        if (values.type === EntryType.Hospital) {
          if (values.dischargeDate) {
            if (!RegExp(/\d{4}-\d{2}-\d{2}/).test(values.dischargeDate)) {
              errors.dischargeDate = invalidDate;
            }
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              name="date"
              label="Date"
              placeholder="YYYY-MM-DD"
              component={TextField}
            />
            <Field
              name="description"
              label="Description"
              placeholder="Description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              name="specialist"
              label="Specialist"
              placeholder="Specialist"
              component={TextField}
            />
            {values.type === EntryType.Hospital ? (
              <>
                <Field
                  name="dischargeDate"
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  component={TextField}
                />
                <Field
                  name="dischargeCriteria"
                  label="Discharge criteria"
                  placeholder="Discharge criteria"
                  component={TextField}
                />
              </>
            ) : null}
            {values.type === EntryType.HealthCheck ? (
              <>
                <SelectField
                  label="Health check rating"
                  name="healthCheckRating"
                  options={healthCheckRatingOptions}
                />
              </>
            ) : null}
            {values.type === EntryType.OccupationalHealthcare ? (
              <>
                <Field
                  name="employerName"
                  label="Employer name"
                  placeholder="Employer name"
                  component={TextField}
                />
                <Field
                  name="sickLeaveStartDate"
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  component={TextField}
                />
                <Field
                  name="sickLeaveEndDate"
                  label="Sick leave end date"
                  placeholder="YYYY-MM-DD"
                  component={TextField}
                />
              </>
            ) : null}

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
