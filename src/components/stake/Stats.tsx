"use client";

import { lynxConfig, staking, stakingConfig } from "@/data/contracts";
import classNames from "classnames";
import { maxUint256, zeroAddress } from "viem";
import {
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

export default function StakingStats() {
  return (
    <div className="py-4 flex flex-col gap-2">
      <SingleStat title="Staked" value="1520" />
      <SingleStat title="Time to Unlock" value="2 weeks" />
      <SingleStat title="Rewarded" value="1520" />
      <SingleStat title="Status" value="Locked" />
    </div>
  );
}

function SingleStat(props: { title: string; value: string }) {
  const { title, value } = props;
  return (
    <div className="flex flex-row items-center justify-between font-raleway gap-6">
      <p className="text-medium">{title}</p>
      <div className="text-lg font-oswald">{value}</div>
    </div>
  );
}

export function DepositAction() {
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
        args: [address || zeroAddress, staking],
      },
    ],
  });

  const { config: approveConfig } = usePrepareContractWrite({
    ...lynxConfig,
    functionName: "approve",
    args: [staking, maxUint256],
  });

  const {
    write: approve,
    data: approveData,
    isLoading: isApproveTxLoading,
  } = useContractWrite(approveConfig);

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: approveData?.hash,
  });

  const hasAllowance = (stakeActionInfo?.[1]?.result || 0n) > 0n;
  return (
    <>
      <div className="form-control">
        <div className="join">
          <input
            className="input input-bordered input-secondary join-item"
            type="number"
            placeholder="000"
            onFocus={(e) => e.target.select()}
          />
          <button className="btn btn-secondary join-item">Max</button>
        </div>
        <label className="label">
          <span className="label-text-alt">Wallet</span>
          <span className="label-text-alt">0.00</span>
        </label>
      </div>
      <button
        className={classNames(
          hasAllowance ? "btn-primary" : "btn-secondary",
          "btn w-full btn-sm"
        )}
        onClick={() => {
          if (hasAllowance) {
            console.log("Stake");
          } else {
            approve?.();
          }
        }}
      >
        {isApproving || isApproveTxLoading ? (
          <span className="loading loading-spinner text-white" />
        ) : hasAllowance ? (
          "Stake"
        ) : (
          "Approve"
        )}
      </button>
      <hr className="w-full my-4" />
      <button
        className={classNames("btn-success", "btn w-full btn-sm")}
        onClick={() => {
          if (hasAllowance) {
            console.log("Stake");
          } else {
            approve?.();
          }
        }}
      >
        {isApproving || isApproveTxLoading ? (
          <span className="loading loading-spinner text-white" />
        ) : (
          "Claim"
        )}
      </button>
    </>
  );
}
