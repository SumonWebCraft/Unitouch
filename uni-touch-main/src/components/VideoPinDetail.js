import {Box, Flex,Grid,GridItem,Text,useColorModeValue,Image,Popover,PopoverTrigger, Button,PopoverContent,PopoverCloseButton,PopoverHeader,PopoverBody,PopoverArrow,PopoverFooter,ButtonGroup,Textarea} from "@chakra-ui/react";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { IoHome, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { BiLike, BiShareAlt } from "react-icons/bi";
import { FcApproval } from "react-icons/fc";
import {FaFolder, FaFacebook, FaWhatsapp, FaInstagram, FaTwitter } from "react-icons/fa";

import { Link, useNavigate, useParams } from "react-router-dom";

import Spinner from "./Spinner";
import app from "../firebase.init";
import {
  deleteVideo,
  gertUserInfo,
  getSpecificVideo,
  recommendedFeed,
} from "../utils/fetchData";

import HTMLReactParser from "html-react-parser";
import moment from "moment";
import { fetchUser } from "../utils/fetchUser";
import RecommendedVideos from "./RecommendedVideos";
import "./VideoPinDetail.css";



const avatar =
  "https://ak.picdn.net/contributors/3038285/avatars/thumb.jpg?t=164360626";

const VideoPinDetail = ({ user }) => {
  const { videoId } = useParams();
  const textColor = useColorModeValue("gray.900", "gray.50");
  const navigate = useNavigate();
  
  const firestoreDb = getFirestore(app);
  const [localUser] = fetchUser();

  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [feeds, setFeeds] = useState(null);

  const [liked, setLiked] = useState(0); 
  const [isLiked, setIsLiked] = useState(false);
  const [data, setData] = useState(null);
  const [comment, setComment] = useState(false);

  const [show, setShow] = useState(false);

  const showName = ()=>{
    if (show == true){
      setShow(false)
    }
    else{
      setShow(true)
    }

  }
 
  

  const likeHandler =()=>{
    setLiked(isLiked ? liked-1 : liked+1)
    setIsLiked(!isLiked)
    }

function getData(e){
setData(e.target.value)
setComment(false)

}


  const playerRef = useRef();
  const playerContainer = useRef();

  useEffect(() => {
    if (videoId) {
      setIsLoading(true);
      getSpecificVideo(firestoreDb, videoId).then((data) => {
        setVideoInfo(data);

        recommendedFeed(firestoreDb, data.category, videoId).then((feed) => {
          setFeeds(feed);
        });

        gertUserInfo(firestoreDb, data.userId).then((user) => {
          setUserInfo(user);
        });

        setIsLoading(false);
      });
    }
  }, [videoId]);

  

     const deleteTheVideo = (videoId) => {
     setIsLoading(true);
     deleteVideo(firestoreDb, videoId);
     navigate("/", { replace: true });
   };

  if (isLoading) return <Spinner />;



  return (

    <Flex
      width={"full"}
      height="auto"
      justifyContent={"center"}
      alignItems="center"
      direction={"column"}
      py={2}
      px={4}
    >
      <Flex alignItems={"center"} width="full" my={4}>
        <Link to={"/"}>
          <IoHome fontSize={25} />
        </Link>
        <Box width="1px" height={"25px"} bg={"gray.500"} mx={2}></Box>
        <Text
          isTruncated
          color={textColor}
          fontWeight="semibold"
          width={"100%"}
        >
          {videoInfo?.title}
        </Text>
      </Flex>

      
      <Grid templateColumns="repeat(4, 1fr)" gap={2} width="100%">
        <GridItem width={"100%"} colSpan="3">
          <Flex
            width={"full"}
            bg="black"
            position="relative"
            ref={playerContainer}
          >
             <video
              autoPlay
              src={videoInfo?.videoUrl}
              width="100%"
              height={"100%"}   
              controls
           />
           </Flex>

          
          {videoInfo?.description && (
            <Flex my={6} direction="column">
              <Text  my={2} fontSize={25} fontWeight="semibold">
                Description
              </Text>
              {HTMLReactParser(videoInfo?.description)}
              
            </Flex>
          )}

  <Flex>

    
<BiLike className="likeBtn" onClick={likeHandler}/>  

<span className="likeText"> {liked} people liked it </span>
</Flex>

<Flex>

<Textarea   onChange={getData}/>
<Button onClick={()=>setComment(true)}>Comment</Button>

</Flex>

<Flex>
  
{ 
  comment?
  <Image
                  src={userInfo?.photoURL ? userInfo?.photoURL : avatar}
                  // src={user?.photoURL}
                  rounded="full"
                   width={"40px"}
                   height={"40px"}
                   minHeight="40px"
                   minWidth={"40px"}
                   
                   marginTop={"20px"}
                />

          

  :null
  }

{ 
  comment?
  

                <h1 className="userName"> {userInfo?.displayName} </h1>
:null
  }

</Flex>

<Flex>
{ 
  comment?
  

                <h1 className="commentText"> {data} </h1>
:null
  }
</Flex>

<Flex>
{ 
  comment?
  

                <Button onClick={() => window.location.reload(false)} className="commentDelete">Delete</Button>
:null
  }
</Flex>


        </GridItem>

        <GridItem width={"100%"} colSpan="1">
          {userInfo && (
            <Flex direction={"column"} width={"full"}>
              <Flex alignItems={"center"} width="full">
                <Image
                  src={userInfo?.photoURL ? userInfo?.photoURL : avatar}
                  rounded="full"
                  width={"60px"}
                  height={"60px"}
                  minHeight="60px"
                  minWidth={"60px"}
                />

                <Flex direction={"column"} ml={3}>
                  <Flex alignItems={"center"}>
                    <Text isTruncated color={textColor} fontWeight="semibold">
                      {userInfo?.displayName}
                    </Text>
                    <FcApproval />
                  </Flex>
                  {videoInfo?.id && (
                    <Text fontSize={12}>
                      {moment(
                        new Date(parseInt(videoInfo.id)).toISOString()
                      ).fromNow()}
                    </Text>
                  )}
                </Flex>
              </Flex>

              {/* Ction Buttons */}
              <Flex justifyContent={"space-around"} mt={6}>
                {userInfo?.uid === localUser.uid && (
                  <Popover closeOnEsc>
                    <PopoverTrigger>
                      <Button colorScheme={"red"}>
                        <IoTrash fontSize={20} color="#fff" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation!</PopoverHeader>
                      <PopoverBody>
                        Are you sure you want to delete it?
                      </PopoverBody>

                      <PopoverFooter d="flex" justifyContent="flex-end">
                        <ButtonGroup size="sm">
                          <Button
                            colorScheme="red"
                            onClick={() => deleteTheVideo(videoId)}
                          >
                            Yes
                          </Button>
                        </ButtonGroup>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                )}

                <a
                  href={videoInfo.videoUrl}
                  download
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    colorScheme={"whatsapp"}
                    rounded="full"
                    my={2}
                    mt={"0"}
                  >
                     Download
                  </Button>
                </a>
              </Flex>
            </Flex>
          )}


<Flex>
           <div class="container">

<button class="share-btn" onClick={showName}>
  <BiShareAlt/>
</button>

{ show && (
  <div class="share-options">
  <p class="title1">Share:</p>

  
  <div class="social-media">
<a class="social-media-btn"> <FaFolder className="icon2"/></a>
<a class="social-media-btn" href="https://www.whatsapp.com/" target="_blank"> <FaWhatsapp className="icon2"/></a>
<a class="social-media-btn" href="https://www.instagram.com/" target="_blank"> <FaInstagram className="icon2"/></a>

<a class="social-media-btn" href="https://twitter.com/?lang=en" target="_blank"> <FaTwitter className="icon2"/></a>
<a class="social-media-btn" href="https://www.facebook.com/" target="_blank"> <FaFacebook className="icon2"/></a>


</div>
 

        </div>
)}
    </div>
  
</Flex>


        </GridItem>

        
      </Grid>



      {feeds && (
        <Flex direction={"column"} width="full" my={6}>
          <Text my={4} fontSize={25} fontWeight="semibold">
            Recommended Videos
          </Text>
          <RecommendedVideos feeds={feeds} />
        </Flex>
      )}
    </Flex>
  );
};

export default VideoPinDetail;





