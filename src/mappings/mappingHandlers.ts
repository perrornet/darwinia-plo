import {SubstrateExtrinsic} from "@subql/types";
import { RemarkedNftAddress } from "../types";

const nftRemarkPrefix = "NFT amount: 1; Rewards receiving address: 0x";

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  // Do something with a call handler here
  const remark = (extrinsic.extrinsic.toHuman() as any)?.method?.args?.remark;
  if (remark?.startsWith(nftRemarkPrefix)) {
    await (new RemarkedNftAddress(
        extrinsic.extrinsic.hash.toString(),
        extrinsic.extrinsic.signer.toString(),
        remark,
        remark?.slice(nftRemarkPrefix.length - 2),  // TODO: Web3 util check address if valid or not
        extrinsic.block.block.header.number.toNumber(),
        extrinsic.idx,
        extrinsic.extrinsic.hash.toString(),
        extrinsic.block.timestamp,
    )).save()
  }
}
