// App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProfileListPage from "./pages/ProfileListPage";
import ProfileCardPage from "./pages/ProfileCardPage";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 250,
            borderRight: "1px solid #ddd",
            padding: 16,
          }}
        >
          <h2>Components</h2>

          <nav>
            <ul>
              <li>
                <Link to="/profile-list">
                  sourcer-profile-list
                </Link>
              </li>

              <li>
                <Link to="/profile-card">
                  sourcer-profile-card
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: 24 }}>
          <Routes>
            <Route
              path="/profile-list"
              element={<ProfileListPage />}
            />

            <Route
              path="/profile-card"
              element={<ProfileCardPage />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;