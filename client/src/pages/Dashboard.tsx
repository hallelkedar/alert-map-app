import { useMemo, useState } from "react";
import { AlertForm } from "../components/AlertForm";
import AlertsMap from "../components/AlertsMap";
import { FilterSearch } from "../components/FilterSearch";
import { useAlerts } from "../hooks/useAlerts";
import { AlertCard } from "../components/AlertCard";
import type { AlertInput } from "../types/alertModel";
import { NavBar } from "../components/NavBar";
import { useAuthStore } from "../store/authStore";

export const Dashboard = () => {
  const {
    alerts,
    loading,
    error,
    clearError,
    addAlert,
    editAlert,
    removeAlert,
  } = useAlerts();

  const safeALerts = alerts ?? []

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [arena, setArena] = useState("All");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const selectedAlert = safeALerts.find((a) => a.id === selectedId) ?? null;
  const editingAlert = safeALerts.find((a) => a.id === editingId) ?? null;

  const openCreate = () => {
    clearError();
    setEditingId(null);
    setFormOpen(true);
  };

  const openEdit = (id: string) => {
    clearError();
    setEditingId(id);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
  };

  const handleFormSubmit = async (data: AlertInput) => {
    const ok = editingAlert
      ? await editAlert(editingAlert.id, data)
      : await addAlert(data);
    if (ok) closeForm();
  };

  const handleDelete = async (id: string) => {
    const ok = await removeAlert(id);
    if (ok && id === selectedId) setSelectedId(null);
  };

  const filteredAlerts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return safeALerts.filter(
      (a) =>
        a.displayName.toLowerCase().includes(term) &&
        (priority === "All" || a.priority === priority) &&
        (arena === "All" || a.arena === arena),
    );
  }, [alerts, search, priority, arena]);

  const mapAlerts = selectedAlert ? [selectedAlert] : filteredAlerts;

  return (
    <div className="web-body">
      <NavBar
        username={user.username}
        userRole={user.role}
        isAdmin={user.role === "admin"}
        onLogout={logout}
      />
      <div className="side-panel">
        {error && !formOpen && <span style={{ color: "red" }}>{error}</span>}
        {loading && <p>Loading...</p>}

        {!formOpen && !selectedAlert && (
          <>
            <FilterSearch
              search={search}
              setSearch={setSearch}
              priority={priority}
              setPriority={setPriority}
              arena={arena}
              setArena={setArena}
            />
            <button onClick={openCreate}>Add new alert</button>
            {!loading && filteredAlerts.length === 0 && (
              <h2>Alerts list is empty..</h2>
            )}
            <ul className="cards-list">
              {filteredAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onEdit={() => openEdit(alert.id)}
                  onSelect={() => setSelectedId(alert.id)}
                  onDelete={() => handleDelete(alert.id)}
                  selected={false}
                />
              ))}
            </ul>
          </>
        )}

        {formOpen && (
          <AlertForm
            key={editingId ?? "new"}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
            error={error}
            initialItems={editingAlert}
          />
        )}

        {!formOpen && selectedAlert && (
          <div>
            <button onClick={() => setSelectedId(null)}>Back...</button>
            <AlertCard
              alert={selectedAlert}
              onEdit={() => openEdit(selectedAlert.id)}
              onDelete={() => handleDelete(selectedAlert.id)}
              onSelect={() => {}}
              selected={true}
            />
          </div>
        )}
      </div>

      <div className="map-panel">
        <AlertsMap alerts={mapAlerts} height={"100%"} />
      </div>
    </div>
  );
};
