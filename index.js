const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  const slackName = req.query.slack_name;
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const utcTime = new Date().toISOString().slice(0, -5) + 'Z';
  const track = req.query.track;
  const githubUrl = 'https://github.com/debanjo31/hngtask'; 
  const sourceCodeUrl = 'https://github.com/debanjo31/hngtask/blob/main/index.js';

  // Validate UTC time within +/-2 hours
  const currentTime = new Date();
  const twoHoursAgo = new Date(currentTime);
  twoHoursAgo.setHours(currentTime.getHours() - 2);

  const twoHoursLater = new Date(currentTime);
  twoHoursLater.setHours(currentTime.getHours() + 2);

  if (new Date(utcTime) < twoHoursAgo || new Date(utcTime) > twoHoursLater) {
    return res.status(400).json({ error: 'UTC time is not within +/-2 hours' });
  }

  const response = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: utcTime,
    track: track,
    github_file_url: sourceCodeUrl,
    github_repo_url: githubUrl,
    status_code: 200,
  };

  res.json(response);
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
