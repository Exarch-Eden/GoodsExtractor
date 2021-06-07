// third-party libraries
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";

// components

// css
import "../styles/SearchInput.css";

const SearchInput = () => {
  // holds the user input in the text field
  const [input, setInput] = useState("");

  // for testing purposes
  useEffect(() => {
    console.log("input: ", input);
  }, [input]);

  return (
    <div className="searchInput">
      <TextField
        value={input}
        onChange={(event) => {
          const { value } = event.target;
          setInput(value);
        }}
        label="Search Input"
        margin="normal"
        variant="outlined"
      />
    </div>
  );
};

export default SearchInput;
