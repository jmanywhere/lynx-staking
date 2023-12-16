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
import { useState } from "react";
import { formatEther, maxUint256, parseEther, zeroAddress } from "viem";
import {
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

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
