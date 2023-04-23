const FavoriteTitle = ({ favoriteCounter }) => {
  let h2Component;
  console.log("favoriteArr", favoriteCounter);
  if (favoriteCounter > 0) {
    h2Component = "Here You Can See All Your Favorite Cards";
  } else {
    h2Component = "Your favorite cards cart is empty";
  }

  return <h2>{h2Component}</h2>;
};

export default FavoriteTitle;
