import Image from "next/image";
export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center gap-8 text-white">
      <Image
        src="/adaptive-icon.png"
        alt="ThisWay logo"
        width={120}
        height={120}
      />
    </div>
  );
}
