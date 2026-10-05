export const FilterSearch = ({
  search,
  setSearch,
  priority,
  setPriority,
  arena,
  setArena,
}: {
  search: string;
  setSearch: (term: string) => void;
  priority: string;
  setPriority: (term: string) => void;
  arena: string;
  setArena: (term: string) => void;
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for alerts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        {["All", "Low", "Medium", "High", "Critical"].map(p => <option value={p}>{p}</option>)}
      </select>

      <select value={arena} onChange={(e) => setArena(e.target.value)}>
        {["All", "North", "South", "Center"].map(p => <option value={p}>{p}</option>)}
      </select>
    </div>
  );
};
