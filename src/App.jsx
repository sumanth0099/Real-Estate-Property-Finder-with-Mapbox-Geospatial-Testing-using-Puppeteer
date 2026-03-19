import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import SearchPage from './pages/SearchPage';
import SavedSearchesPage from './pages/SavedSearchesPage';
import './styles/App.css';

function NavBar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Link to="/properties" className="nav-logo">🏠 RealFind</Link>
      <div className="nav-links">
        <Link data-testid="nav-properties" to="/properties" className={location.pathname === '/properties' ? 'active' : ''}>Properties</Link>
        <Link data-testid="nav-search" to="/search" className={location.pathname === '/search' ? 'active' : ''}>Search</Link>
        <Link data-testid="nav-saved-searches" to="/saved-searches" className={location.pathname === '/saved-searches' ? 'active' : ''}>Saved Searches</Link>
      </div>
    </nav>
  );
}

function App() {
  const [savedSearches, setSavedSearches] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);

  const saveSearch = (search) => {
    const id = Date.now().toString();
    setSavedSearches(prev => [...prev, { ...search, id, savedAt: new Date().toISOString() }]);
  };

  const deleteSearch = (id) => {
    setSavedSearches(prev => prev.filter(s => s.id !== id));
  };

  const toggleSaveProperty = (propertyId) => {
    setSavedProperties(prev =>
      prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]
    );
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/properties" replace />} />
          <Route
            path="/properties"
            element={
              <PropertiesPage
                savedProperties={savedProperties}
                toggleSaveProperty={toggleSaveProperty}
                saveSearch={saveSearch}
              />
            }
          />
          <Route
            path="/property/:id"
            element={
              <PropertyDetailPage
                savedProperties={savedProperties}
                toggleSaveProperty={toggleSaveProperty}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchPage
                savedProperties={savedProperties}
                toggleSaveProperty={toggleSaveProperty}
                saveSearch={saveSearch}
              />
            }
          />
          <Route
            path="/saved-searches"
            element={
              <SavedSearchesPage
                savedSearches={savedSearches}
                deleteSearch={deleteSearch}
              />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
