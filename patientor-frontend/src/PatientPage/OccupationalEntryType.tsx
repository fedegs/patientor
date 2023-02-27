import { Card, CardContent, Typography } from "@material-ui/core";
import { OccupationalHealthcareEntry } from "../types";
import DiagnosesCodes from "./DiagnosesCodes";

const OccupationalEntry = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Card>
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1em",
          }}
        >
          <Typography variant="h5">💼 Occupational healthcare entry</Typography>
          <Typography
            style={{ fontSize: "14px" }}
            color="textSecondary"
            gutterBottom
          >
            {entry.date}
          </Typography>
        </div>
        <Typography component={"span"} variant="body2">
          <b>Description: </b>
          {entry.description}
          <br></br>
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
            <DiagnosesCodes diagnosesCodes={entry.diagnosisCodes} />
          ) : null}
          <b>Employer: </b>
          {entry.employerName}
          <br></br>
          {entry.sickLeave ? (
            <>
              <b>Sick leave start: </b>
              {entry.sickLeave.startDate}
              <br />
              <b>Sick leave end: </b>
              {entry.sickLeave.endDate}
              <br />
            </>
          ) : null}
          <b>Diagnose by: </b>
          {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OccupationalEntry;
