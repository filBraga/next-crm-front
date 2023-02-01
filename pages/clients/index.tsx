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
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Pagination from "@material-ui/lab/Pagination";

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
  // ****************************** STATES ******************************
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");

  // ****************************** STATES ******************************

  // ****************************** EFFECT ******************************
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://dummyjson.com/users");
      console.log(response.data.users);

      setClients(response.data.users);
    };
    fetchData();
  }, []);
  // ****************************** EFFECT ******************************

  // ****************************** HANDLES ******************************
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
  // ****************************** HANDLES ******************************

  // ****************************** STYLES ******************************
  const useStyles = makeStyles({
    table: {
      margin: "auto",
      width: "90%",
      "& th": {
        backgroundColor: "#1590CB",
        color: "#fff",
      },
    },
    editButton: {
      height: "30px",
      width: "30px",
    },
    saveButton: {
      height: "30px",
      width: "30px",
    },
    cancelButton: {
      height: "30px",
      width: "30px",
    },
    deleteButton: {
      height: "30px",
      width: "30px",
    },
  });

  const classes = useStyles();
  // ****************************** STYLES ******************************

  return (
    <>
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
                    <IconButton
                      className={classes.deleteButton}
                      onClick={() => handleDelete(client.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      className={classes.cancelButton}
                      onClick={() => handleEdit(client)}
                    >
                      <CancelIcon />
                    </IconButton>
                    <IconButton
                      className={classes.saveButton}
                      onClick={() => handleSave(client)}
                    >
                      <SaveIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    className={classes.editButton}
                    onClick={() => handleEdit(client)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ClientTable;
