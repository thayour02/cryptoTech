const API_KEY = process.env.CRYPTO_API_KEY;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ids = url.searchParams.get('ids');

  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${ids}`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY!,
      },
    }
  );

  const res = await response.json();
  return Response.json(res.data);
 
}

// const data = [
//   {
//     "1": {
//         "id": 1,
//         "name": "Bitcoin",
//         "symbol": "BTC",
//         "category": "coin",
//         "description": "Bitcoin (BTC) is a cryptocurrency launched in 2010. Users are able to generate BTC through the process of mining. Bitcoin has a current supply of 19,887,415. The last known price of Bitcoin is 108,096.27239383 USD and is down -1.70 over the last 24 hours. It is currently trading on 12238 active market(s) with $40,581,091,894.00 traded over the last 24 hours. More information can be found at https://bitcoin.org/.",
//         "slug": "bitcoin",
//         "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
//         "subreddit": "bitcoin",
//         "notice": "",
//         "tags": [
//             "mineable",
//             "pow",
//             "sha-256",
//             "store-of-value",
//             "state-channel",
//             "coinbase-ventures-portfolio",
//             "three-arrows-capital-portfolio",
//             "polychain-capital-portfolio",
//             "binance-labs-portfolio",
//             "blockchain-capital-portfolio",
//             "boostvc-portfolio",
//             "cms-holdings-portfolio",
//             "dcg-portfolio",
//             "dragonfly-capital-portfolio",
//             "electric-capital-portfolio",
//             "fabric-ventures-portfolio",
//             "framework-ventures-portfolio",
//             "galaxy-digital-portfolio",
//             "huobi-capital-portfolio",
//             "alameda-research-portfolio",
//             "a16z-portfolio",
//             "1confirmation-portfolio",
//             "winklevoss-capital-portfolio",
//             "usv-portfolio",
//             "placeholder-ventures-portfolio",
//             "pantera-capital-portfolio",
//             "multicoin-capital-portfolio",
//             "paradigm-portfolio",
//             "bitcoin-ecosystem",
//             "layer-1",
//             "ftx-bankruptcy-estate",
//             "2017-2018-alt-season",
//             "us-strategic-crypto-reserve",
//             "binance-ecosystem",
//             "binance-listing"
//         ],
//         "tag-names": [
//             "Mineable",
//             "PoW",
//             "SHA-256",
//             "Store Of Value",
//             "State Channel",
//             "Coinbase Ventures Portfolio",
//             "Three Arrows Capital Portfolio",
//             "Polychain Capital Portfolio",
//             "YZi Labs Portfolio",
//             "Blockchain Capital Portfolio",
//             "BoostVC Portfolio",
//             "CMS Holdings Portfolio",
//             "DCG Portfolio",
//             "DragonFly Capital Portfolio",
//             "Electric Capital Portfolio",
//             "Fabric Ventures Portfolio",
//             "Framework Ventures Portfolio",
//             "Galaxy Digital Portfolio",
//             "Huobi Capital Portfolio",
//             "Alameda Research Portfolio",
//             "a16z Portfolio",
//             "1Confirmation Portfolio",
//             "Winklevoss Capital Portfolio",
//             "USV Portfolio",
//             "Placeholder Ventures Portfolio",
//             "Pantera Capital Portfolio",
//             "Multicoin Capital Portfolio",
//             "Paradigm Portfolio",
//             "Bitcoin Ecosystem",
//             "Layer 1",
//             "FTX Bankruptcy Estate ",
//             "2017/18 Alt season",
//             "US Strategic Crypto Reserve",
//             "Binance Ecosystem",
//             "Binance Listing"
//         ],
//         "tag-groups": [
//             "OTHERS",
//             "ALGORITHM",
//             "ALGORITHM",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "PLATFORM",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY"
//         ],
//         "urls": {
//             "website": [
//                 "https://bitcoin.org/"
//             ],
//             "twitter": [],
//             "message_board": [
//                 "https://bitcointalk.org"
//             ],
//             "chat": [],
//             "facebook": [],
//             "explorer": [
//                 "https://blockchain.info/",
//                 "https://live.blockcypher.com/btc/",
//                 "https://blockchair.com/bitcoin",
//                 "https://explorer.viabtc.com/btc",
//                 "https://www.okx.com/web3/explorer/btc"
//             ],
//             "reddit": [
//                 "https://reddit.com/r/bitcoin"
//             ],
//             "technical_doc": [
//                 "https://bitcoin.org/bitcoin.pdf"
//             ],
//             "source_code": [
//                 "https://github.com/bitcoin/bitcoin"
//             ],
//             "announcement": []
//         },
//         "platform": null,
//         "date_added": "2010-07-13T00:00:00.000Z",
//         "twitter_username": "",
//         "is_hidden": 0,
//         "date_launched": "2010-07-13T00:00:00.000Z",
//         "contract_address": [],
//         "self_reported_circulating_supply": null,
//         "self_reported_tags": null,
//         "self_reported_market_cap": null,
//         "infinite_supply": false
//     },
//     "1027": {
//         "id": 1027,
//         "name": "Ethereum",
//         "symbol": "ETH",
//         "category": "coin",
//         "description": "Ethereum (ETH) is a cryptocurrency . Ethereum has a current supply of 120,717,083.37092331. The last known price of Ethereum is 2,518.34336996 USD and is down -3.34 over the last 24 hours. It is currently trading on 10367 active market(s) with $14,403,701,107.56 traded over the last 24 hours. More information can be found at https://www.ethereum.org/.",
//         "slug": "ethereum",
//         "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
//         "subreddit": "ethereum",
//         "notice": "",
//         "tags": [
//             "pos",
//             "smart-contracts",
//             "ethereum-ecosystem",
//             "coinbase-ventures-portfolio",
//             "three-arrows-capital-portfolio",
//             "polychain-capital-portfolio",
//             "binance-labs-portfolio",
//             "blockchain-capital-portfolio",
//             "boostvc-portfolio",
//             "cms-holdings-portfolio",
//             "dcg-portfolio",
//             "dragonfly-capital-portfolio",
//             "electric-capital-portfolio",
//             "fabric-ventures-portfolio",
//             "framework-ventures-portfolio",
//             "hashkey-capital-portfolio",
//             "kenetic-capital-portfolio",
//             "huobi-capital-portfolio",
//             "alameda-research-portfolio",
//             "a16z-portfolio",
//             "1confirmation-portfolio",
//             "winklevoss-capital-portfolio",
//             "usv-portfolio",
//             "placeholder-ventures-portfolio",
//             "pantera-capital-portfolio",
//             "multicoin-capital-portfolio",
//             "paradigm-portfolio",
//             "ethereum-pow-ecosystem",
//             "layer-1",
//             "ftx-bankruptcy-estate",
//             "sora-ecosystem",
//             "rsk-rbtc-ecosystem",
//             "world-liberty-financial-portfolio",
//             "us-strategic-crypto-reserve",
//             "binance-ecosystem",
//             "binance-listing"
//         ],
//         "tag-names": [
//             "PoS",
//             "Smart Contracts",
//             "Ethereum Ecosystem",
//             "Coinbase Ventures Portfolio",
//             "Three Arrows Capital Portfolio",
//             "Polychain Capital Portfolio",
//             "YZi Labs Portfolio",
//             "Blockchain Capital Portfolio",
//             "BoostVC Portfolio",
//             "CMS Holdings Portfolio",
//             "DCG Portfolio",
//             "DragonFly Capital Portfolio",
//             "Electric Capital Portfolio",
//             "Fabric Ventures Portfolio",
//             "Framework Ventures Portfolio",
//             "Hashkey Capital Portfolio",
//             "Kenetic Capital Portfolio",
//             "Huobi Capital Portfolio",
//             "Alameda Research Portfolio",
//             "a16z Portfolio",
//             "1Confirmation Portfolio",
//             "Winklevoss Capital Portfolio",
//             "USV Portfolio",
//             "Placeholder Ventures Portfolio",
//             "Pantera Capital Portfolio",
//             "Multicoin Capital Portfolio",
//             "Paradigm Portfolio",
//             "Ethereum PoW Ecosystem",
//             "Layer 1",
//             "FTX Bankruptcy Estate ",
//             "Sora Ecosystem",
//             "RSK RBTC Ecosystem",
//             "World Liberty Financial Portfolio",
//             "US Strategic Crypto Reserve",
//             "Binance Ecosystem",
//             "Binance Listing"
//         ],
//         "tag-groups": [
//             "ALGORITHM",
//             "CATEGORY",
//             "PLATFORM",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "PLATFORM",
//             "CATEGORY",
//             "CATEGORY",
//             "PLATFORM",
//             "PLATFORM",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY",
//             "CATEGORY"
//         ],
//         "urls": {
//             "website": [
//                 "https://www.ethereum.org/",
//                 "https://en.wikipedia.org/wiki/Ethereum"
//             ],
//             "twitter": [
//                 "https://twitter.com/ethereum"
//             ],
//             "message_board": [
//                 "https://forum.ethereum.org/",
//                 "https://ethresear.ch/"
//             ],
//             "chat": [
//                 "https://gitter.im/orgs/ethereum/rooms"
//             ],
//             "facebook": [],
//             "explorer": [
//                 "https://etherscan.io/",
//                 "https://app.nansen.ai/token-god-mode?chain=ethereum&tab=transactions&tokenAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
//                 "https://solscan.io/token/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
//                 "https://bscscan.com/token/0x2170ed0880ac9a755fd29b2688956bd959f933f8",
//                 "https://www.okx.com/web3/explorer/eth"
//             ],
//             "reddit": [
//                 "https://reddit.com/r/ethereum"
//             ],
//             "technical_doc": [
//                 "https://github.com/ethereum/wiki/wiki/White-Paper"
//             ],
//             "source_code": [
//                 "https://github.com/ethereum/go-ethereum"
//             ],
//             "announcement": [
//                 "https://bitcointalk.org/index.php?topic=428589.0"
//             ]
//         },
//         "platform": null,
//         "date_added": "2015-08-07T00:00:00.000Z",
//         "twitter_username": "ethereum",
//         "is_hidden": 0,
//         "date_launched": null,
//         "contract_address": [
//             {
//                 "contract_address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
//                 "platform": {
//                     "name": "BNB Smart Chain (BEP20)",
//                     "coin": {
//                         "id": "1839",
//                         "name": "BNB",
//                         "symbol": "BNB",
//                         "slug": "bnb"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "0x64ff637fb478863b7468bc97d30a5bf3a428a1fd",
//                 "platform": {
//                     "name": "HECO",
//                     "coin": {
//                         "id": "2502",
//                         "name": "Huobi Token",
//                         "symbol": "HT",
//                         "slug": "htx-token"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15",
//                 "platform": {
//                     "name": "Avalanche C-Chain",
//                     "coin": {
//                         "id": "5805",
//                         "name": "Avalanche",
//                         "symbol": "AVAX",
//                         "slug": "avalanche"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "0x2eaa73bd0db20c64f53febea7b5f5e5bccc7fb8b",
//                 "platform": {
//                     "name": "Viction",
//                     "coin": {
//                         "id": "2570",
//                         "name": "Viction",
//                         "symbol": "VIC",
//                         "slug": "viction"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "0x0200070000000000000000000000000000000000000000000000000000000000",
//                 "platform": {
//                     "name": "Sora",
//                     "coin": {
//                         "id": "5802",
//                         "name": "SORA",
//                         "symbol": "XOR",
//                         "slug": "sora"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "0x1D931Bf8656d795E50eF6D639562C5bD8Ac2B78f",
//                 "platform": {
//                     "name": "RSK RBTC",
//                     "coin": {
//                         "id": "3626",
//                         "name": "Rootstock Bitcoin",
//                         "symbol": "rBTC",
//                         "slug": "rsk-smart-bitcoin"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "0x85219708c49aa701871ad330a94ea0f41dff24ca",
//                 "platform": {
//                     "name": "Velas",
//                     "coin": {
//                         "id": "4747",
//                         "name": "Velas",
//                         "symbol": "VLX",
//                         "slug": "velas"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
//                 "platform": {
//                     "name": "Solana",
//                     "coin": {
//                         "id": "5426",
//                         "name": "Solana",
//                         "symbol": "SOL",
//                         "slug": "solana"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "0x34d21b1e550d73cee41151c77f3c73359527a396",
//                 "platform": {
//                     "name": "KAIA",
//                     "coin": {
//                         "id": "32880",
//                         "name": "Kaia",
//                         "symbol": "KAIA",
//                         "slug": "kaia"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "aurora",
//                 "platform": {
//                     "name": "Near",
//                     "coin": {
//                         "id": "6535",
//                         "name": "NEAR Protocol",
//                         "symbol": "NEAR",
//                         "slug": "near-protocol"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "KT19at7rQUvyjxnZ2fBv7D9zc8rkyG7gAoU8",
//                 "platform": {
//                     "name": "Tezos",
//                     "coin": {
//                         "id": "2011",
//                         "name": "Tezos",
//                         "symbol": "XTZ",
//                         "slug": "tezos"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "0x34a9c05b638020a07bb153bf624c8763bf8b4a86",
//                 "platform": {
//                     "name": "EthereumPoW",
//                     "coin": {
//                         "id": "21296",
//                         "name": "EthereumPoW",
//                         "symbol": "ETHW",
//                         "slug": "ethereum-pow"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
//                 "platform": {
//                     "name": "Ethereum",
//                     "coin": {
//                         "id": "1027",
//                         "name": "Ethereum",
//                         "symbol": "ETH",
//                         "slug": "ethereum"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
//                 "platform": {
//                     "name": "Starknet",
//                     "coin": {
//                         "id": "22691",
//                         "name": "Starknet",
//                         "symbol": "STRK",
//                         "slug": "starknet-token"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "ibc/EA1D43981D5C9A1C4AAEA9C23BB1D4FA126BA9BC7020A25E0AE4AA841EA25DC5",
//                 "platform": {
//                     "name": "Osmosis",
//                     "coin": {
//                         "id": "12220",
//                         "name": "Osmosis",
//                         "symbol": "OSMO",
//                         "slug": "osmosis"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "0x000000000000000000000000000000000000800A",
//                 "platform": {
//                     "name": "zkSync Era",
//                     "coin": {
//                         "id": "24091",
//                         "name": "ZKsync",
//                         "symbol": "ZK",
//                         "slug": "zksync"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
//                 "platform": {
//                     "name": "Arbitrum",
//                     "coin": {
//                         "id": "11841",
//                         "name": "Arbitrum",
//                         "symbol": "ARB",
//                         "slug": "arbitrum"
//                     }
//                 }
//             },
//             {
//                 "contract_address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
//                 "platform": {
//                     "name": "Base",
//                     "coin": {
//                         "id": "27716",
//                         "name": "Base",
//                         "symbol": "TBA",
//                         "slug": "base"
//                     }
//                 }
//             }
//         ],
//         "self_reported_circulating_supply": null,
//         "self_reported_tags": null,
//         "self_reported_market_cap": null,
//         "infinite_supply": true
//     }
// }
// ]