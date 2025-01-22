import bg from "../assets/bg.webp";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Half-screen image */}
      <div className="flex-1">
        <img
          src={bg}
          alt="background-image"
          className="w-full h-[50vh] object-cover"
        />
      </div>
    </div>
  );
};

export default Home;
