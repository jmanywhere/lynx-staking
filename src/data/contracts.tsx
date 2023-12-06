import { erc20ABI } from "wagmi";
import StakingABI from "./abi/StakingABI";

export const lynxToken = "0x80d186b4c786ea66592b2c52e2004ab10cfe4cf3";
export const staking = "0xfB2f8534139438D5E440aCD0fA59aF20fcd9b50C";
export const vault = "0xfB2f8534139438D5E440aCD0fA59aF20fcd9b50C";

export const stakingConfig = {
  address: staking,
  abi: StakingABI,
} as const;

export const lynxConfig = {
  address: lynxToken,
  abi: erc20ABI,
} as const;
