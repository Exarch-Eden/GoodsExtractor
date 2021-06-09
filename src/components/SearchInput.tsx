// third-party libraries
import React, { ReactElement, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";

// components

// css
import "../styles/SearchInput.css";

// local constants
import { serverSearchUrl } from "../backend/ServerURLS";

// types
import { Book } from "../types";

const ENTER_KEY = "Enter";


type SearchInputProps = {
  onKeyDown: (searchInput: string) => {};
};

const SearchInput = ({ onKeyDown }: SearchInputProps): ReactElement => {
  // holds the user input in the text field
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="searchInput">
      <TextField
        value={searchInput}
        onChange={(event) => {
          const { value } = event.target;
          setSearchInput(value);
        }}
        onKeyDown={(event) => {
          // console.log(`${event.key} key pressed`);
          if (event.key === ENTER_KEY) {
            onKeyDown(searchInput);
          }
        }}
        label="Search Input"
        margin="normal"
        variant="outlined"
      />
    </div>
  );
};

export default SearchInput;
