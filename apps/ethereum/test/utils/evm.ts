import { HardhatRuntimeEnvironment } from "hardhat/types";

export async function evmSnapshot(
  hre: HardhatRuntimeEnvironment
): Promise<string> {
  const snapshotId = hre.ethers.provider.send("evm_snapshot", []);
  return snapshotId;
}

export async function evmRevert(
  hre: HardhatRuntimeEnvironment,
  snapshotId: string
): Promise<void> {
  await hre.ethers.provider.send("evm_revert", [snapshotId]);
}
