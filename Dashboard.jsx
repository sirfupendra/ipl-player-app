import React, { useState } from 'react';
import { Client, Databases, Query } from 'appwrite';
import './Dashboard.css';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('66b2699f003e24b1712e'); // Your project ID

const databases = new Databases(client);

function Dashboard() {
  const [playerName, setPlayerName] = useState('');
  const [maximumScore, setMaximumScore] = useState('');
  const [photo, setPhoto] = useState('');
  const [chart, setChart] = useState('');
  const [groundName, setGroundName] = useState('');
  const [groundPerformance, setGroundPerformance] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState('');

  // Fetch player data
  const handlePlayerSearch = async (e) => {
    e.preventDefault();
    setPlayerData(null);
    setMaximumScore('');
    setPhoto('');
    setChart('');
    setError('');

    try {
      const response = await databases.listDocuments(
        '66c6fca20034cdc14b4f', // Database ID
        '66c6fcdc0009056c2d6d', // Collection ID
        [Query.equal('name', playerName.trim())] // Query to search by player name
      );

      if (response.documents.length > 0) {
        const player = response.documents[0];
        setPlayerData(player);
        setMaximumScore(player.maximumScore || 'N/A');
        setPhoto(player.photo || '');
        setChart(player.chart || '');
      } else {
        setError('Player not found.');
      }
    } catch (error) {
      console.error('Failed to fetch player data:', error);
      setError('Failed to fetch player data. Please check your query and try again.');
    }
  };

  // Fetch ground performance
  const handleGroundPerformanceSearch = async (e) => {
    e.preventDefault();

    if (!playerData) {
      setError('Please search for a player first.');
      return;
    }

    try {
      const response = await databases.listDocuments(
        '66c6fca20034cdc14b4f', // Database ID for Ground Performance
        '66c7003c00270e8b2f28', // Collection ID for Ground Performance
        [
          Query.equal('PlayerId', playerData.$id), // Updated attribute name
          Query.equal('groundName', groundName.trim()) // Updated attribute name
        ]
      );

      if (response.documents.length > 0) {
        setGroundPerformance(response.documents[0].performanceData || 'No performance data available.');
      } else {
        setGroundPerformance('No performance data found for this ground.');
      }
    } catch (error) {
      console.error('Failed to fetch ground performance data:', error);
      setError('Failed to fetch ground performance data. Please check your query and try again.');
    }
  };

  return (
    <div id="body">
      <div id="box">
        <h1>SEARCH THE PLAYER TO SEE HIS STATS</h1>
        <form onSubmit={handlePlayerSearch}>
          <input
            type="text"
            id="input"
            placeholder="Enter player name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
          />
          <button type="submit">Search Player</button>
        </form>

        {error && <p className="error">{error}</p>}

        {playerData && (
          <div id="card">
            <h1>{playerData.name}</h1>
            {photo && <img src={photo} alt={`${playerData.name} photo`} />}
            {chart && <img src={chart} alt={`${playerData.name} chart`} />}
            <h2>Max IPL Runs: {maximumScore}</h2>

            {/* Search for ground performance */}
            <div>
              <form onSubmit={handleGroundPerformanceSearch}>
                <input
                  type="text"
                  id="input"
                  placeholder="Enter ground name"
                  value={groundName}
                  onChange={(e) => setGroundName(e.target.value)}
                />
                <button type="submit">Search Ground Performance</button>
              </form>
            </div>

            {groundPerformance && (
              <div>
                <h3>Performance on {groundName}:</h3>
                <p>{groundPerformance}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
