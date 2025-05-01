import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, 
         Inject, LineSeries, DateTime, Legend, Tooltip, DataLabel } from '@syncfusion/ej2-react-charts';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

/**
 * HighScoresPage - displays high scores and a chart showing score progression
 */
const HighScoresPage = ({ onBack }) => {
  const [highScores, setHighScores] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Load high scores from localStorage
    const loadHighScores = () => {
      try {
        const scores = JSON.parse(localStorage.getItem('tetrisHighScores') || '[]');
        setHighScores(scores);
        
        // Prepare data for the chart - only use up to 20 scores to avoid cluttering
        const chartData = scores.slice(0, 20).map((score, index) => ({
          x: new Date(score.date),
          y: score.score,
          index: index + 1
        }));
        
        // Sort by date for the chart
        chartData.sort((a, b) => a.x - b.x);
        setChartData(chartData);
      } catch (error) {
        console.error('Error loading high scores:', error);
        setHighScores([]);
      }
    };

    loadHighScores();
  }, []);

  // Chart settings
  const primaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'MMM dd',
    edgeLabelPlacement: 'Shift',
    title: 'Date'
  };

  const primaryYAxis = {
    minimum: 0,
    maximum: chartData.length > 0 ? Math.max(...chartData.map(d => d.y)) * 1.2 : 1000,
    interval: 200,
    title: 'Score'
  };

  const marker = { visible: true, width: 10, height: 10 };
  const tooltip = { enable: true };

  return (
    <div className="high-scores-page">
      <div className="high-scores-header">
        <Text variant="title">High Scores</Text>
      </div>

      <div className="high-scores-chart">
        {chartData.length > 0 ? (
          <ChartComponent
            primaryXAxis={primaryXAxis}
            primaryYAxis={primaryYAxis}
            tooltip={tooltip}
            title="Score Progression Over Time"
            legendSettings={{ visible: true }}
          >
            <Inject services={[LineSeries, DateTime, Legend, Tooltip, DataLabel]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={chartData}
                xName="x"
                yName="y"
                name="Score"
                type="Line"
                marker={marker}
                width={2}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        ) : (
          <div className="no-data">
            <Text>No high scores data available for the chart</Text>
          </div>
        )}
      </div>

      <div className="high-scores-list">
        <Text variant="heading">Top Scores</Text>
        {highScores.length > 0 ? (
          <div className="scores-list">
            {highScores.map((highScore, index) => (
              <div key={index} className="high-score-item">
                <span className="rank">{index + 1}.</span>
                <span className="high-score">{highScore.score}</span>
                <span className="date">{highScore.formattedDate}</span>
              </div>
            ))}
          </div>
        ) : (
          <Text>No high scores yet</Text>
        )}
      </div>

      <div className="high-scores-actions">
        <Button onClick={onBack}>Back to Menu</Button>
      </div>
    </div>
  );
};

export default HighScoresPage;