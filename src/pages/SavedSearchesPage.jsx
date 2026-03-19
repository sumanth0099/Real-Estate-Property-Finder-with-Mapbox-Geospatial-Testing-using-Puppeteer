import React from 'react';
import { useNavigate } from 'react-router-dom';

function SavedSearchesPage({ savedSearches, deleteSearch }) {
  const navigate = useNavigate();

  const handleLoad = (search) => {
    // Navigate to properties page and apply saved search
    navigate('/properties', { state: { loadedSearch: search } });
  };

  return (
    <div className="saved-searches-container">
      <h1 className="saved-searches-title">💾 Saved Searches</h1>

      {savedSearches.length === 0 ? (
        <div data-testid="no-saved-searches" className="no-saved-searches">
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
          <h3>No saved searches yet</h3>
          <p>Save your search filters to quickly find properties later</p>
          <button
            className="btn-apply"
            style={{ marginTop: 20, padding: '12px 24px' }}
            onClick={() => navigate('/search')}
          >
            Start Searching
          </button>
        </div>
      ) : (
        <div className="saved-searches-list">
          {savedSearches.map(search => (
            <div
              key={search.id}
              data-testid={`saved-search-${search.id}`}
              className="saved-search-card"
            >
              <div className="saved-search-header">
                <div className="saved-search-name">{search.name}</div>
                <div className="saved-search-date">
                  {new Date(search.savedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="saved-search-criteria">
                {search.criteria && search.criteria.map((c, i) => (
                  <span key={i} className="criteria-tag">{c}</span>
                ))}
                <span className="criteria-tag">
                  📊 {search.resultsCount} results
                </span>
              </div>

              <div className="saved-search-actions">
                <button
                  data-testid={`load-search-${search.id}`}
                  className="btn-load"
                  onClick={() => handleLoad(search)}
                >
                  🔍 Load Search
                </button>
                <button
                  data-testid={`delete-search-${search.id}`}
                  className="btn-delete"
                  onClick={() => deleteSearch(search.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedSearchesPage;
