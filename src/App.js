import React from 'react';
import './App.css';
import Header from "./containers/header";
import Footer from "./containers/footer"
import FindingFalcone from "./components/FindingFalcone";
import IntroModal from "./components/IntroModal";
function App() {
  return (
    <div className="App">
     <div className="container">
      <Header  />
      <FindingFalcone  />
      <Footer  />
      <IntroModal  />
     </div>
    </div>
  );
}

export default App;
