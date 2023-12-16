import { erc20ABI } from "wagmi";
import StakingABI from "./abi/StakingABI";

export const lynxToken = "0x80d186b4c786ea66592b2c52e2004ab10cfe4cf3";
export const vault = "0xcF3FdD93bD43F24c84Aa1002735F07Ee83e194Ec";

export const staking18 = "0x0fc5DE9384252d359A0E9A39a74cc16e8Cf8E92e";
export const staking20 = "0xB8A001b77C8CeB472261CDB2Da534470653d8d12";
export const staking25 = "0xd127D1Bb9B881F575C0F135833c379ab5D156D89";

export const stakingConfig = {
  abi: StakingABI,
} as const;

export const lynxConfig = {
  address: lynxToken,
  abi: erc20ABI,
} as const;
