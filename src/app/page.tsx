import Image from "next/image";
import Logo from "../../public/logo.png";
import StakingStats, {
  DepositAction,
  StakeStats,
} from "@/components/stake/Stats";
import stakingBackground from "@/../public/Background 2.png";
import { IoChevronDown } from "react-icons/io5";
import AprSelect from "@/components/stake/AprSelect";
import { Metadata } from "next";
export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-100px)] flex-col items-center relative">
      <section className="relative w-full h-full flex flex-col items-center overflow-clip">
        <div className="absolute w-full h-full top-0">
          <Image
            src={stakingBackground}
            alt="staking-background"
            className="w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-between w-full max-w-7xl py-4 md:py-10 px-4 z-20 bg-gradient-to-r from-base-100 to-transparent via-transparent via-90%">
          <div className="w-full">
            <div className="flex flex-row items-center gap-x-4 pb-6">
              <div className="w-2 md:w-3 h-[50px] md:h-[100px] bg-gradient-to-t from-primary to-transparent" />
              <h1 className="text-4xl md:text-7xl font-bold font-oswald">
                $LYNX Staking
              </h1>
            </div>
            <p className="text-lg md:max-w-xl max-w-xs shadow-text">
              Stake your $LYNX and earn rewards. Tokens are locked for fixed
              periods of time, each period comes with it&apos;s own APR. More
              time, more rewards. Start staking for a minimum of{" "}
              <strong>17.99% APR</strong>
            </p>
          </div>
          <div />
          <div className="flex flex-col items-center md:items-start w-full py-8">
            <StakingStats />
          </div>
          <div className="flex flex-col items-center md:items-start w-full pb-8 relative">
            <a
              className="relative block invisible -top-[100px]"
              id="aprSelect"
            />
            <a
              href="#stake"
              className=" btn btn-sm btn-primary mb-4 uppercase font-bold"
            >
              Choose an APR&nbsp;
              <IoChevronDown />
            </a>
            <AprSelect />
            <DepositAction />
          </div>
        </div>
      </section>
      <section className="py-10">
        <a className="relative block invisible -top-[100px]" id="stake" />
        <StakeStats />
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Lynx Tech | Staking",
  description:
    "Stake your $LYNX and earn rewards. Tokens are locked for fixed periods of time, each period comes with it's own APR. More time, more rewards. Start staking for a minimum of 17.99% APR",
};
