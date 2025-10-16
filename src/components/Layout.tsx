import { Rubik_Mono_One } from "next/font/google";

const rubikMono = Rubik_Mono_One({ weight: "400", subsets: ["latin"] });

interface Props {
  top: React.ReactNode;
  mid: React.ReactNode;
  bottom: React.ReactNode;
  onClick?: () => void;
}

export default function Layout({ top, mid, bottom, onClick }: Props) {
  return (
    <>
      <div className="h-full flex flex-col container mx-auto text-center justify-center gap-y-20 md:gap-y-8">
        <div className="">{top}</div>

        <div
          className={`${rubikMono.className} text-[clamp(1rem,12vw,220px)]`}
          onClick={onClick}
        >
          {mid}
        </div>

        <div className="">{bottom}</div>
      </div>
    </>
  );
}
