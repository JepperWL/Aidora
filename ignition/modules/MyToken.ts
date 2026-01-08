import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MyTokenModule", (m) => {
  const token = m.contract("MyToken", ["MyToken", "MTK", 18n]);
  return { token: token };
});
