import React, { ReactElement, ComponentType } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MaterialScreen from "./screens/MaterialScreen";
import { getAuthToken } from "./util/auth";

// handle route protection for materials page
function ProtectedRoute({
  element: Element,
}: {
  element: ComponentType;
}): ReactElement {
  const token = getAuthToken();

  // Check if the token exists
  if (token) {
    const expirationTime = Number(localStorage.getItem("expiry"));
    const currentTime = Date.now();
    console.log(expirationTime);
    console.log(currentTime);
    console.log(token);
    console.log(localStorage.getItem("NIK"));
    if (currentTime > expirationTime) {
      // Redirect to a login page or handle unauthorized access
      localStorage.removeItem("token");
      localStorage.removeItem("NIK");
      localStorage.removeItem("expiry");
      return <Navigate to="/login" replace />;
    } else {
      return <Element />;
    }
  } else {
    // Redirect to a login page or handle unauthorized access
    return <Navigate to="/login" replace />;
  }
}

// leftoff for MaterialHeader
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <main>
                <Container>
                  <HomeScreen />
                </Container>
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Header />
              <main>
                <Container>
                  <SignupScreen />
                </Container>
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <main>
                <Container>
                  <LoginScreen />
                </Container>
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/materials"
          element={<ProtectedRoute element={MaterialScreen} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
