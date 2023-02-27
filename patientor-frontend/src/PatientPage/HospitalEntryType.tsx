import { Card, CardContent, Typography } from "@material-ui/core";
import { HospitalEntry } from "../types";
import DiagnosesCodes from "./DiagnosesCodes";

const HospitalEntryType = ({ entry }: { entry: HospitalEntry }) => {
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
          <Typography variant="h5">🏥 Hospital entry</Typography>
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
          <b>Discharge: </b>
          {entry.discharge
            ? `${entry.discharge.criteria} ${entry.discharge.date}`
            : "None"}
          <br></br>
          <b>Diagnose by: </b>
          {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HospitalEntryType;
