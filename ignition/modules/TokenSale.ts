import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TokenSaleModule", (m) => {
  const myToken = m.contract("MyToken", ["AIDORA", "ADR", 18n]);
  const tokenSale = m.contract("TokenSale", [myToken]);

  const amount = 50 * 10 ** 18;
  m.call(myToken, "transfer", [tokenSale, BigInt(amount)]);

  return { myToken, tokenSale };
});
