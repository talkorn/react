import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { date } from "joi";
import FormControlLabel from "@mui/material/FormControlLabel";

/* function createData(firstName, lastName, _id, phone, email, isAdmin) {
  return { firstName, lastName, _id, phone, email, isAdmin };
} */

/* const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
]; */

const CrmTable = () => {
  const [initialData, setIntialData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("users/getAllUsers");
        console.log("data", data.users);
        setIntialData(data.users);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, [initialData]);
  const openUserCard = (id) => {
    console.log("id", id);
    /* navigate(`/user/${id}`); */
  };
  /*  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(initialData));
    console.log(ev);
    newInputState[ev.target.checked] = ev.target.value;
    console.log(newInputState);
    setIntialData(newInputState);
  }; */
  const handleInputChange = async (ev, id) => {
    try {
      const updatedUser = initialData.find((user) => user._id === id);
      updatedUser.biz = ev.target.checked;
      delete updatedUser._id;
      delete updatedUser.isAdmin;

      const response = await axios.put(`/users/userInfo/${id}`, updatedUser);
      console.log(response.data);
    } catch (err) {
      console.log("error from axios", err.response);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>firstName</TableCell>
            <TableCell align="center">lastName</TableCell>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">phone</TableCell>
            <TableCell align="center">email</TableCell>
            <TableCell align="center">biz</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialData &&
            initialData.map((row) => (
              <TableRow
                key={row.firstName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => openUserCard(row._id)}
              >
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>

                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row._id}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  {/*  <input
                    type="checkbox"
                     value={row.isAdmin}
                    checked={row.isAdmin}
                    readOnly
                    onChange={handleInputChange}
                  /> */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={row.biz}
                        onChange={(ev) => handleInputChange(ev, row._id)}
                        color="primary"
                      />
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CrmTable;
