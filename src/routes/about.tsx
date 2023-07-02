const AboutPage = () => {
  return (
    <main>
      <section className="py-16 prose container-7xl dark:prose-invert">
        <h1>About Ord Games</h1>
        <h2>About</h2>
        <p>
          Introducing Ord Games (OG Protocol). OG is a standard for designing
          Bitcoin games and was inspired by Sats Names, BRC-20, Loot and other
          popular NFT games. Also introducing Wizords—the first game build on
          the OG standard. The goal is to inspire a a new cohort of Bitcoin
          builders and eventually create a thriving ecosystem of Bitcoin games.
        </p>
        <h2>Inspiration</h2>
        <p>
          The idea came from an Ordinals Show twitter space. Psifour was saying
          something like, “Why are we copying Ethereum token standards? Ordinals
          are a poor substrate for fungible tokens. Why can’t we focus on
          protocol ideas that are well suited to Bitcoin’s strengths and
          constraints?” I instantly thought of games.
        </p>
        <p>
          Game assets can be simple, onchain representations, governed by sats
          vs. state transformations that need delicate indexing. Game assets can
          be minted once (on the most secure data layer that exists), traded as
          ordinals, and then “consumed” by an evolving ecosystem of games (a la
          Loot). Plus they are fun and I want to make some fun wizard shit. 🧙‍♂️
        </p>
        <h2>Design principles</h2>
        <p>
          Keep it on Bitcoin: With OG, Bitcoin transactions, and only Bitcoin
          transactions, are all that is needed to create a “game universe” of
          players and loot. Any client or indexer can independently index the
          protocol to establish all player and loot state.
        </p>
        <p>
          Max composable: All assets mint as one ordinal, meaning players can
          mix and match assets in a single wallet to create bespoke game players
          or resource sets. Game designers can mix and match assets across OG
          games to create bespoke games, tournaments, or meta game universes. 🤯
        </p>
        <p>
          Open and fair: Anyone can mint any game asset once a new game is
          defined by minting a game "boot" inscription. Just like Sats Names and
          BRC-20 the first minter owns the assets until the supply runs out.
        </p>
        <h2>What is a game universe?</h2>
        <p>
          In the OG protocol, game universes have players and loot. Players are
          unique, each one has a name, avatar, class, and unique history and
          status. Loot is more fungible and has classes and power levels.
          Imagine if World of Warcraft was 100% onchain, permissionless, and
          composable from day one—that is what Wizords is trying to demonstrate.
          Here is a live, onchain, example of two players in the Wizords
          universe with all their loot in specific wallets.
        </p>
        <h2>What games can you make?</h2>
        <p>
          OG is best suited for turn-based, battle games similar to Axie,
          Pokemon, or Magic the Gathering. But it could support much crazier and
          diverse games. Use your imagination and break things (and then fix
          things please). Some ideas:
        </p>
        <p>
          A wizard battle game where you assemble a war chest of weapons, armor,
          and magic items. Already booted on mainnet. ✨ ✨
        </p>
        <p>
          Mecha robot battle game: Assemble your robots from inscribed
          components. Battle one on one or in the arena.
        </p>
        <p>
          Catan knockoff: Turn based resource strategy game where resources, or
          tiles, can be inscribed as loot.
        </p>
        <p>
          Paper, rock, scissors: Just mint a ton of papers, rocks, and scissors
          and battle them by burning one every round of play. This will be very
          expensive and is probably a terrible game idea!
        </p>
        <p>
          V1 syntax is ready. The first game is ready. You can mint players and
          loot right now, inscribe your own game, or build an OG indexer. The
          magical possibilities are endless. ✨
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
