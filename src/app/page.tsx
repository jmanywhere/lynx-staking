import Image from "next/image";
import Logo from "../../public/logo.png";
import StakingStats, { DepositAction } from "@/components/stake/Stats";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="flex flex-row items-center justify-between w-full max-w-5xl py-8 md:py-24 px-4">
        <div className="md:max-w-[50vw] max-w-xs">
          <div className="flex flex-row items-center gap-x-4 pb-6">
            <div className="w-2 md:w-3 h-[50px] md:h-[100px] bg-gradient-to-t from-primary to-transparent" />
            <h1 className="text-4xl md:text-7xl font-bold font-oswald">
              $LYNX Staking
            </h1>
          </div>
          <p className="text-lg">
            Stake your $LYNX and earn rewards. Tokens are locked for fixed
            periods of time, each period comes with it&apos;s own APR. More
            time, more rewards. Start staking for a minimum of{" "}
            <strong>17.99% APR</strong>
          </p>
        </div>
        <div />
      </section>
      <section className="flex flex-col items-center w-full max-w-5xl pb-8">
        <div className="stats shadow stats-vertical sm:stats-horizontal text-primary border-2 border-primary">
          <div className="stat">
            <p className="stat-title">Total Staked</p>
            <div className="stat-value">0</div>
            <p className="stat-desc">LYNX</p>
          </div>
          <div className="stat">
            <p className="stat-title">Min Lock</p>
            <div className="stat-value">2</div>
            <p className="stat-desc">Weeks</p>
          </div>
          <div className="stat">
            <p className="stat-title">APR</p>
            <div className="stat-value">17.99%</div>
            <p className="stat-desc">Min</p>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center w-full max-w-5xl pb-8">
        <div className="border-2 border-primary/70 p-8 min-w-[260px] rounded-2xl">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-bold font-raleway">Stake $LYNX</h2>
            <Image src={Logo} className="w-10 h-10" alt="Lynx Logo" />
          </div>
          <StakingStats />
          <DepositAction />
        </div>
      </section>
    </main>
  );
}
