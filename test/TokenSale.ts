import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {parseEther} from "viem";

import { network } from "hardhat";

describe("MyToken", async function () {
  const { viem } = await network.connect();
  const[owner, buyer] = await viem.getWalletClients();
  const publicClient = await viem.getPublicClient();

  it("Should purchase token successfully", async function () {
    const myToken = await viem.deployContract("MyToken", ["MyToken", "MTK", 18]);
    const tokenSale = await viem.deployContract("TokenSale", [myToken.address]);

    const tokenForSale = parseEther("50");
    await myToken.write.transfer([tokenSale.address, tokenForSale]);

    const ethAmount = parseEther("1");
    await tokenSale.write.purchase({
      account: buyer.account,
      value: ethAmount
    });
    
    const buyerBalance = await myToken.read.balanceOf([buyer.account.address]);
    assert.equal(buyerBalance, parseEther("1"));
  });
});