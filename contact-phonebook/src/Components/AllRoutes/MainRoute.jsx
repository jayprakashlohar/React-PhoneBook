import { Routes, Route } from "react-router-dom";
import PhoneBook from "../../Pages/PhoneBook";
import Bookmark from "../../Pages/Bookmark";

const MainRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PhoneBook />}></Route>
        <Route path="bookmarks/" element={<Bookmark />}></Route>
      </Routes>
    </div>
  );
};

export default MainRoute;
