import LoadingGrid from "@/components/hero/LoadingGrid";
import NeuralNetwork from "@/components/hero/NeuralNetwork";
import ResumeActions from "@/components/hero/ResumeActions";

const Hero = () => {
  return (
    <div className="flex justify-center mt-[4rem]">
      <div className="flex justify-center align-middle items-center">
        <NeuralNetwork />
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-56 h-56 bg-stone-50 rounded-3xl overflow-hidden">
          <LoadingGrid />
        </div>
        <div className="justify-start text-white text-5xl font-black font-['Orbitron'] leading-10 tracking-[7.20px]">
          AMAN KUMAR
        </div>
        <div className="justify-start text-white text-xl font-normal font-['Poppins'] leading-7">
          Full Stack Developer AI/ML Industry4.0
        </div>
        <p className="text-wrap w-[32rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          aliquam ut ullam culpa quis aperiam beatae blanditiis, cumque quia
          quam itaque esse error et, cum, quasi aliquid labore natus explicabo.
        </p>
        <div className=" rounded-xl cursor-pointer flex gap-4">
          <ResumeActions />
        </div>
      </div>
    </div>
  );
};

export default Hero;
