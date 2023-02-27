import React from "react";
import { useStateValue } from "../state";

const DiagnosesCodes = ({ diagnosesCodes }: { diagnosesCodes: string[] }) => {
  const [{ diagnoses }] = useStateValue();

  if (Object.entries(diagnoses).length === 0) return null;

  return (
    <>
      <b>Diagnoses:</b>
      <ul>
        {diagnosesCodes.map((d, i) => (
          <li key={i}>
            {d}: {diagnoses[d].name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default DiagnosesCodes;
