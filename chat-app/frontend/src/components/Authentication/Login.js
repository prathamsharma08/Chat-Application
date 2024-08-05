import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
       <Button
          colorScheme="blue"
          width="full"
          onClick={submitHandler}
          isLoading={loading}
          mb={4}
        >
          Login
        </Button>
     <Button
          variant="outline"
          colorScheme="teal"
          width="full"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Use Guest Credentials
        </Button>
    </VStack>
  );
};

export default Login;


// import { Button, Input, InputGroup, InputRightElement, FormControl, FormLabel, useToast, Box, Flex, Heading, useBreakpointValue, Text } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { ChatState } from "../../Context/ChatProvider";

// const Login = () => {
//   const [show, setShow] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const toast = useToast();
//   const history = useHistory();
//   const { setUser } = ChatState();

//   const handleClick = () => setShow(!show);

//   const submitHandler = async () => {
//     setLoading(true);
//     if (!email || !password) {
//       toast({
//         title: "Please Fill All Fields",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const { data } = await axios.post("/api/user/login", { email, password }, config);

//       toast({
//         title: "Login Successful",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setUser(data);
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       history.push("/chats");
//     } catch (error) {
//       toast({
//         title: "Error Occurred",
//         description: error.response?.data?.message || "An unexpected error occurred",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//     setLoading(false);
//   };

//   const containerStyle = useBreakpointValue({
//     base: { maxW: "90%", mx: "auto" },
//     md: { maxW: "400px", mx: "auto" },
//   });

//   return (
//     <Flex
//       direction="column"
//       // align="center"
//       // justify="center"
//       minHeight="100vh"
//       bgGradient="linear(to-r, #e0f7fa, #b9fbc0)" // Light blue-green gradient
//       p={4}
//     >
//       <Box
//         p={6}
//         borderRadius="md" // Rounded corners
//         bg="white"
//         shadow="md"
//         width="100%"
//         maxW="md"
//         {...containerStyle}
//         borderWidth={1}
//         borderColor="gray.300"
//       >
//         <Heading mb={6} textAlign="center" fontSize="2xl" color="gray.700">
//           Login
//         </Heading>
//         <FormControl id="email" isRequired mb={4}>
//           <FormLabel>Email Address</FormLabel>
//           <Input
//             value={email}
//             type="email"
//             placeholder="Enter your email address"
//             onChange={(e) => setEmail(e.target.value)}
//             variant="outline"
//           />
//         </FormControl>
//         <FormControl id="password" isRequired mb={4}>
//           <FormLabel>Password</FormLabel>
//           <InputGroup>
//             <Input
//               value={password}
//               type={show ? "text" : "password"}
//               placeholder="Enter password"
//               onChange={(e) => setPassword(e.target.value)}
//               variant="outline"
//             />
//             <InputRightElement>
//               <Button size="sm" onClick={handleClick} colorScheme="blue">
//                 {show ? "Hide" : "Show"}
//               </Button>
//             </InputRightElement>
//           </InputGroup>
//         </FormControl>
//         <Button
//           colorScheme="blue"
//           width="full"
//           onClick={submitHandler}
//           isLoading={loading}
//           mb={4}
//         >
//           Login
//         </Button>
//         <Button
//           variant="outline"
//           colorScheme="teal"
//           width="full"
//           onClick={() => {
//             setEmail("guest@example.com");
//             setPassword("123456");
//           }}
//         >
//           Use Guest Credentials
//         </Button>
      
//       </Box>
//     </Flex>
//   );
// };

// export default Login;

