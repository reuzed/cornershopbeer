export default function ImageScroll({ images }: any) {
  return images.map((image: any) => <img src={image} />);
}
