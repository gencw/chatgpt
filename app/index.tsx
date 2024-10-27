import AnimatedIntro from "@/components/AnimatedIntro";
import CustomView from "@/components/CustomView";
import LoginBottonList from "@/components/login/LoginBottonList";

export default function Index() {
  return (
    <CustomView>
      <AnimatedIntro />
      <LoginBottonList />
    </CustomView>
  );
}
