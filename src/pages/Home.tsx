import "./App.css";
import beer from "../assets/overhead_beers.jpg";
import ImageScroll from "../components/ImageScroll";
import BinaryMenu from "../components/BinaryMenu";

function Home() {
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
      {/* <ImageScroll images={[beer1, beer2]} /> */}
      <BinaryMenu
        leftLink="/beers-menu"
        rightLink="/shops-menu"
        leftTitle="beers"
        rightTitle="shops"
        leftColor="#3B82F6"
        rightColor="#10B981"
        leftTextColor="#F9FAFB"
        rightTextColor="#F9FAFB"
      />
    </>
  );
}
// Pastelle
// green - #cafde0, yellow - #ffedb4, pink - #ffedb4, blue - #b9cefb, purple - #b9cefb
// Combined unique colors:
// blue - #3B82F6, green - #10B981, purple - #8B5CF6, teal - #06B6D4, indigo - #6366F1, orange - #F59E0B, pink - #EC4899, red - #EF4444
// Text colors for these backgrounds:
// Primary text (high contrast):
// white - #FFFFFF, off-white - #F9FAFB, light-gray - #F3F4F6
// Secondary text (for white/light backgrounds):
// charcoal - #374151, dark-navy - #1E293B, deep-gray - #111827

export default Home;
