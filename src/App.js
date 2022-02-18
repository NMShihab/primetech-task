import "./App.css";
import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ProductDetails from "./Components/ProductDetails";
import { UserProvider } from "./Context/UserContext";
import Header from "./Components/Header";

function App() {
  var retrievedObject = localStorage.getItem("token");
  console.log("Called from APP : ", retrievedObject);
  return (
    <UserProvider>
      <div className="App">
        <Header />
        <main className="py-2">
          <Routes>
            {/* {retrievedObject.length === 0 && (
              <Route path="login" element={<Login />} />
            )} */}
            <Route path="/" element={<Home />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
