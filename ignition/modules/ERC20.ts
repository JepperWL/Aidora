import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ERC20Module", (m) => {
  const erc20 = m.contract("ERC20", ["AIDORA", "ADR", 18n]);
  m.call(erc20, "mint", ["0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", 1000000000000000000000n]);
  return { erc20 };
});
