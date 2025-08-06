import BinaryMenu from "../components/BinaryMenu";

export default function ShopsAddMenu() {
  return (
    <BinaryMenu
      leftLink="/shops-inventory"
      rightLink="/shops-new"
      leftTitle="view"
      rightTitle="add"
      leftColor="#EC4899"
      rightColor="#EF4444"
      leftTextColor="#F9FAFB"
      rightTextColor="#F9FAFB"
    />
  );
}

// blue - #3B82F6, green - #10B981, purple - #8B5CF6, teal - #06B6D4, indigo - #6366F1, orange - #F59E0B, pink - #EC4899, red - #EF4444
