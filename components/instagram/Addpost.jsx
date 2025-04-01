import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useUserContext } from "@/contexts/UserContext";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

export default function Addpost({ handleSubmit }) {
  const [open, setOpen] = useState(false);

  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImages([]);
    setDescription("");
  };

  const handleChangeImages = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setImages((prev) => [...prev, ...fileArray]);
  };
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("images", images);
  }, [images]);

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        sx={{
          borderRadius: "8px",
          backgroundColor: "#F7531D",
          color: "white",
          fontFamily: "Noto Sans Thai",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#F7531D",
            color: "white",
          },
        }}
      >
        เพิ่มโพสต์
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            sx={{
              fontFamily: "Noto Sans Thai",
              fontWeight: "bold",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            เพิ่มโพสต์
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box className="flex flex-col gap-4">
            <Box className="flex flex-col gap-2">
              <label htmlFor="images">อัพโหลดภาพ</label>
              <Box className="grid grid-cols-3 gap-4">
                {Array.from(images).map((image, index) => (
                  <Box
                    key={index}
                    className="w-full bg-gray-200 rounded-md flex items-center justify-center"
                    sx={{
                      aspectRatio: "1/1",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: "absolute",
                        top: 3,
                        right: 3,
                        backgroundColor: "white",
                        color: "red",
                        borderRadius: "50%",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                        "&:active": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      <DeleteForeverRoundedIcon />
                    </IconButton>
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      width={160}
                      height={160}
                      style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        borderRadius: "8px",
                        width: "100%",
                      }}
                    />
                  </Box>
                ))}
                {images.length < 3 && (
                  <Box
                    className="w-full bg-gray-200 rounded-md flex items-center justify-center cursor-pointer"
                    sx={{
                      aspectRatio: "1/1",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onClick={() => document.getElementById("images").click()}
                  >
                    <span className="text-gray-500">+ เพิ่มภาพ</span>
                  </Box>
                )}
              </Box>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                hidden
                onChange={handleChangeImages}
              />
            </Box>
            <Box className="flex flex-col gap-2">
              <label htmlFor="description">คำบรรยาย</label>
              <TextField
                id="description"
                label="คำบรรยาย"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleSubmit({
                images,
                description,
              });
              // handleClose();
            }}
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
