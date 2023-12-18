import op from "./icons/op.svg";
import polygon from "./icons/polygon.svg";
import ethereum from "./icons/ethereum.svg";
import base from "./icons/base.svg";
import opensea from "./icons/os.svg";

export const chainIdToIcon: Record<number, any> = {
  1: ethereum,
  5: ethereum,
  137: polygon,
  80001: polygon,
  10: op,
  420: op,
  8453: base,
  84531: base,
};

export const icons = {
  op,
  polygon,
  ethereum,
  base,
  opensea,
};
