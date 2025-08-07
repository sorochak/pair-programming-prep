import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function ChargersBySite() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChargers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/chargers");

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();

        const siteEntries = Object.entries(data).map(([siteName, stats]) => ({
          siteName,
          ...stats,
        }));

        setSites(siteEntries);
      } catch (err) {
        setError("Failed to load charger data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChargers();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ p: 2 }}>
        EV Chargers by Site
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Site Name</strong>
            </TableCell>
            <TableCell>Total Connections</TableCell>
            <TableCell>Needs Attention</TableCell>
            <TableCell>Total Power (kW)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sites.map((site) => (
            <TableRow
              key={site.siteName}
              sx={
                site.needsAttentionCount > 0
                  ? { backgroundColor: "#fff3e0" }
                  : {}
              }
            >
              <TableCell>{site.siteName}</TableCell>
              <TableCell>{site.totalConnections}</TableCell>
              <TableCell>{site.needsAttentionCount}</TableCell>
              <TableCell>{site.totalPowerKW}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
