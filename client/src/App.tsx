import { useState } from "react";
import "./App.css";
import { AlertForm } from "./components/AlertForm";
import AlertsMap from "./components/AlertsMap";
import { FilterSearch } from "./components/FilterSearch";
import { useAlerts } from "./hooks/useAlerts";
import { AlertCard } from "./components/AlertCard";
import type { Alert } from "./types/alertModel";

function App() {
  const { alerts, error, addAlert, editAlert, removeAlert } = useAlerts();

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [arena, setArena] = useState("All");

  const [selectedAlert, setSelected] = useState<Alert | null>(null);
  const [editingAlert, setEditing] = useState<Alert | null>(null);

  const [formOpen, setFormOpen] = useState(false);

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    data: Alert,
  ) => {
    e.preventDefault();

    if (editingAlert) {
      await editAlert(editingAlert.id, data);
    } else {
      await addAlert(data);
    }
    setFormOpen(false);
  };

  const alertsToFormat = alerts.map((a) => {
    return { ...a, id: a._id };
  });

  const filteredAlerts = alertsToFormat.filter((a) => {
    const inSearch = search
      ? a.displayName
          .trim()
          .toLocaleLowerCase()
          .includes(search.trim().toLowerCase())
      : true;
    const hasPriority = priority !== "All" ? a.priority === priority : true;
    const hasArena = arena !== "All" ? a.arena === arena : true;
    return inSearch && hasPriority && hasArena;
  });

  return (
    <div className="web-body">
      <div>
        {!formOpen && (
          <FilterSearch
            search={search}
            setSearch={setSearch}
            priority={priority}
            setPriority={setPriority}
            arena={arena}
            setArena={setArena}
          />
        )}
        {!formOpen && (
          <button onClick={() => setFormOpen(true)}>Add new alert</button>
        )}

        {formOpen && (
          <AlertForm
            onSubmit={handleFormSubmit}
            onCancel={() => setFormOpen(false)}
            error={error}
            initialItems={editingAlert}
          />
        )}
        {!formOpen && filteredAlerts.length === 0 && <h2>Alerts list is empty..</h2>}

        {!formOpen && !selectedAlert && (
          <ul className="cards-list">
            {filteredAlerts.map((alert) => (
              <AlertCard
                alert={alert}
                onEdit={() => {
                  setFormOpen(true);
                  setEditing(alert);
                }}
                onSelect={() => {
                  setSelected(alert);
                }}
                onDelete={async () => {
                  await removeAlert(alert.id);
                }}
                selected={false}
              />
            ))}
          </ul>
        )}

        {!formOpen && selectedAlert && (
          <div>
            <button onClick={() => setSelected(null)}>Back...</button>
            <AlertCard
              alert={selectedAlert}
              onEdit={() => {
                setFormOpen(true);
                setEditing(selectedAlert);
              }}
              onDelete={async () => {
                await removeAlert(selectedAlert.id);
              }}
              onSelect={() => {}}
              selected={true}
            />
          </div>
        )}
      </div>

      <AlertsMap alerts={filteredAlerts} />
    </div>
  );
}

export default App;
