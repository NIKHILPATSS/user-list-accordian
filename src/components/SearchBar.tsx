import React from "react";
import Form from "react-bootstrap/Form";

import { faSearch  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  onFilterUser: (keyword: string) => void;
  keyword: string;
};

const SearchBar = ({ onFilterUser, keyword }: Props) => {
  return (
    <div style={{position : "relative"}}>
        <Form.Group >

        <FontAwesomeIcon icon={faSearch } style={{position : "absolute",top : "10px",right : "15px"}}/>
      <Form.Control
        style={{ margin: "30px 0" }}
        type="text"
        placeholder="Search users..."
        value={keyword}
        onChange={(event) => onFilterUser(event.target.value)}
      />
      </Form.Group>
       
    </div>
  );
};

export default SearchBar;
