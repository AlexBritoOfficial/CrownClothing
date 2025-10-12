import categories from "./components/categories/categories.component";
import Directory from "./components/directory/directory.component";

const App = () => {
  return <Directory categories={categories} />;
};

export default App;
