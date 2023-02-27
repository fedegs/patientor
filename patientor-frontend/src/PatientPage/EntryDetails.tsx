import { Entry, EntryType } from "../types";
import HealthCheckEntryType from "./HealthCheckEntryType";
import HospitalEntryType from "./HospitalEntryType";
import OccupationalEntryType from "./OccupationalEntryType";

export default function EntryDetails({ entry }: { entry: Entry }) {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntryType entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheckEntryType entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalEntryType entry={entry} />;
    default:
      return null;
  }
}
