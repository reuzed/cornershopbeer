import "./App.css";
import beer from "./assets/overhead_beers.jpg";
import beer1 from "./assets/beer_close_assassin.jpg";
import beer2 from "./assets/beer_close_bigsea.jpg";
import ImageScroll from "./components/ImageScroll";

function App() {
  return (
    <>
      <div className="relative">
        <img src={beer} className="w-full h-auto" />
        <p
          className="absolute inset-0 flex items-center justify-center text-orange-600 text-9xl font-prayer text-center p-4"
          style={{ mixBlendMode: "difference" }}
        >
          corner shop beer
        </p>
      </div>
      <ImageScroll images={[beer1, beer2]} />
    </>
  );
}

export default App;
