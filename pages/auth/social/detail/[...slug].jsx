import CardInfo from "@/components/card/CardInfo";
import AppWrapper from "@/components/hoc/AppWrapper";
import { useUserContext } from "@/contexts/UserContext";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import {
    Avatar,
    Box,
    Container,
    Typography
} from "@mui/material";
import {
    BarChart,
    PieChart
} from "@mui/x-charts";
import Image from "next/image";
import { useRouter } from "next/router";
export default function SocialDetail() {
  const { user } = useUserContext();
  const router = useRouter();

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

      {router.query.slug == "instagram" && user?.instagram && (
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
              <CardInfo title="Media" value={user?.instagram?.me.media_count} />
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
                  </Box>
                ))}
              </Box>
            </Box>

            <Box className="grid grid-cols-2 gap-4">
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
            </Box>
          </Box>
        </Container>
      )}
    </AppWrapper>
  );
}
