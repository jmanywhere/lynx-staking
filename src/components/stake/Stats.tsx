"use client";

import { aprSelectAtom } from "@/data/atoms";
import {
  lynxConfig,
  staking18,
  staking20,
  staking25,
  stakingConfig,
  vault,
} from "@/data/contracts";
import classNames from "classnames";
import { useAtomValue } from "jotai";
import { use, useState } from "react";
import { formatEther, maxUint256, parseEther, zeroAddress } from "viem";
import {
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import formatDuration from "date-fns/formatDuration";
import intervalToDuration from "date-fns/intervalToDuration";

export default function StakingStats() {
  const { data } = useContractReads({
    contracts: [
      {
        address: staking18,
        ...stakingConfig,
        functionName: "totalStaked",
      },
      {
        address: staking20,
        ...stakingConfig,
        functionName: "totalStaked",
      },
      {
        address: staking25,
        ...stakingConfig,
        functionName: "totalStaked",
      },
    ],
    watch: true,
  });

  return (
    <div className="stats shadow stats-vertical sm:stats-horizontal text-primary border-2 border-primary">
      <SingleStat
        title="Staked"
        value={parseInt(
          formatEther(
            (data?.[0]?.result || 0n) +
              (data?.[1]?.result || 0n) +
              (data?.[2]?.result || 0n)
          )
        ).toLocaleString()}
        desc="LYNX"
      />
      <SingleStat title="Min Lock" value="2" desc="Weeks" />
      <SingleStat title="APR" value="17.99%" desc="Min" />
    </div>
  );
}

function SingleStat(props: { title: string; value: string; desc: string }) {
  const { title, value, desc } = props;
  return (
    <div className="stat">
      <p className="stat-title">{title}</p>
      <div className="stat-value">{value}</div>
      <p className="stat-desc">{desc}</p>
    </div>
  );
}

const aprContracts = {
  "0": staking18,
  "18": staking18,
  "20": staking20,
  "25": staking25,
} as { [key: string]: `0x${string}` };

export function DepositAction() {
  const apr = useAtomValue(aprSelectAtom);
  const [depositAmount, setDepositAmount] = useState("");
  const selectedAPR = aprContracts[apr.toString() as "18" | "20" | "25"];
  const { address } = useAccount();
  const { data: stakeActionInfo } = useContractReads({
    contracts: [
      {
        ...lynxConfig,
        functionName: "balanceOf",
        args: [address || zeroAddress],
      },
      {
        ...lynxConfig,
        functionName: "allowance",
        args: [address || zeroAddress, selectedAPR],
      },
    ],
  });

  const { config: approveConfig } = usePrepareContractWrite({
    ...lynxConfig,
    functionName: "approve",
    args: [selectedAPR, maxUint256],
  });
  const { config: depositConfig } = usePrepareContractWrite({
    ...stakingConfig,
    address: selectedAPR,
    functionName: "deposit",
    args: [parseEther(depositAmount)],
  });

  const {
    write: approve,
    data: approveData,
    isLoading: isApproveTxLoading,
  } = useContractWrite(approveConfig);

  const {
    write: deposit,
    data: depositData,
    isLoading: isDepositTxLoading,
  } = useContractWrite(depositConfig);

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: approveData?.hash,
  });
  const { isLoading: isDepositing } = useWaitForTransaction({
    hash: depositData?.hash,
  });

  const userInfoParsed = {
    balance: stakeActionInfo?.[0]?.result || 0n,
  };

  const hasAllowance = (stakeActionInfo?.[1]?.result || 0n) > 0n;
  return (
    <>
      <div className="py-4">
        <h3 className="text-xl font-bold">Deposit LYNX</h3>
        {apr > 0 ? (
          <h4 className="font-medium">Selected APR: {apr.toFixed(2)}%</h4>
        ) : (
          <a
            href="#aprSelect"
            className=" btn btn-sm btn-primary mb-4 uppercase font-bold"
          >
            Select APR
          </a>
        )}
      </div>
      <div className="form-control">
        <div className="join">
          <input
            className="input input-bordered input-secondary join-item"
            type="number"
            placeholder="000"
            value={depositAmount}
            onChange={(e) => {
              if (isNaN(e.target.valueAsNumber)) setDepositAmount("");
              else setDepositAmount(parseInt(e.target.value).toString());
            }}
            onFocus={(e) => e.target.select()}
          />
          <button
            className="btn btn-secondary join-item"
            onClick={() =>
              setDepositAmount(
                parseInt(formatEther(userInfoParsed.balance || 0n)).toString()
              )
            }
          >
            Max
          </button>
        </div>
        <label className="label">
          <span className="label-text-alt">Wallet</span>
          <span className="label-text-alt">
            {parseInt(
              formatEther(userInfoParsed.balance || 0n)
            ).toLocaleString()}
            &nbsp;LYNX
          </span>
        </label>
      </div>
      <button
        className={classNames(
          hasAllowance ? "btn-primary" : "btn-secondary",
          "btn w-full btn-sm max-w-xs"
        )}
        onClick={() => {
          if (hasAllowance) {
            deposit?.();
          } else {
            approve?.();
          }
        }}
      >
        {isApproving ||
        isApproveTxLoading ||
        isDepositTxLoading ||
        isDepositing ? (
          <span className="loading loading-spinner text-white" />
        ) : hasAllowance ? (
          "Stake"
        ) : (
          "Approve"
        )}
      </button>
    </>
  );
}

