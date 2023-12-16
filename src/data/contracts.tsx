import { erc20ABI } from "wagmi";
import StakingABI from "./abi/StakingABI";

export const lynxToken = "0x80d186b4c786ea66592b2c52e2004ab10cfe4cf3";
export const vault = "0xcF3FdD93bD43F24c84Aa1002735F07Ee83e194Ec";

export const staking18 = "0xe5830C4F2A3d70Bc19e52569bE6120FF7B303eFE";
export const staking20 = "0xd6a8C071dFC1e97CDee8E33eEF4d8cF0D978C011";
export const staking25 = "0x26e5E3678D7AD1041319C34F2b90CaaA812c055A";

export const stakingConfig = {
  abi: StakingABI,
} as const;

export const lynxConfig = {
  address: lynxToken,
  abi: erc20ABI,
} as const;
