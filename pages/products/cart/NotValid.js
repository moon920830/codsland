import React from 'react'
import GridContainer from "/components/Grid/GridContainer.js";
import BlockIcon from "@material-ui/icons/Block";

export default function NotValid() {
  return (
    <GridContainer
      style={{ height: "100%" }}
      justify="center"
      alignItems="center"
      direction="column"
    >
      <div
        style={{
          backgroundColor: "green",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          width: "120px",
          height: "120px",
        }}
      >
        <BlockIcon
          style={{
            width: "40%",
            height: "40%",
            color: "white",
          }}
        />
      </div>
      <h3 style={{ textAlign: "center" }}>
        Result is not valid. Please try again.
      </h3>
    </GridContainer>
  )
}
