import DirectoryItem from "../directory-item/directory-item.component";
import { DirectoryContainer } from "./directory.styles";
import { categories } from "../../data/categories/categories.component";

const Directory = ({ categories }) => {
  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem
          key={category.id}
          category={category}
        />
      ))}
    </DirectoryContainer>
  );
};

export default Directory;
