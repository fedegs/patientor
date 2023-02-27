import { Card, CardContent, Typography } from "@material-ui/core";
import HealthRatingBar from "../components/HealthRatingBar";
import { HealthCheckEntry } from "../types";
import DiagnosesCodes from "./DiagnosesCodes";

const HealthCheckEntryType = ({ entry }: { entry: HealthCheckEntry }) => {
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
          <Typography variant="h5">🧑‍⚕️ Health check entry</Typography>
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
          <div style={{ display: "flex", marginTop: "5px" }}>
            <b>Health check rating:</b>
            <HealthRatingBar
              rating={entry.healthCheckRating}
              showText={false}
            />
          </div>
          <b>Diagnose by: </b>
          {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryType;
