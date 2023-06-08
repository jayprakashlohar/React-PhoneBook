import {
  Box,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  ButtonGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteContact,
  fetchContacts,
  editContact,
  addToBookmark,
} from "../Redux/actions/contacts";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import debounce from "lodash.debounce";

const PhoneBook = () => {
  const toast = useToast();
  let dispatch = useDispatch();
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [selectUser, setSelectUser] = useState(null);

  let data = useSelector((state) => state.contacts.contacts);
  const sortedContacts = data
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;

  // user details modal
  const handleOpenUserDetailsModal = (el) => {
    setSelectUser(el);
    setUserDetailsModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
        toast({
          title: "Contact deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
  };

  const handleBookmark = (data) => {
    dispatch(addToBookmark(data));
    toast({
      title: "Added to bookmarks",
      status: "success",
      duration: 5000,
      isClosable: true,
      position:"top"
    });
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedContact) => {
    dispatch(editContact(updatedContact.id, updatedContact));
    handleCloseModal();
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleCloseModal = () => {
    setSelectedContact(null);
    setIsEditModalOpen(false);
  };

  const handleSearchChange = debounce((value) => {
    setSearchQuery(value);
  }, 1000);

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const filteredContacts = sortedContacts.filter((contact) =>
    contact.label.toLowerCase().includes(filter.toLowerCase())
  );

  const searchData = filteredContacts.filter((contact) => {
    return contact.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const paginatedContacts = searchData.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const totalPages = Math.ceil(sortedContacts.length / contactsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };



  return (
    <>
      <Box p="10px" display="flex" justifyContent="space-around" gap="10px">
        <Box>
          <Input
            onChange={(e) => handleSearchChange(e.target.value)}
            w={{base:"auto",md:"auto",lg:"25rem"}}
            type="text"
            placeholder="Search..."
            mb={{ base: 2, md: 0 }}
            mr={{ base: 0, md: 2 }}
            focusBorderColor="teal.500"
            _placeholder={{ color: "gray.400" }}
          />
        </Box>
        <Box display="flex" gap="10px">
          <Button pr="20px" leftIcon={<FiFilter />} colorScheme="teal" variant="solid">
            Filter
          </Button>
          <Select
            placeholder="Select Label"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Work">Work</option>
            <option value="School">School</option>
          </Select>
        </Box>
      </Box>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>
              Name <br />
              <span>CONTACTS({data.length})</span>
            </Th>
            <Th>Phone Number</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedContacts.map((el) => {
            return (
              <Tr key={el.id} boxShadow="base">
                <Td>
                  <Box display="flex" alignItems="center" gap="20px">
                    <Image w="5%" borderRadius="50%" src={el.avatar} />
                    <Text
                      cursor="pointer"
                      _hover={{ color: "gray.500" }}
                      onClick={() => handleOpenUserDetailsModal(el)}
                      fontWeight="600"
                    >
                      {el.name}
                    </Text>
                  </Box>
                </Td>
                <Td>{el.phone}</Td>
                <Td>
                  <Box display="flex" gap="20px">
                    <FaRegBookmark
                      onClick={() => handleBookmark(el)}
                      style={{ cursor: "pointer" }}
                    />
                    <AiOutlineEdit
                      onClick={() => handleEdit(el)}
                      style={{ cursor: "pointer" }}
                    />
                    <AiOutlineDelete
                      onClick={() => handleDelete(el.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </Box>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Box w="200px" m="auto" mt="20px">
        <ButtonGroup>
          <button
            style={{
              background: "black",
              color: "#ffff",
              padding: "5px 10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            disabled={currentPage === 1}
            onClick={goToPrevPage}
          >
            Prev
          </button>

          <Text p="5px 10px" bg="teal" color="#ffff" fontWeight="bold">
            {currentPage}
          </Text>

          <button
            style={{
              background: "black",
              color: "#ffff",
              padding: "5px 10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            disabled={currentPage === totalPages}
            onClick={goToNextPage}
          >
            Next
          </button>
        </ButtonGroup>
      </Box>

      {/* Update Modal */}
      {selectedContact && (
        <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Contact</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <FormControl mt={4}>
                  <FormLabel>Name *</FormLabel>
                  <Input
                    type="text"
                    value={selectedContact.name}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        name: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Phone Number *</FormLabel>
                  <Input
                    type="text"
                    value={selectedContact.phone}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        phone: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                colorScheme="green"
                onClick={() => handleSaveEdit(selectedContact)}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* user details modal */}
      {selectUser && (
        <Modal
          isOpen={userDetailsModal}
          onClose={() => setUserDetailsModal(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectUser.name} Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Box>
                  <Image
                    mb="5px"
                    borderRadius="50%"
                    w="20%"
                    ml="40%"
                    src={selectUser.avatar}
                  />
                </Box>
                <hr />

                <Box
                  display="flex"
                  justifyContent="flex-start"
                  mt="10px"
                  gap="50px"
                >
                  <Text>Name : </Text>
                  <Text>{selectUser.name}</Text>
                </Box>
                <hr />
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  mt="10px"
                  gap="50px"
                >
                  <Text>Phone Number : </Text>
                  <Text>{selectUser.phone}</Text>
                </Box>
                <hr />
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  mt="10px"
                  gap="50px"
                >
                  <Text>Address : </Text>
                  <Text>{selectUser.address}</Text>
                </Box>
                <hr />
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  mt="10px"
                  gap="50px"
                >
                  <Text>Label : </Text>
                  <Text>{selectUser.label}</Text>
                </Box>
                <hr />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setUserDetailsModal(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default PhoneBook;
