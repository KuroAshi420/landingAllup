import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectCategory({ setItem, categoryData }) {
  const classes = useStyles();
  const [categroy, setCategroy] = useState("");

  const handleChange = (e) => {
    if (!e.target.value) return;
    const item = categoryData.find((c) => c.name === e.target.value);
    setItem(item);
    setCategroy(e.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">categroy</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={categroy}
        onChange={handleChange}
        label="Categroy"
      >
        <MenuItem value="">
          <em>Select Category</em>
        </MenuItem>
        <MenuItem value={"Alimentation"}>Alimentation</MenuItem>
        <MenuItem value={"Vacations"}>Vacations</MenuItem>
        <MenuItem value={"Health and well-being"}>Health and well-being</MenuItem>
        <MenuItem value={"Education & kids"}>Education & kids</MenuItem>
        <MenuItem value={"Mobility"}>Mobility</MenuItem>
      </Select>
    </FormControl>
  );
}