export function StakeStats() {
  const { address } = useAccount();
  const { data } = useContractReads({
    contracts: [
      {
        address: staking18,
        ...stakingConfig,
        functionName: "totalStaked",
      },
      {
        address: staking18,
        ...stakingConfig,
        functionName: "aprConfig",
      },
      {
        address: staking18,
        ...stakingConfig,
        functionName: "stake",
        args: [address || zeroAddress],
      },
      {
        address: staking18,
        ...stakingConfig,
        functionName: "currentRewards",
        args: [address || zeroAddress],
      },
      {
        address: staking20,
        ...stakingConfig,
        functionName: "totalStaked",
      },
      {
        address: staking20,
        ...stakingConfig,
        functionName: "aprConfig",
      },
      {
        address: staking20,
        ...stakingConfig,
        functionName: "stake",
        args: [address || zeroAddress],
      },
      {
        address: staking20,
        ...stakingConfig,
        functionName: "currentRewards",
        args: [address || zeroAddress],
      },
      {
        address: staking25,
        ...stakingConfig,
        functionName: "totalStaked",
      },
      {
        address: staking25,
        ...stakingConfig,
        functionName: "aprConfig",
      },
      {
        address: staking25,
        ...stakingConfig,
        functionName: "stake",
        args: [address || zeroAddress],
      },
      {
        address: staking25,
        ...stakingConfig,
        functionName: "currentRewards",
        args: [address || zeroAddress],
      },
    ],
    watch: true,
  });
  console.log({ data });
  return (
    <table className="table overflow-hidden">
      <thead className="bg-primary text-black">
        <tr>
          <th>APR</th>
          <th className="hidden md:block">Total Stake</th>
          <th>User Stake</th>
          <th>Claim Time</th>
          <th>Rewards</th>
          <th className="hidden md:block">Action</th>
        </tr>
      </thead>
      <tbody>
        <TableRow
          apr="17.99%"
          totalStaked={data?.[0]?.result || 0n}
          userStaked={data?.[2]?.result?.[0] || 0n}
          endTime={data?.[2]?.result?.[2] || 0n}
          rewards={data?.[3]?.result || 0n}
        />
        <TableRow
          apr="20%"
          totalStaked={data?.[4]?.result || 0n}
          userStaked={data?.[6]?.result?.[0] || 0n}
          endTime={data?.[6]?.result?.[2] || 0n}
          rewards={data?.[7]?.result || 0n}
        />
        <TableRow
          apr="25%"
          totalStaked={data?.[8]?.result || 0n}
          userStaked={data?.[10]?.result?.[0] || 0n}
          endTime={data?.[10]?.result?.[2] || 0n}
          rewards={data?.[11]?.result || 0n}
        />
      </tbody>
    </table>
  );
}

const TableRow = (props: {
  apr: string;
  totalStaked: bigint;
  userStaked: bigint;
  endTime: bigint;
  rewards: bigint;
}) => {
  const { apr, totalStaked, userStaked, endTime, rewards } = props;
  console.log({
    endTime,
    isEnded: BigInt(Math.floor(Date.now() / 1000)) > (endTime || 0n),
    now: BigInt(Math.floor(Date.now() / 1000)),
  });
  return (
    <tr>
      <td>{apr}</td>
      <td className="hidden md:block">
        {parseInt(formatEther(totalStaked || 0n)).toLocaleString()}
      </td>
      <td>{parseInt(formatEther(userStaked || 0n)).toLocaleString()}</td>
      <td className="font-mono">
        {(userStaked || 0n) > 0n
          ? BigInt(Math.floor(Date.now() / 1000)) < (endTime || 0n)
            ? formatDuration(
                intervalToDuration({
                  start: new Date(),
                  end: new Date(parseInt((endTime || 0n).toString()) * 1000),
                })
              )
                .replace(" months", "M")
                .replace(" days", "D")
                .replace(" hours ", "h")
                .replace(" minutes ", "m")
                .replace(" seconds", "s")
            : "Claimable"
          : "-"}
      </td>
      <td>
        {parseFloat(formatEther(rewards || 0n)).toLocaleString(undefined, {
          maximumFractionDigits: 4,
        })}
      </td>
      <td className="hidden md:block">
        <button className="btn" disabled>
          Claim
        </button>
      </td>
    </tr>
  );
};
