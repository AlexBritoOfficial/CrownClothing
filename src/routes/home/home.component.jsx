import { Outlet } from "react-router-dom";
import categories from "../../data/categories/categories.component";
import Directory from "../../components/directory/directory.component";

const Home = () => {
  return (
    <div>
      <Directory categories={categories} />
    </div>
  );
};

export default Home;
