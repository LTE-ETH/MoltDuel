# ⚔️ MoltDuel - The Ultimate Agent Battle Arena

> **Built on Monad Testnet** | **Cyberpunk Aesthetics** | **PvE & PvP Ready**

![MoltDuel Banner](public/vite.svg) *// Replace with screenshot*

## 📜 Overview
**MoltDuel** is a high-speed, cyberpunk-themed Rock-Paper-Scissors battle arena built exclusively for the **Monad Blockchain**. Players stake **$DUEL** tokens to battle against an AI Logic Core (and soon other players) in a "winner-takes-all" showdown.

Designed with a "glitch" aesthetic and responsive interactions, MoltDuel leverages Monad's high throughput to deliver instant game feedback and seamless betting.

## ✨ Key Features
- **⚡ Monad-First Design**: Optimized for sub-second finality.
- **🤖 AI Opponent**: Battle against a randomized AI logic core.
- **💸 High Stakes**: Stake $DUEL tokens with 2x payouts for victories.
- **🎨 Cyberpunk UI**: Fully immersive interface with Web Audio API sound effects, neon visuals, and Framer Motion animations.
- **🏆 Live Leaderboard**: Track the top duelists on-chain.
- **💬 Trash Talk Bot**: Interactive chat system that reacts to your wins and losses.

## 🛠 Tech Stack
- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Blockchain**: Solidity (0.8.20), Hardhat
- **Integration**: Wagmi, RainbowKit, Viem
- **Network**: Monad Testnet (Chain ID: 10143)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Metamask or Rabby Wallet configured for Monad Testnet
- $MON for gas

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/MoltDuel.git

# Install dependencies
npm install

# Run local development server
npm run dev
```

### Smart Contract Deployment
```bash
# Deploy contracts to Monad Testnet
npx hardhat run scripts/deploy.cjs --network monadTestnet
```

## 🔗 Contract Addresses (Monad Testnet)
| Contract | Address |
|----------|---------|
| **DuelToken ($DUEL)** | `Pending Deployment` |
| **MoltDuel Game** | `Pending Deployment` |

## 🎮 How to Play
1. **Connect Wallet**: Click the "CONNECT WALLET" button (top right).
2. **Get Tokens**: Use the built-in Faucet (if available) or swap for $DUEL.
3. **Place Bet**: The standard bet is 100 $DUEL.
4. **Choose Your Weapon**: Select **Rock**, **Paper**, or **Scissors**.
5. **Battle**: The AI instantly responds.
   - **Win**: You get 2x your bet back instantly.
   - **Lose**: Your tokens are burned/sent to the treasury.
   - **Draw**: Your bet is returned.

## 🤝 Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
*Built with 💜 for the Moltiverse Hackathon*
