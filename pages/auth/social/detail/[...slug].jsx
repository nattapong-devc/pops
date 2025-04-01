import CardInfo from "@/components/card/CardInfo";
import AppWrapper from "@/components/hoc/AppWrapper";
import { useUserContext } from "@/contexts/UserContext";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddIcon from "@mui/icons-material/Add";
import Addpost from "@/components/instagram/Addpost";
import axios from "axios";
import Swal from "sweetalert2";
export default function SocialDetail() {
  const { user, social } = useUserContext();
  const router = useRouter();
  const domain = "https://pops-phi.vercel.app";

  const handleSubmit = async (data) => {
    Swal.fire({
      title: "กำลังอัพโหลดโพสต์",
      text: "กรุณารอสักครู่...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    console.log(data);

    if (!user.instagram) {
      console.error("Instagram user not found");
      return;
    }

    if (!user.instagram.user_id) {
      console.error("Instagram user_id not found");
      return;
    }

    if (data.mediaType == "IMAGE") {
      //upload images
      if (data.images.length > 1) {
        console.log("Uploading carousel to Instagram...");
        uploadCarousel(data.images, data.description);
      } else {
        console.log("Uploading image to Instagram...");
        uploadImages(data.images, data.description);
      }
    }

    if (data.mediaType == "VIDEO") {
      console.log("Uploading video to Instagram...");
      uploadVideo(data.video, data.description);
    }

    // getInstagramData();
  };

  const uploadImages = async (images, caption) => {
    try {
      console.log("Uploading images to Instagram...");

      const uploadPromises = images.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);

        const resImageUpload = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(resImageUpload.data);

        const imageUrl = resImageUpload.data.fileUrls[0];
        console.log(imageUrl);

        const res = await uploadImageToInstagram(imageUrl, caption);
        console.log(res);

        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "โพสต์สำเร็จ",
            text: "โพสต์ของคุณถูกอัพโหลดแล้ว",
            showConfirmButton: false,
            timer: 1500,
          });
          getInstagramData();
        }
      });

      await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const uploadImageToInstagram = async (imageUrl, caption = "") => {
    try {
      if (!user.instagram) {
        console.error("Instagram user not found");
        return;
      }
      if (!user.instagram.user_id) {
        console.error("Instagram user_id not found");

        return;
      }

      if (!user.instagram.access_token) {
        console.error("Instagram access_token not found");
        return;
      }
      console.log("Uploading image to Instagram...");
      const response = await axios.post("/api/instagram-media-image", {
        access_token: user.instagram.access_token,
        image_url: imageUrl,
        caption: caption,
      });

      console.log("Upload Response:", response);
      return response;
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error);
      throw error;
    }
  };

  const uploadVideo = async (video, caption) => {
    try {
      console.log("Uploading video to Instagram...");

      const formData = new FormData();
      formData.append("file", video);
      const resVideoUpload = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(resVideoUpload.data);

      const videoUrl = resVideoUpload.data.fileUrls[0];
      console.log(videoUrl);

      const res = await uploadVideoToInstagram(videoUrl, caption);
      console.log(res);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const uploadVideoToInstagram = async (videoUrl, caption = "") => {
    try {
      if (!user.instagram) {
        console.error("Instagram user not found");
        return;
      }

      if (!user.instagram.user_id) {
        console.error("Instagram user_id not found");
        return;
      }

      if (!user.instagram.access_token) {
        console.error("Instagram access_token not found");
      }

      console.log("Uploading video to Instagram...");

      const response = await axios.post(
        "/api/instagram-media-video",
        {
          access_token: user.instagram.access_token,
          video_url: videoUrl,
          caption: caption,
        },
        {
          timeout: 240000,
        }
      );

      console.log("Upload Response:", response);

      return response;
    } catch (error) {
      console.error("Error uploading video:", error.response?.data || error);
      throw error;
    }
  };

  const uploadCarousel = async (images, caption) => {
    try {
      console.log("Uploading carousel to Instagram...");
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("file", image);
      });

      const resCarouselUpload = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(resCarouselUpload.data);

      const imageUrls = resCarouselUpload.data.fileUrls;

      console.log(imageUrls);
      const res = await uploadCarouselToInstagram(imageUrls, caption);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "โพสต์สำเร็จ",
          text: "โพสต์ของคุณถูกอัพโหลดแล้ว",
          showConfirmButton: false,
          timer: 1500,
        });

        getInstagramData();
      }

      console.log(res);
    } catch (error) {
      console.error("Error uploading carousel:", error);
    }
  };
  const uploadCarouselToInstagram = async (imageUrls, caption = "") => {
    try {
      if (!user.instagram) {
        console.error("Instagram user not found");
        return;
      }

      if (!user.instagram.user_id) {
        console.error("Instagram user_id not found");
        return;
      }

      if (!user.instagram.access_token) {
        console.error("Instagram access_token not found");
        return;
      }

      console.log("Uploading carousel to Instagram...");

      const response = await axios.post("/api/instagram-media-carousel", {
        access_token: user.instagram.access_token,
        images: imageUrls,
        caption: caption,
      });

      console.log("Upload Response:", response);
      return response;
    } catch (error) {
      console.error("Error uploading carousel:", error.response?.data || error);
      throw error;
    }
  };

  const getInstagramData = async () => {
    try {
      const res = await axios.post(`/api/instagram-by-token`, {
        access_token: user.instagram.access_token,
      });

      if(res.data.status !== "success") {
        console.error("Error fetching Instagram data:", res.data);
        return;
      }



      social("instagram", res.data.data);
    } catch (error) {
      console.error("Error fetching Instagram data:", error);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AppWrapper>
      <Box
        sx={{
          background:
            "linear-gradient(93.82deg, #FE8308 -3.25%, #EC4528 99.01%)",
          padding: "2rem 1rem",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "1.75rem",
            fontWeight: "bold",
            textAlign: "center",
            fontFamily: "Noto Sans Thai",
          }}
          component={"h1"}
          variant="h1"
        >
          {router.query.slug}
        </Typography>
      </Box>

      {user && router.query.slug.length > 0 && router.query.slug[0] && (
        <>
          {router.query.slug[0] == "instagram" && user?.instagram && (
            <Container maxWidth="lg" className="flex flex-col gap-4 py-10">
              <Box className="flex flex-col gap-4 w-full ">
                <Box className="flex flex-row gap-4 shadow-lg p-4 rounded-xl items-center">
                  <Avatar
                    src={user?.instagram?.me.profile_picture_url}
                    sx={{ width: 100, height: 100 }}
                    className="shadow-lg"
                  />
                  <Box className="flex flex-col gap-2">
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "gray",
                      }}
                    >
                      โปรไฟล์
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                      }}
                    >
                      {user?.instagram?.me.name}
                    </Typography>
                    <small className="text-xs">
                      {user?.instagram?.me.biography}
                    </small>
                    <small className="text-xs bg-green-500 text-white py-1 px-3 rounded-full w-fit">
                      {user?.instagram?.me.account_type}
                    </small>
                  </Box>
                </Box>

                <Box className="grid grid-cols-3 gap-4">
                  <CardInfo
                    title="Followers"
                    value={user?.instagram?.me.followers_count}
                  />
                  <CardInfo
                    title="Media"
                    value={user?.instagram?.me.media_count}
                  />
                </Box>

                <Box>
                  <Box className="shadow-lg py-2 px-4 rounded-xl items-center flex flex-row justify-between">
                    <Typography
                      className="col-span-3"
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                      }}
                    >
                      โพสต์
                    </Typography>

                    <Addpost handleSubmit={handleSubmit} />
                  </Box>
                  <Box className="grid grid-cols-4 gap-4 mt-4">
                    {user?.instagram?.media.data.map((item, index) => (
                      <Box
                        key={index}
                        className="flex flex-col gap-4 shadow-lg rounded-xl items-center overflow-hidden "
                      >
                        {item.media_type === "VIDEO" ? (
                          <Box className="relative">
                            <PlayArrowRoundedIcon
                              className="absolute top-2 right-2  text-white"
                              style={{ fontSize: 50 }}
                            />
                            <Image
                              src={item.thumbnail_url}
                              width={512}
                              height={512}
                              alt="media"
                              style={{
                                aspectRatio: "1/1",
                                objectFit: "cover",
                              }}
                            />

                            {/* <video
                          src={item.media_url}
                          width={512}
                          height={512}
                          alt="media"
                          style={{
                            aspectRatio: "1/1",
                            objectFit: "cover",
                          }}
                        /> */}
                          </Box>
                        ) : (
                          <Image
                            src={item.media_url}
                            width={512}
                            height={512}
                            alt="media"
                            style={{
                              aspectRatio: "1/1",
                              objectFit: "cover",
                            }}
                          />
                        )}

                        <Box className="h-36 overflow-y-auto px-3">
                          <Typography sx={{}}>{item.caption}</Typography>
                        </Box>

                        <Box className="flex flex-row  gap-5 w-full p-3">
                          <small>
                            <FavoriteIcon
                              sx={{
                                fontSize: 24,
                                color: "red",
                                marginRight: "4px",
                              }}
                            />
                            {item.like_count}
                          </small>
                          <small>
                            <CommentIcon
                              sx={{
                                fontSize: 24,
                                color: "blue",
                                marginRight: "4px",
                              }}
                            />
                            {item.comments_count}
                          </small>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box className="grid grid-cols-2 gap-4">
                  <Box className="col-span-2">
                    <Box className="shadow-lg py-2 px-4 rounded-xl items-center">
                      <Typography
                        className="col-span-3"
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                        }}
                      >
                        ประเภทโพสต์
                      </Typography>
                    </Box>

                    {user?.instagram?.insightsMediaType && (
                      <PieChart
                        series={[
                          {
                            data: user?.instagram?.insightsMediaType && [
                              {
                                id: 1,
                                label: "Carousel",
                                value:
                                  user?.instagram?.insightsMediaType.carousel
                                    .length,
                              },
                              {
                                id: 2,
                                label: "Image",
                                value:
                                  user?.instagram?.insightsMediaType.image
                                    .length,
                              },
                              {
                                id: 3,
                                label: "Video",
                                value:
                                  user?.instagram?.insightsMediaType.video
                                    .length,
                              },
                            ],
                          },
                        ]}
                        width={600}
                        height={250}
                      />
                    )}
                  </Box>
                  <Box className="col-span-2">
                    <Box className="shadow-lg py-2 px-4 rounded-xl items-center">
                      <Typography
                        className="col-span-3"
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                        }}
                      >
                        {"สถิติยอดไลค์ (ใหม่ - เก่า)"}
                      </Typography>
                    </Box>

                    {user?.instagram?.media.data.length > 0 && (
                      <LineChart
                        //  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                          {
                            data: user?.instagram?.media.data.map(
                              (item) => item.like_count
                            ),
                          },
                        ]}
                        width={1080}
                        height={300}
                      />
                    )}
                  </Box>

                  <Box>
                    <Box className="shadow-lg py-2 px-4 rounded-xl items-center">
                      <Typography
                        className="col-span-3"
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                        }}
                      >
                        ช่วงอายุ
                      </Typography>
                    </Box>

                    {user?.instagram?.insightsAge.data.length > 0 && (
                      <BarChart
                        xAxis={[
                          {
                            scaleType: "band",
                            data:
                              user?.instagram?.insightsAge &&
                              user?.instagram?.insightsAge.data[0].total_value.breakdowns[0].results.map(
                                (item) => item.dimension_values[0]
                              ),
                          },
                        ]}
                        series={[
                          {
                            data:
                              user?.instagram?.insightsAge &&
                              user?.instagram?.insightsAge.data[0].total_value.breakdowns[0].results.map(
                                (item) => item.value
                              ),

                            type: "bar",
                          },
                        ]}
                        width={600}
                        height={300}
                      />
                    )}
                  </Box>

                  <Box>
                    <Box className="shadow-lg py-2 px-4 rounded-xl items-center">
                      <Typography
                        className="col-span-3"
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                        }}
                      >
                        เพศ
                      </Typography>
                    </Box>

                    {user?.instagram?.insightsGender.data.length > 0 && (
                      <PieChart
                        series={[
                          {
                            data:
                              user?.instagram?.insightsGender &&
                              user?.instagram?.insightsGender.data[0].total_value.breakdowns[0].results.map(
                                (item, index) => ({
                                  id: index + 1,
                                  label:
                                    item.dimension_values[0] == "F"
                                      ? "Female"
                                      : item.dimension_values[0] == "M"
                                      ? "Male"
                                      : "Other",
                                  value: item.value,
                                })
                              ),
                          },
                        ]}
                        width={600}
                        height={250}
                      />
                    )}
                  </Box>
                </Box>

                <Box>
                  <Box className="shadow-lg py-2 px-4 rounded-xl items-center">
                    <Typography
                      className="col-span-3"
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                      }}
                    >
                      จังหวัด
                    </Typography>
                  </Box>

                  {user?.instagram?.insightsCity.data.length > 0 && (
                    <BarChart
                      layout="horizontal"
                      yAxis={[
                        {
                          scaleType: "band",
                          data:
                            user?.instagram?.insightsCity &&
                            user?.instagram?.insightsCity.data[0].total_value.breakdowns[0].results.map(
                              (item) => item.dimension_values[0]
                            ),
                        },
                      ]}
                      series={[
                        {
                          data:
                            user?.instagram?.insightsCity &&
                            user?.instagram?.insightsCity.data[0].total_value.breakdowns[0].results.map(
                              (item) => item.value
                            ),
                          type: "bar",
                        },
                      ]}
                      width={900}
                      height={1080}
                      grid={{ vertical: true, horizontal: true }}
                    />
                  )}
                </Box>
              </Box>
            </Container>
          )}

          {router.query.slug[0] == "facebook" && user?.facebook && (
            <Container maxWidth="lg" className="flex flex-col gap-4 py-10">
              <Box className="flex flex-col gap-4 w-full ">
                <Box className="flex flex-row gap-4 shadow-lg p-4 rounded-xl items-center">
                  <Avatar
                    src={user?.facebook?.page?.picture?.data?.url}
                    sx={{ width: 100, height: 100 }}
                    className="shadow-lg"
                  />
                  <Box className="flex flex-col gap-2">
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "gray",
                      }}
                    >
                      โปรไฟล์
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                      }}
                    >
                      {user?.facebook?.page?.name}
                    </Typography>

                    <Box>
                      {user?.facebook?.page.category_list.map((item, index) => (
                        <small
                          key={index}
                          className="text-xs bg-green-500 text-white py-1 px-3 rounded-full w-fit"
                        >
                          {item.name}
                        </small>
                      ))}
                    </Box>
                  </Box>
                </Box>

                {/* <Box className="grid grid-cols-3 gap-4">
               <CardInfo title="Followers" value={data.me.followers_count} />
               <CardInfo title="Media" value={data.me.media_count} />
             </Box> */}

                <Box className="grid grid-cols-3 gap-4">
                  <CardInfo
                    title="Followers"
                    value={user?.facebook?.page.followers_count}
                  />
                  <CardInfo
                    title="Fan"
                    value={user?.facebook?.page.fan_count}
                  />
                </Box>

                <Box>
                  <Box className="shadow-lg py-2 px-4 rounded-xl items-center">
                    <Typography
                      className="col-span-3"
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                      }}
                    >
                      โพสต์
                    </Typography>
                  </Box>
                  <Box className="grid grid-cols-4 gap-4 mt-4">
                    {user?.facebook?.posts.map((item, index) => (
                      <Box
                        key={index}
                        className="flex flex-col gap-4 shadow-lg rounded-xl items-center overflow-hidden "
                      >
                        <Image
                          src={item.full_picture}
                          width={512}
                          height={512}
                          alt="media"
                          style={{
                            aspectRatio: "1/1",
                            objectFit: "cover",
                          }}
                        />

                        <Box className="h-36 overflow-y-auto px-3">
                          <Typography>{item.message}</Typography>
                        </Box>
                        <Box className="flex flex-row  gap-5 w-full p-3">
                          <small>
                            <ThumbUpIcon
                              sx={{
                                fontSize: 24,
                                color: "red",
                                marginRight: "4px",
                              }}
                            />
                            {item?.likes?.summary?.total_count || 0}
                          </small>

                          <small>
                            <CommentIcon
                              sx={{
                                fontSize: 24,
                                color: "blue",
                                marginRight: "4px",
                              }}
                            />
                            {item?.comments?.summary?.total_count || 0}
                          </small>
                          {/* <Typography>{item?.likes?.summary?.total_count || 0}</Typography> */}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* <Box className="grid grid-cols-2 gap-4">
               <Box>
                 <Box className="shadow-lg py-2 px-4 rounded-xl items-center">
                   <Typography
                     className="col-span-3"
                     sx={{
                       fontSize: "1.25rem",
                       fontWeight: "bold",
                     }}
                   >
                     ช่วงอายุ
                   </Typography>
                 </Box>

                 <BarChart
                   xAxis={[
                     {
                       scaleType: "band",
                       data:
                         data.insightsAge &&
                         data.insightsAge.data[0].total_value.breakdowns[0].results.map(
                           (item) => item.dimension_values[0]
                         ),
                     },
                   ]}
                   series={[
                     {
                       data:
                         data.insightsAge &&
                         data.insightsAge.data[0].total_value.breakdowns[0].results.map(
                           (item) => item.value
                         ),

                       type: "bar",
                     },
                   ]}
                   width={600}
                   height={300}
                 />
               </Box>

               <Box>
                 <Box className="shadow-lg py-2 px-4 rounded-xl items-center">
                   <Typography
                     className="col-span-3"
                     sx={{
                       fontSize: "1.25rem",
                       fontWeight: "bold",
                     }}
                   >
                     เพศ
                   </Typography>
                 </Box>

                 <PieChart
                   series={[
                     {
                       data:
                         data.insightsGender &&
                         data.insightsGender.data[0].total_value.breakdowns[0].results.map(
                           (item, index) => ({
                             id: index + 1,
                             label:
                               item.dimension_values[0] == "F"
                                 ? "Female"
                                 : item.dimension_values[0] == "M"
                                 ? "Male"
                                 : "Other",
                             value: item.value,
                           })
                         ),
                     },
                   ]}
                   width={600}
                   height={250}
                 />
               </Box>
             </Box>

             <Box>
               <Box className="shadow-lg py-2 px-4 rounded-xl items-center">
                 <Typography
                   className="col-span-3"
                   sx={{
                     fontSize: "1.25rem",
                     fontWeight: "bold",
                   }}
                 >
                   จังหวัด
                 </Typography>
               </Box>

               <BarChart
                 layout="horizontal"
                 yAxis={[
                   {
                     scaleType: "band",
                     data:
                       data.insightsCity &&
                       data.insightsCity.data[0].total_value.breakdowns[0].results.map(
                         (item) => item.dimension_values[0]
                       ),
                   },
                 ]}
                 series={[
                   {
                     data:
                       data.insightsCity &&
                       data.insightsCity.data[0].total_value.breakdowns[0].results.map(
                         (item) => item.value
                       ),
                     type: "bar",
                   },
                 ]}
                 width={900}
                 height={1080}
                 grid={{ vertical: true, horizontal: true }}
               />
             </Box> */}
              </Box>
            </Container>
          )}
        </>
      )}
    </AppWrapper>
  );
}
