import React from "react";
import Button from "@mui/material/Button";

function SimpleButton({ label, onClick }) {
  return (
    <div>
      <Button onClick={onClick} variant='contained' >
        {label}
      </Button>
    </div>
  );
}

export default SimpleButton;

      // <Button onClick={onClick} variant='contained' startIcon={<DeleteIcon />}>
      //   {label}
      // </Button>;