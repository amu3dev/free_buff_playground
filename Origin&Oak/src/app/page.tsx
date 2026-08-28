import Hero from "@/components/Hero";
import MenuSection from "@/components/Menu";
import CustomDrinkBuilder from "@/components/CustomDrinkBuilder";
import LoyaltyRewards from "@/components/LoyaltyRewards";
import StoreLocator from "@/components/StoreLocator";

export default function Home() {
  return (
    <>
      <Hero />
      <MenuSection />
      <CustomDrinkBuilder />
      <LoyaltyRewards />
      <StoreLocator />
    </>
  );
}
