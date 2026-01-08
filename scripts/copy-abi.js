import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deploymentsDir = path.join(__dirname, "../ignition/deployments/chain-31337");
const artifactsDir = path.join(deploymentsDir, "artifacts");
const frontendDir = path.join(__dirname, "../frontend");
const abiDir = path.join(frontendDir, "src", "abis");

if (!fs.existsSync(abiDir)) fs.mkdirSync(abiDir, { recursive: true });

const tokenSaleArtifactSrc = path.join(artifactsDir, "TokenSaleModule#TokenSale.json");
const deployedAddressSrc = path.join(deploymentsDir, "deployed_addresses.json");

fs.copyFileSync(tokenSaleArtifactSrc, path.join(abiDir, "TokenSale.json"));
fs.copyFileSync(deployedAddressSrc, path.join(abiDir, "deployed_addresses.json"));

console.log("ABI and deployed addresses copied to frontend directory.");