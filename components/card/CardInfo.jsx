import { Card, CardContent } from "@mui/material";
import React from "react";

export default function CardInfo({ title, value }) {
  return (
    <Card 
    sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "1rem",
        width: "100%",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        "&:hover": {
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        },
    }}
    >
      <CardContent>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-lg">{value}</p>
      </CardContent>
    </Card>
  );
}
