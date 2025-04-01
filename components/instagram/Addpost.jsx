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
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useUserContext } from "@/contexts/UserContext";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Swal from "sweetalert2";
export default function Addpost({ handleSubmit }) {
  const [open, setOpen] = useState(false);

  const [mediaType, setMediaType] = useState("IMAGE");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("");
  const [initialSubmit, setInitialSubmit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImages([]);
    setDescription("");
    setVideo(null);
    setMediaType("IMAGE");
    setInitialSubmit(false);
  };

  const handleChangeImages = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setImages((prev) => [...prev, ...fileArray]);
  };
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

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
              <label htmlFor="mediaType">ประเภทโพสต์</label>
              <Select
                id="mediaType"
                value={mediaType}
                size="small"
                variant="outlined"
                className="max-w-[200px]"
                onChange={(e) => setMediaType(e.target.value)}
              >
                <MenuItem value="IMAGE">ภาพ</MenuItem>
                <MenuItem value="VIDEO">วิดีโอ</MenuItem>
              </Select>
            </Box>

            {mediaType === "IMAGE" && (
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
            )}

            {mediaType === "VIDEO" && (
              <Box className="flex flex-col gap-2">
                <label htmlFor="video">อัพโหลดวิดีโอ</label>
                <Box
                  className="w-full bg-gray-200 rounded-md flex items-center justify-center cursor-pointer"
                  sx={{
                    aspectRatio: "16/9",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {video ? (
                    <>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 5,
                          zIndex: 10,
                        }}
                        className="flex gap-1"
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => setVideo(null)}
                          startIcon={<DeleteForeverRoundedIcon />}
                          sx={{
                            borderRadius: "8px",
                            backgroundColor: "white",

                            "&:hover": {
                              backgroundColor: "white",
                            },
                            "&:active": {
                              backgroundColor: "white",
                            },
                          }}
                        >
                          ลบวิดีโอ
                        </Button>

                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() =>
                            document.getElementById("video").click()
                          }
                          startIcon={<EditRoundedIcon />}
                          sx={{
                            borderRadius: "8px",
                            backgroundColor: "white",
                            "&:hover": {
                              backgroundColor: "white",
                            },
                            "&:active": {
                              backgroundColor: "white",
                            },
                          }}
                        >
                          แก้ไขวิดีโอ
                        </Button>
                      </Box>

                      <video
                        src={URL.createObjectURL(video)}
                        controls
                        className="w-full h-full rounded-md"
                      />
                    </>
                  ) : (
                    <Box
                      className="w-full h-full flex items-center justify-center"
                      onClick={() => document.getElementById("video").click()}
                      sx={{
                        aspectRatio: "16/9",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <span className="text-gray-500">+ เพิ่มวิดีโอ</span>
                    </Box>
                  )}
                </Box>
                <input
                  type="file"
                  id="video"
                  accept="video/*"
                  hidden
                  onChange={(e) => {
                    //limit file 5 MB

                    if (e.target.files[0]) {
                      if (e.target.files[0].size > 5 * 1024 * 1024) {
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "ไฟล์วิดีโอใหญ่เกินไป กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 5 MB",
                        });

                        return;
                      }

                      setVideo(e.target.files[0]);

                      //reset input
                    }

                    e.target.value = null;
                  }}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </Box>
            )}

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
              if(!initialSubmit) {
                setInitialSubmit(true);
              }
              if (mediaType === "IMAGE" && images.length === 0) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "กรุณาเลือกภาพอย่างน้อย 1 ภาพ",
                });
                return;
              }

              if (mediaType === "VIDEO" && !video) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "กรุณาเลือกวิดีโอ",
                });
                return;
              }

              handleSubmit({
                images,
                description,
                video,
                mediaType,
              });

              handleClose();
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
