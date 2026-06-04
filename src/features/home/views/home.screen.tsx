import DealsBanner from "../components/DealsBanner";
import FeaturedProducts from "../components/FeaturedProducts";
import Newsletter from "../components/Newsletter";
import OurCatigories from "../components/OurCatigories";
import PromoBanners from "../components/PromoBanner";
import Slider from "../components/Slider";
export default function HomeScreen() {
  return (
    <>
      <Slider />
      <PromoBanners />
      <OurCatigories />
      <DealsBanner />
      <FeaturedProducts />
      <Newsletter />
    </>
  );
}
