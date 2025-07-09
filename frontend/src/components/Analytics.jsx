import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper, Divider } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { baseUrl, getApiRoute } from '../constants';

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [totalDocuments, setTotalDocuments] = useState(0);

  useEffect(() => {
    fetch(getApiRoute('/analytics'))     
      .then(res => res.json())
      .then(data => setAnalyticsData(data));

    fetch(getApiRoute('/documents')) 
      .then(res => res.json())
      .then(data => setTotalDocuments(data.documents.length));
  }, []);

  const getBestModel = (scores) => {
    if (!scores || scores.length === 0) return null;
    return scores.reduce((best, current) => 
      current.score > best.score ? current : best
    );
  };

  const getFastestModel = (latencies) => {
    if (!latencies || latencies.length === 0) return null;
    return latencies.reduce((fastest, current) => 
      current.latency < fastest.latency ? current : fastest
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Document Analysis Performance Dashboard
      </Typography>

      {/* Model Performance Metrics */}
      <Grid container spacing={3} mb={4}>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>Skill Extraction Score (ROUGE)</Typography>
              <Typography variant="body2" paragraph>
                ROUGE Score evaluates how well the models extract and match key skills and qualifications from resumes:
              </Typography>
              <Typography variant="body2" component="ul" sx={{ pl: 2, mb: 2 }}>
                <li>ROUGE-L: Evaluates experience and qualification matching</li>
                <li>Higher scores indicate better skill and experience identification</li>
              </Typography>
              {analyticsData?.rougeScores && analyticsData.rougeScores.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                    Best Skill Extraction Model: {getBestModel(analyticsData.rougeScores)?.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Extraction Accuracy: {getBestModel(analyticsData.rougeScores)?.score.toFixed(3)}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>Model Response Time</Typography>
              <Typography variant="body2" paragraph>
                This metric shows the average time taken by each model to generate a response.
              </Typography>
              {analyticsData?.latencies && analyticsData.latencies.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                   <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                    Fastest Model: {getFastestModel(analyticsData.latencies)?.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average Response Time: {getFastestModel(analyticsData.latencies)?.latency.toFixed(2)} s
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Charts */}
      <Grid container spacing={3}>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>Skill Extraction Performance</Typography>
              <Box height={300}>
                {analyticsData?.rougeScores && analyticsData.rougeScores.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.rougeScores}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="model" />
                      <YAxis domain={[0, 1]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#dc004e" name="Extraction Score" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography variant="body2" color="text.secondary">
                      No performance data available yet
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

         <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>Model Latency</Typography>
              <Box height={300}>
                {analyticsData?.latencies && analyticsData.latencies.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.latencies}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="model" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="latency" fill="#1976d2" name="Response Time (s)" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography variant="body2" color="text.secondary">
                      No latency data available yet
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Model Comparison Summary */}
      <Card sx={{ mt: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>Document Analysis Model Performance</Typography>
          <Typography variant="body2" paragraph>
            Based on the analysis scores and response times, here's how each model performs for document analysis tasks:
          </Typography>
          <Grid container spacing={2}>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>Best for Skill Extraction</Typography>
                <Typography variant="body2">
                  {analyticsData?.rougeScores && analyticsData.rougeScores.length > 0 ? 
                    `${getBestModel(analyticsData.rougeScores)?.model} excels at extracting and matching skills with a score of ${getBestModel(analyticsData.rougeScores)?.score.toFixed(3)}`
                    : 'No performance data available yet'
                  }
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>Fastest Response Time</Typography>
                <Typography variant="body2">
                  {analyticsData?.latencies && analyticsData.latencies.length > 0 ? 
                    `${getFastestModel(analyticsData.latencies)?.model} provides the fastest response time (${getFastestModel(analyticsData.latencies)?.latency.toFixed(2)} s)`
                    : 'No latency data available yet'
                  }
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Typography variant="subtitle2" fontWeight="bold" mb={1}>Key Insights:</Typography>
            <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
              <li>Higher ROUGE scores suggest more accurate extraction of skills and experience</li>
              <li>Lower latency indicates faster model response time</li>
              <li>Models with higher ROUGE scores and lower latencies are generally preferred for comprehensive analysis</li>
              <li>Consider using different models for different stages of the recruitment process based on performance needs (e.g., a faster model for initial screening, a more accurate model for detailed analysis)</li>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
} 