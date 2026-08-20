import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Divider, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }

      const snapshot = await getDocs(collection(db, "cities"));
      const data = snapshot.docs.map(doc => doc.data());

      // Sort cities alphabetically
      data.sort((a, b) => a.cityName.localeCompare(b.cityName));

      setCities(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Typography>Loading dashboard...</Typography>;

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {cities.map((city) => (
        <Grid item xs={12} md={6} lg={4} key={city.cityName}>
          <Card elevation={4}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {city.cityName}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary">
                Supervisor: {city.supervisor}
              </Typography>

              <Divider sx={{ marginY: 2 }} />

              <Typography><strong>Total Boxes:</strong> {city.totalBoxes}</Typography>
              <Typography><strong>Active Boxes:</strong> {city.activeBoxes}</Typography>
              <Typography><strong>Deactive Boxes:</strong> {city.deactiveBoxes}</Typography>
              <Typography><strong>Boxes Added:</strong> {city.boxesAdded}</Typography>
              <Typography><strong>Current Boxes:</strong> {city.currentBoxes}</Typography>

              <Divider sx={{ marginY: 2 }} />

              <Typography><strong>Total Income:</strong> ${city.totalIncome.toLocaleString()}</Typography>
              <Typography>
                <strong>Avg Income per Active Box:</strong> $
                {city.avgIncomePerActiveBox.toFixed(2)}
              </Typography>

              <Divider sx={{ marginY: 2 }} />

              <Typography variant="h6">Monthly Income</Typography>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Month</strong></TableCell>
                    <TableCell><strong>Income</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(city.monthlyIncome)
                    .sort(([a], [b]) => b.localeCompare(a)) // newest first
                    .map(([month, income]) => (
                      <TableRow key={month}>
                        <TableCell>{month}</TableCell>
                        <TableCell>${income.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
