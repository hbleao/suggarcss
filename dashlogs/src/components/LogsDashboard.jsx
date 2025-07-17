import React, { useState, useEffect, useMemo } from 'react';
import './LogsDashboard.scss';

const LogsDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all-logs'); // 'all-logs' or 'top-errors'
  const [filter, setFilter] = useState({
    logLevel: '',
    application: '',
    environment: '',
    startDate: '',
    endDate: ''
  });
  
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        // In a real application, this would be an API call
        const response = await fetch('/data/logs-insights-results.json');
        const data = await response.json();
        setLogs(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load logs. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchLogs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const filteredLogs = logs.filter(log => {
    const messageData = log['@message'];
    if (!messageData) return false;
    
    // Apply filters
    if (filter.logLevel && messageData.log_level !== filter.logLevel) return false;
    if (filter.application && messageData.application && !messageData.application.includes(filter.application)) return false;
    if (filter.environment && messageData.environment !== filter.environment) return false;
    
    // Date filtering
    if (filter.startDate || filter.endDate) {
      const logDate = new Date(log['@timestamp']);
      if (filter.startDate && new Date(filter.startDate) > logDate) return false;
      if (filter.endDate && new Date(filter.endDate) < logDate) return false;
    }
    
    return true;
  });

  // Extract unique values for filters
  const logLevels = [...new Set(logs.filter(log => log['@message'] && log['@message'].log_level).map(log => log['@message'].log_level))];
  const applications = [...new Set(logs.filter(log => log['@message'] && log['@message'].application).map(log => log['@message'].application))];
  const environments = [...new Set(logs.filter(log => log['@message'] && log['@message'].environment).map(log => log['@message'].environment))];

  // Process logs to get top 30 errors
  const topErrors = useMemo(() => {
    if (!logs || logs.length === 0) return [];
    
    // Only look at error logs
    const errorLogs = logs.filter(log => 
      log['@message'] && 
      log['@message'].log_level && 
      log['@message'].log_level.toUpperCase() === 'ERROR'
    );
    
    // Group by error message
    const errorGroups = {};
    errorLogs.forEach(log => {
      const errorMessage = log['@message']?.log_message || 'Unknown error';
      // Use first 100 chars as key to group similar errors
      const errorKey = errorMessage.substring(0, 100);
      
      if (!errorGroups[errorKey]) {
        errorGroups[errorKey] = {
          message: errorMessage,
          count: 1,
          examples: [log]
        };
      } else {
        errorGroups[errorKey].count += 1;
        if (errorGroups[errorKey].examples.length < 5) { // Keep up to 5 examples
          errorGroups[errorKey].examples.push(log);
        }
      }
    });
    
    // Convert to array and sort by count (descending)
    const sortedErrors = Object.values(errorGroups)
      .sort((a, b) => b.count - a.count)
      .slice(0, 30); // Get top 30
    
    return sortedErrors;
  }, [logs]);
  
  return (
    <div className="logs-dashboard">
      <header className="dashboard-header">
        <h1>Logs Dashboard</h1>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'all-logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('all-logs')}
          >
            All Logs
          </button>
          <button 
            className={`tab ${activeTab === 'top-errors' ? 'active' : ''}`}
            onClick={() => setActiveTab('top-errors')}
          >
            Top 30 Errors
          </button>
        </div>
      </header>
      
      {activeTab === 'all-logs' && <div className="filter-panel">
        <div className="filter-group">
          <label htmlFor="logLevel">Log Level:</label>
          <select 
            id="logLevel" 
            name="logLevel" 
            value={filter.logLevel} 
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {logLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="application">Application:</label>
          <select 
            id="application" 
            name="application" 
            value={filter.application} 
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {applications.map(app => (
              <option key={app} value={app}>{app}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="environment">Environment:</label>
          <select 
            id="environment" 
            name="environment" 
            value={filter.environment} 
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {environments.map(env => (
              <option key={env} value={env}>{env}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="startDate">From:</label>
          <input 
            id="startDate" 
            name="startDate" 
            type="date" 
            value={filter.startDate} 
            onChange={handleFilterChange} 
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="endDate">To:</label>
          <input 
            id="endDate" 
            name="endDate" 
            type="date" 
            value={filter.endDate} 
            onChange={handleFilterChange} 
          />
        </div>
      </div>}

      {activeTab === 'all-logs' && (
        <div className="logs-container">
          {loading ? (
            <div className="loading">Loading logs...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="logs-table-container">
              <div className="logs-count">Showing {filteredLogs.length} of {logs.length} logs</div>
              <table className="logs-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Level</th>
                    <th>Application</th>
                    <th>Environment</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.slice(0, 100).map((log, index) => (
                    <tr key={`log-${index}`} className={`log-level-${log['@message'] && log['@message'].log_level ? log['@message'].log_level.toLowerCase() : 'unknown'}`}>
                      <td>{log['@timestamp'] ? new Date(log['@timestamp']).toLocaleString() : 'N/A'}</td>
                      <td>{log['@message']?.log_level || 'N/A'}</td>
                      <td>{log['@message']?.application || 'N/A'}</td>
                      <td>{log['@message']?.environment || 'N/A'}</td>
                      <td className="log-message">{log['@message']?.log_message || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredLogs.length > 100 && (
                <div className="logs-limit-note">
                  Showing first 100 results. Apply filters to see more specific logs.
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'top-errors' && (
        <div className="top-errors-container">
          {loading ? (
            <div className="loading">Loading error statistics...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <h2>Top 30 Most Common Errors</h2>
              {topErrors.length === 0 ? (
                <div className="no-errors">No errors found in the logs.</div>
              ) : (
                <div className="error-list">
                  {topErrors.map((errorItem, index) => (
                    <div key={`error-${index}`} className="error-card">
                      <div className="error-header">
                        <span className="error-count">#{index + 1} - {errorItem.count} occurrences</span>
                      </div>
                      <div className="error-message">{errorItem.message}</div>
                      <div className="error-details">
                        <div className="error-detail-header">Examples:</div>
                        {errorItem.examples.slice(0, 3).map((example, exIndex) => (
                          <div key={`example-${index}-${exIndex}`} className="error-example">
                            <div className="example-timestamp">{new Date(example['@timestamp']).toLocaleString()}</div>
                            <div className="example-app">{example['@message']?.application || 'Unknown Application'}</div>
                            <div className="example-env">{example['@message']?.environment || 'Unknown Environment'}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LogsDashboard;
