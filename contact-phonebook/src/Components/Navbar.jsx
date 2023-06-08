import {
  Box,
  Flex,
  Input,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  Icon,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../Redux/actions/contacts";
import { BsBookmarkStarFill } from "react-icons/bs";
import { AiFillPlusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  let dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [address, setAddress] = useState("");
  const [label, setLabel] = useState("");

  const handleSubmit = () => {
    let newContact = {
      name,
      phone,
      avatar,
      address,
      label,
    };
    dispatch(addContact(newContact));

    setName("");
    setPhone("");
    setAvatar("");
    setAddress("");
    setLabel("");
  };
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding={3}
        bg="gray.800"
        color="white"
      >
        <Link to="/">
          <Box
            mb={{ base: 4, md: 0 }}
            display="flex"
            alignItems="center"
            gap="10px"
          >
            <Image
              borderRadius="50%"
              w="10%"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyWLjkYKGswBE2f9mynFkd8oPT1W4Gx8RpDQ&usqp=CAU"
            />

            <Heading fontSize="20px">Phonebook</Heading>
          </Box>
        </Link>
        <Box>
          <Flex align="center">
            <Button
              onClick={onOpen}
              leftIcon={<AiFillPlusSquare />}
              colorScheme="teal"
              variant="solid"
            >
              Save
            </Button>
            <Link to="/bookmarks">
              <Box mr={{ base: 0, md: 2 }} ml="10px">
                <Icon as={BsBookmarkStarFill} boxSize={4} />
              </Box>
            </Link>
          </Flex>
        </Box>
      </Flex>

      {/* Create contacts modal */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <FormControl>
              <FormLabel>Name *</FormLabel>
              <Input
                variant="flushed"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Phone *</FormLabel>
              <Input
                variant="flushed"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your number"
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Avatar *</FormLabel>
              <Input
                variant="flushed"
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="Enter your image"
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Address *</FormLabel>
              <Input
                variant="flushed"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Label *</FormLabel>
              <Select
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              >
                <option value="">Select Label</option>
                <option value="Work">Work</option>
                <option value="School">School</option>
                <option value="Friends">Friends</option>
                <option value="Family">Family</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Add Contact
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
