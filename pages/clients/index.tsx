import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import SettingsIcon from "@material-ui/icons/Settings";
import styles from "./Style.module.scss";

// import Pagination from "@material-ui/lab/Pagination";

interface Client {
  abilities: string;
  base_experience: number;
  forms: string;
  game_indices: string;
  height: string;
  held_items: string;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: string;
  name: string;
  order: number;
  past_types: string;
  species: string;
  sprites: string;
  stats: string;
  types: string;
  weight: number;
}

const ClientTable: React.FC = () => {
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://dummyjson.com/users");
      setClients(response.data.users);
      setFilteredData(response.data.users);
    };
    fetchData();
  }, []);

  const handleEdit = (client: Client) => {
    if (editingId !== client.id) {
      setEditingId(client.id);
    } else {
      setEditingId(null);
    }
  };

  const handleSave = async (client: Client) => {
    // await axios.put(`http://localhost:9000/clients/${client.id}`, client);
    setEditingId(null);
    const updatedClients = clients.map((c) =>
      c.id === client.id ? client : c
    );
    setClients(updatedClients);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      // await axios.delete(`http://localhost:9000/clients/${id}`);
      const updatedClients = clients.filter((client) => client.id !== id);
      setClients(updatedClients);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setFilteredData(
      clients.filter((item) =>
        item.firstName.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div className={styles.div}>
        <TextField
          id="standard-basic"
          label="Name"
          value={search}
          onChange={handleSearch}
          style={{
            display: "block",
            marginLeft: 30,
            marginRight: "auto",
          }}
        />
        <div
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: 0,
          }}
        >
          <Button className={styles.button}>New Client</Button>
        </div>
      </div>
      <Box className={styles.box}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.firstName}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>
                  <VisibilityIcon style={{ color: "gray" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default ClientTable;
