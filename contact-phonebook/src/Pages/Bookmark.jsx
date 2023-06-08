import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBookmark, fetchBookmarkData } from "../Redux/actions/contacts";
import { AiFillDelete } from "react-icons/ai";
import { useEffect } from "react";

const Bookmark = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.contacts.bookmarks);
  console.log("bookmarks", bookmarks);

  const handleDelete = (id) => {
    dispatch(deleteBookmark(id));
    toast({
      title: "Contact deleted",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  useEffect(() => {
    dispatch(fetchBookmarkData());
  }, [dispatch]);

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>
              Name <br />
              <span>CONTACTS({bookmarks.length})</span>
            </Th>
            <Th>Phone Number</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookmarks &&
            bookmarks.map((item) => (
              <Tr key={item.id} boxShadow="base">
                <Td>
                  <Box display="flex" alignItems="center" gap="20px">
                    <Image w="5%" borderRadius="50%" src={item.avatar} />
                    <Text fontWeight="bold">{item.name}</Text>
                  </Box>
                </Td>
                <Td>{item.phone}</Td>
                <Td>
                  <AiFillDelete
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(item.id)}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Bookmark;
