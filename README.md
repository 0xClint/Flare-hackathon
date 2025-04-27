# Trojan

## Introduction
*Trojan* is a dynamic single-player 2D web3 game built to demonstrate the power of true randomness and real-time crypto integration. Players engage in thrilling battles across randomized maps, wielding classic swords or modern projectiles. Every session offers a unique adventure, powered by decentralized technologies to keep gameplay fresh and unpredictable.

## Gameplay
In *Trojan*, players navigate through varied terrains, battling enemies and overcoming obstacles that spawn dynamically. Movement and attacks are controlled with simple keybinds, offering an accessible yet challenging experience.

### Controls

| Key | Action |
|:---:|:------|
| W / ↑ | Move Upward |
| A / ← | Move Leftward |
| D / → | Move Rightward |
| S / ↓ | Move Downward |
| Z | Sword Swing |
| X | Shoot Arrow |

Randomness is at the heart of the game: enemy counts, spawn points, and obstacle locations are all determined using secure random numbers, making each playthrough unique.

In addition, real-time crypto price feeds are displayed during gameplay, merging the thrill of gaming with the dynamic world of crypto markets.

### Game Flow

mermaid
flowchart TD
    A[Start Game] --> B{Choose Map}
    B --> C[Randomize Spawn Points]
    C --> D[Spawn Player & Enemies]
    D --> E{Real-time Crypto Feed}
    E --> F[Display Crypto Prices]
    D --> G[Battle: Sword Swing or Shoot Arrow]
    G --> H[Win or Lose]
    H --> I[Replay or Exit]



## Technology Integration

*Flare Random Number Generator (RNG):*  
We utilized Flare’s secure RNG to generate multiple random numbers per second. These numbers dynamically determine gameplay elements like spawn points, obstacle placements, and enemy strengths, ensuring no two play sessions feel the same.

*Flare Time Series Oracle (FTSO):*  
We integrated real-time crypto price feeds using FTSO, allowing players to stay connected with the crypto market while immersed in gameplay. This adds an engaging dimension for crypto enthusiasts.

*Future with FDC:*  
We plan to integrate Flare’s FDC to enable seamless bridging between web2 and web3 environments, unlocking new gameplay possibilities and player ownership models.

## Future Plans

Looking ahead, *Trojan* will evolve into a mystical, expansive 2D universe with features such as:

-   WebSocket integration for real-time player interactions
    
-   Battle royale modes
    
-   Randomized diverse maps and terrains
    
-   Varied enemies, obstacles, and elemental weapons
    
-   Special items like health potions and power suits
    
-   Chat functionality through sockets
    
-   NFT-based world ownership and items
    
-   Battle passes to drive player engagement
    

The vision is to create a flexible, endlessly expandable web3 gaming ecosystem.

----------
