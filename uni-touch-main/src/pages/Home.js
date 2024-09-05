// import React, { useEffect, useState } from 'react'
// import {Flex} from '@chakra-ui/react'
// import { NavBar, Category, Create, Feed, Search, VideoPin } from '../components'
// import { categories } from "../data";

// import { Route,  Routes } from 'react-router-dom'



// // export default function Home({user}) {
//   const Home = ({ user }) => {
    

//   return (
//     <>
//     <NavBar user={user} />

//     <Flex direction={"column"} 
//     justifyContent="start"
//     alignItems={"center"}
//     width="20" 
//     >
//       {categories &&
//             categories.map((data) => <Category key={data.id} data={data} />)}
//     </Flex>

//     <Flex 
//       width={"95%"}
//       px={4}
//       justifyContent="center"
//       alignItems={"center"}
      
//     >
      
//       <Routes>
//         <Route path="/home" element={<Feed/>}/>
//         <Route path="/category/:categoryId" element={< Feed/>}/>
//         <Route path="/create" element={<Create/>}/>
//         <Route path="/videoDetail/:videoId" element={<VideoPin/>}/>
//         <Route path="/search" element={<Search/>}/>
//       </Routes>
//     </Flex>

//     </>
//   )
// };
//  export default Home;


import React, { useEffect, useState } from 'react'
import {Flex} from '@chakra-ui/react'
import { NavBar, Category, Create, Feed, Search, VideoPin, UserProfile,
  VideoPinDetail,  } from '../components'
import { categories } from "../data";

import { Route,  Routes } from 'react-router-dom'



const Home = ({ user }) => {
  const [searchTerm, setsearchTerm] = useState("");
  return (
    <>
      <NavBar user={user} setsearchTerm={setsearchTerm} />

      <Flex width={"100vw"}>
        <Flex
          direction={"column"}
          justifyContent="start"
          alignItems={"center"}
          width="5%"
        >
          {categories &&
            categories.map((data) => <Category key={data.id} data={data} />)}
        </Flex>

        <Flex
          width={"95%"}
          px={4}
          justifyContent="center"
          alignItems={"center"}
          
        >
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route path="/create" element={<Create />} />
            <Route path="/videoDetail/:videoId" element={<VideoPinDetail />} />
            <Route
              path="/search"
              element={<Search searchTerm={searchTerm} />}
            />
            
            <Route path="/userDetail/:userId" element={<UserProfile />} />
          </Routes>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;