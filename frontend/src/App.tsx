import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MaterialScreen from "./screens/MaterialScreen";

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
        <Route path="/materials" element={<MaterialScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
