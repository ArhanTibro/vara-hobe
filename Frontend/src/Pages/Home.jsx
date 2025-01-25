import bg from "../assets/bg.webp";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import SearchBox from "../Components/SearchBox";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Background Section */}
      <div className="relative flex-1">
        <img
          src={bg}
          alt="background-image"
          className="w-full h-[50vh] object-cover"
        />

        {/* Card 1 */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-start items-center p-4 md:p-8">
          <div className="bg-[#C0BCB5] p-6 rounded-lg shadow-md max-w-[80%] md:max-w-[35%]">
            <p className="text-2xl md:text-3xl font-bold text-black">
              Searching for an apartment?
            </p>
            <div className="h-1 bg-[#3F4651] w-full mt-2 mb-4"></div>
            <p className="text-4xl md:text-5xl font-bold text-black">Try out</p>
            <p className="text-4xl md:text-5xl font-bold text-black">
              Vara-Hobe
            </p>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <SearchBox />
      <Footer />
    </div>
  );
};

export default Home;
