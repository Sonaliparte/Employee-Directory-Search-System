
import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import EmployeeList from "./components/EmployeeList";
import StatusMessage from "./components/StatusMessage";

import useDebounce from "./hooks/useDebounce";
import { fetchEmployees } from "./services/employeeService";

export default function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 350);

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadEmployees() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchEmployees({
          search: debouncedSearch,
          limit: 20,
          offset: 0,
          signal: controller.signal,
        });

        if (active) {
          setEmployees(data);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        if (active) {
          setError(
            err.message ||
              "Something went wrong. Please try again."
          );
          setEmployees([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadEmployees();

    return () => {
      active = false;
      controller.abort();
    };
  }, [debouncedSearch]);

  return (
    <main className="app-container">
      <header className="page-header">
        <p className="eyebrow">INTERNAL TOOLS</p>
        <h1>Employee Directory</h1>
        <p>
          Find colleagues by their name or department.
        </p>
      </header>

      <section aria-label="Employee search">
        <SearchBar value={search} onChange={setSearch} />
      </section>

      <section className="results-section">
        <div className="results-heading">
          <h2>Employees</h2>
          {!loading && !error && (
            <span>{employees.length} shown</span>
          )}
        </div>

        {loading && (
          <StatusMessage>
            Loading employees...
          </StatusMessage>
        )}

        {!loading && error && (
          <StatusMessage type="error">
            {error}
          </StatusMessage>
        )}

        {!loading && !error && employees.length === 0 && (
          <StatusMessage>
            No employees found. Try another name or department.
          </StatusMessage>
        )}

        {!loading && !error && employees.length > 0 && (
          <EmployeeList employees={employees} />
        )}
      </section>
    </main>
  );
}
