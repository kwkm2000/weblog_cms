import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

export interface Tag {
  id: number;
  label: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function TagNew() {
  const [label, setLabel] = useState("");
  const onSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const data = {
        label,
      };
      fetch("http://13.231.5.6:4000/tags", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(() => {
          console.log("Success");
          setLabel("");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [label]
  );
  const onChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setLabel(value);
  }, []);

  return (
    <main>
      <h1>New Tag</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" onChange={onChange} />
        </div>
        <button>Submit</button>
      </form>
      <p>
        <Link to="/">Topへ</Link>
      </p>
    </main>
  );
}
