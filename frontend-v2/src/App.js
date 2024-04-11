import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Accessories from "./scenes/accessories";
import Asset from "./scenes/assets";
import UserProfile from "./scenes/user-profile";
import Form from "./scenes/form";
import AddAsset from "./scenes/addAsset";
import Location from "./scenes/location";
import SignIn from "./scenes/signIn";
import AssetDetails from "./components/AssetDetails";
import PersonDetails from "./components/PersonDetails";
import Calendar from "./scenes/calendar";
import FAQPage from "./scenes/faq";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const isAuthenticated = true; // Replace this with your authentication logic

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated ? (
            <>
              <Sidebar />
              <main className="content">
                <Topbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/assets" element={<Asset />} />
                  <Route path="/accessories" element={<Accessories />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/addAsset" element={<AddAsset />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/user-profile" element={<UserProfile />} />
                  <Route path ="/calendar" element={<Calendar />} />
                  <Route path ="/faq" element={<FAQPage />} />
                  <Route path="/asset-details" element={<AssetDetails/>} />
                  <Route path="/person-details" element={<PersonDetails/>} />
                </Routes>
              </main>
            </>
          ) : (
            <Routes>
              <Route path="/signIn" element={<SignIn />} />
              <Route path="*" element={<Navigate to="/signIn" />} />
            </Routes>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
