import React, { useState } from 'react';
import { ref, set, onValue } from "firebase/database";
import { db } from "./firebase";

export const Context = React.createContext();

export default function ContextProvider(props) {
  const [JobsState, setJobsState] = useState(null);

  const priority = ["Urgent", "Regular", "Trivial"];

  const initDB = JobsState === null ? getDB() : true;
  if (!initDB) return (<div className='loading'>loading</div>);

  function getDB() {
    onValue(ref(db, "jobs/"), (snapshot) => {
      if (snapshot.val())
        setJobsState(snapshot.val());
      else
        setJobsState("");
    });
    return false;
  }

  return (
    <Context.Provider
      value={{
        jobs: JobsState,
        priority: priority,
        saveData: (data) => {
          const rnd = Date.now() + "-" + Math.floor(Math.random() * 1000000000).toString();
          const record = {
            id: rnd,
            name: data.name,
            priority: data.priority
          }
          set(ref(db, "jobs/" + rnd), record);
        },
        editClick: (v) => {
          //console.log(v);
          set(ref(db, "jobs/" + v.id), v.data);
        },
        deleteClick: (jobId) => {
          //console.log(jobId);
          set(ref(db, "jobs/" + jobId), null);
        }
      }}
    >
      {props.children}
    </Context.Provider>
  );
}