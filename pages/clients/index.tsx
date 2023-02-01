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
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import SettingsIcon from "@material-ui/icons/Settings";

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
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://dummyjson.com/users");
      setClients(response.data.users);
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

  const useStyles = makeStyles((theme) => ({
    div: {
      display: "flex",
      width: "90%",
      marginTop: "20px",
      margin: "auto",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
      boxShadow: "0px 0px 10px 0px #888888",
      borderRadius: "10px",

      // flexDirection: "column",
      // margin: theme.spacing(2),
    },

    title: {
      margin: theme.spacing(2),
    },

    button: {
      margin: theme.spacing(2),
      backgroundColor: "#1590CB",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#1074a3",
      },
    },

    table: {
      marginTop: "20px",
      margin: "auto",
      minWidth: "400px",
      width: "90%",
      boxShadow: "0px 0px 10px 0px #888888",
      borderRadius: "10px",
      backgroundColor: "white",

      "& th": {
        backgroundColor: "#1590CB",
        color: "#fff",
        paddingLeft: "30px",
      },

      "& td": {
        paddingLeft: "30px",
      },

      "& th:first-child": {
        color: "#fff",
        borderRadius: "10px 0 0 0",
      },
      "& th:last-child": {
        color: "#fff",
        borderRadius: "0 10px 0 0",
      },
      "& tr:last-child td:first-child": {
        borderRadius: "0 0 0 10px",
      },
      "& tr:last-child td:last-child": {
        borderRadius: "0 0 10px 0",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div className={classes.div}>
        <Typography variant="h5" className={classes.title}>
          Clients
        </Typography>
        <Button variant="contained" color="primary" className={classes.button}>
          <SettingsIcon />
        </Button>
      </div>
      <Box>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>firstName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                {editingId === client.id ? (
                  <TableCell>
                    <TextField
                      id="name"
                      label="Name"
                      value={client.firstName}
                      onChange={(e) =>
                        setClients(
                          clients.map((c) =>
                            c.id === client.id
                              ? { ...c, firstName: e.target.value }
                              : c
                          )
                        )
                      }
                    />
                  </TableCell>
                ) : (
                  <TableCell>{client.firstName}</TableCell>
                )}
                {editingId === client.id ? (
                  <TableCell>
                    <TextField
                      id="code"
                      label="Code"
                      value={client.email}
                      onChange={(e) =>
                        setClients(
                          clients.map((c) =>
                            c.id === client.id
                              ? { ...c, email: e.target.value }
                              : c
                          )
                        )
                      }
                    />
                  </TableCell>
                ) : (
                  <TableCell>{client.email}</TableCell>
                )}
                <TableCell>
                  {editingId === client.id ? (
                    <>
                      <IconButton onClick={() => handleDelete(client.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(client)}>
                        <CancelIcon />
                      </IconButton>
                      <IconButton onClick={() => handleSave(client)}>
                        <SaveIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton onClick={() => handleEdit(client)}>
                      <EditIcon />
                    </IconButton>
                  )}
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
