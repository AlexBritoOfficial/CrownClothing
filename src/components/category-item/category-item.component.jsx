import "./category-item.styles.scss";
import { Component } from "react";

const CategoryItem = ({ category }) => {
  const { title, imageUrl } = category;

  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

// class CategoryItem extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       id: this.props.id,
//       title: this.props.title,
//       imageUrl: this.props.imageUrl,
//     };
//   }

//   render() {
//     return (
//       <div
//         key={this.state.id}
//         className="category-container">
//         <div
//           className="background-image"
//           style={{
//             backgroundImage: `url(${this.state.imageUrl})`,
//           }}
//         />
//         <div className="category-body-container">
//           <h2>{this.state.title}</h2>
//           <p>Shop Now</p>
//         </div>
//       </div>
//     );
//   }
// }

export default CategoryItem;
