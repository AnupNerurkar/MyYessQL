import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pipeline from './components/Pipeline';
import FeatureStack from './components/FeatureStack';
import AuthPanel from './components/AuthPanel';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <div className="grain-overlay"></div>
      <Navbar />
      <main>
        <Hero />
        <Pipeline />
        <FeatureStack />
        <AuthPanel />
      </main>
      <Footer />
    </div>
  );
}

export default App;
