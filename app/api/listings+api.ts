



const API_KEY = process.env.CRYPTO_API_KEY

export async function GET(request:Request){
  const url = new URL(request.url)

const limit = url.searchParams.get('limit') || '6'

    const response = await fetch (
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${limit}&convert=EUR`,
        {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY!,
            }
        }
    )
    const res = await response.json()
     return Response.json(res.data);
}


// export const data = [
//         {
//             "id": 1,
//             "name": "Bitcoin",
//             "symbol": "BTC",
//             "slug": "bitcoin",
//             "num_market_pairs": 12238,
//             "date_added": "2010-07-13T00:00:00.000Z",
//             "tags": [
//                 "mineable",
//                 "pow",
//                 "sha-256",
//                 "store-of-value",
//                 "state-channel",
//                 "coinbase-ventures-portfolio",
//                 "three-arrows-capital-portfolio",
//                 "polychain-capital-portfolio",
//                 "binance-labs-portfolio",
//                 "blockchain-capital-portfolio",
//                 "boostvc-portfolio",
//                 "cms-holdings-portfolio",
//                 "dcg-portfolio",
//                 "dragonfly-capital-portfolio",
//                 "electric-capital-portfolio",
//                 "fabric-ventures-portfolio",
//                 "framework-ventures-portfolio",
//                 "galaxy-digital-portfolio",
//                 "huobi-capital-portfolio",
//                 "alameda-research-portfolio",
//                 "a16z-portfolio",
//                 "1confirmation-portfolio",
//                 "winklevoss-capital-portfolio",
//                 "usv-portfolio",
//                 "placeholder-ventures-portfolio",
//                 "pantera-capital-portfolio",
//                 "multicoin-capital-portfolio",
//                 "paradigm-portfolio",
//                 "bitcoin-ecosystem",
//                 "layer-1",
//                 "ftx-bankruptcy-estate",
//                 "2017-2018-alt-season",
//                 "us-strategic-crypto-reserve",
//                 "binance-ecosystem",
//                 "binance-listing"
//             ],
//             "max_supply": 21000000,
//             "circulating_supply": 19887415,
//             "total_supply": 19887415,
//             "infinite_supply": false,
//             "platform": null,
//             "cmc_rank": 1,
//             "self_reported_circulating_supply": null,
//             "self_reported_market_cap": null,
//             "tvl_ratio": null,
//             "last_updated": "2025-07-04T14:28:00.000Z",
//             "quote": {
//                 "EUR": {
//                     "price": 91724.97333214956,
//                     "volume_24h": 34428808254.86459,
//                     "volume_change_24h": -32.0719,
//                     "percent_change_1h": -0.49341412,
//                     "percent_change_24h": -1.78661003,
//                     "percent_change_7d": 1.48755048,
//                     "percent_change_30d": 3.26113927,
//                     "percent_change_60d": 15.14317126,
//                     "percent_change_90d": 30.47022119,
//                     "market_cap": 1824172610520.391,
//                     "market_cap_dominance": 64.7359,
//                     "fully_diluted_market_cap": 1926224439975.1367,
//                     "tvl": null,
//                     "last_updated": "2025-07-04T14:28:04.000Z"
//                 }
//             }
//         },
//         {
//             "id": 1027,
//             "name": "Ethereum",
//             "symbol": "ETH",
//             "slug": "ethereum",
//             "num_market_pairs": 10367,
//             "date_added": "2015-08-07T00:00:00.000Z",
//             "tags": [
//                 "pos",
//                 "smart-contracts",
//                 "ethereum-ecosystem",
//                 "coinbase-ventures-portfolio",
//                 "three-arrows-capital-portfolio",
//                 "polychain-capital-portfolio",
//                 "binance-labs-portfolio",
//                 "blockchain-capital-portfolio",
//                 "boostvc-portfolio",
//                 "cms-holdings-portfolio",
//                 "dcg-portfolio",
//                 "dragonfly-capital-portfolio",
//                 "electric-capital-portfolio",
//                 "fabric-ventures-portfolio",
//                 "framework-ventures-portfolio",
//                 "hashkey-capital-portfolio",
//                 "kenetic-capital-portfolio",
//                 "huobi-capital-portfolio",
//                 "alameda-research-portfolio",
//                 "a16z-portfolio",
//                 "1confirmation-portfolio",
//                 "winklevoss-capital-portfolio",
//                 "usv-portfolio",
//                 "placeholder-ventures-portfolio",
//                 "pantera-capital-portfolio",
//                 "multicoin-capital-portfolio",
//                 "paradigm-portfolio",
//                 "ethereum-pow-ecosystem",
//                 "layer-1",
//                 "ftx-bankruptcy-estate",
//                 "sora-ecosystem",
//                 "rsk-rbtc-ecosystem",
//                 "world-liberty-financial-portfolio",
//                 "us-strategic-crypto-reserve",
//                 "binance-ecosystem",
//                 "binance-listing"
//             ],
//             "max_supply": null,
//             "circulating_supply": 120717083.37092331,
//             "total_supply": 120717083.37092331,
//             "infinite_supply": true,
//             "platform": null,
//             "cmc_rank": 2,
//             "self_reported_circulating_supply": null,
//             "self_reported_market_cap": null,
//             "tvl_ratio": null,
//             "last_updated": "2025-07-04T14:28:00.000Z",
//             "quote": {
//                 "EUR": {
//                     "price": 2135.519917413681,
//                     "volume_24h": 12237796662.170244,
//                     "volume_change_24h": -48.7542,
//                     "percent_change_1h": -0.79123788,
//                     "percent_change_24h": -3.57192871,
//                     "percent_change_7d": 4.00762931,
//                     "percent_change_30d": -3.70688727,
//                     "percent_change_60d": 39.62995735,
//                     "percent_change_90d": 40.68473261,
//                     "market_cap": 257793735910.69458,
//                     "market_cap_dominance": 9.1485,
//                     "fully_diluted_market_cap": 257793735910.69687,
//                     "tvl": null,
//                     "last_updated": "2025-07-04T14:28:04.000Z"
//                 }
//             }
//         },
//         {
//             "id": 825,
//             "name": "Tether USDt",
//             "symbol": "USDT",
//             "slug": "tether",
//             "num_market_pairs": 135234,
//             "date_added": "2015-02-25T00:00:00.000Z",
//             "tags": [
//                 "stablecoin",
//                 "asset-backed-stablecoin",
//                 "usd-stablecoin",
//                 "ethereum-pow-ecosystem",
//                 "fiat-stablecoin",
//                 "tron20-ecosystem",
//                 "rsk-rbtc-ecosystem",
//                 "world-liberty-financial-portfolio",
//                 "binance-ecosystem",
//                 "binance-listing"
//             ],
//             "max_supply": null,
//             "circulating_supply": 158423499846.91876,
//             "total_supply": 160822422870.759,
//             "platform": {
//                 "id": 1027,
//                 "name": "Ethereum",
//                 "symbol": "ETH",
//                 "slug": "ethereum",
//                 "token_address": "0xdac17f958d2ee523a2206206994597c13d831ec7"
//             },
//             "infinite_supply": true,
//             "cmc_rank": 3,
//             "self_reported_circulating_supply": null,
//             "self_reported_market_cap": null,
//             "tvl_ratio": null,
//             "last_updated": "2025-07-04T14:27:00.000Z",
//             "quote": {
//                 "EUR": {
//                     "price": 0.8488092337030956,
//                     "volume_24h": 49348370241.56785,
//                     "volume_change_24h": -40.0612,
//                     "percent_change_1h": 0.00352376,
//                     "percent_change_24h": -0.01143994,
//                     "percent_change_7d": -0.00575673,
//                     "percent_change_30d": 0.00495311,
//                     "percent_change_60d": 0.04261786,
//                     "percent_change_90d": 0.06521375,
//                     "market_cap": 134471329505.62561,
//                     "market_cap_dominance": 4.7721,
//                     "fully_diluted_market_cap": 136507557519.20183,
//                     "tvl": null,
//                     "last_updated": "2025-07-04T14:28:04.000Z"
//                 }
//             }
//         },
//         {
//             "id": 52,
//             "name": "XRP",
//             "symbol": "XRP",
//             "slug": "xrp",
//             "num_market_pairs": 1639,
//             "date_added": "2013-08-04T00:00:00.000Z",
//             "tags": [
//                 "medium-of-exchange",
//                 "enterprise-solutions",
//                 "xrp-ecosystem",
//                 "arrington-xrp-capital-portfolio",
//                 "galaxy-digital-portfolio",
//                 "a16z-portfolio",
//                 "pantera-capital-portfolio",
//                 "ftx-bankruptcy-estate",
//                 "2017-2018-alt-season",
//                 "klaytn-ecosystem",
//                 "made-in-america",
//                 "us-strategic-crypto-reserve",
//                 "binance-ecosystem",
//                 "binance-listing"
//             ],
//             "max_supply": 100000000000,
//             "circulating_supply": 59068187926,
//             "total_supply": 99985968138,
//             "infinite_supply": false,
//             "platform": null,
//             "cmc_rank": 4,
//             "self_reported_circulating_supply": null,
//             "self_reported_market_cap": null,
//             "tvl_ratio": null,
//             "last_updated": "2025-07-04T14:28:00.000Z",
//             "quote": {
//                 "EUR": {
//                     "price": 1.8851752569377012,
//                     "volume_24h": 2057060055.86139,
//                     "volume_change_24h": -51.435,
//                     "percent_change_1h": -0.72070241,
//                     "percent_change_24h": -2.98681946,
//                     "percent_change_7d": 6.70360046,
//                     "percent_change_30d": -0.50410378,
//                     "percent_change_60d": 4.13450999,
//                     "percent_change_90d": 3.8145995,
//                     "market_cap": 111353886350.24146,
//                     "market_cap_dominance": 3.9517,
//                     "fully_diluted_market_cap": 188517525693.77133,
//                     "tvl": null,
//                     "last_updated": "2025-07-04T14:28:04.000Z"
//                 }
//             }
//         },
//         {
//             "id": 1839,
//             "name": "BNB",
//             "symbol": "BNB",
//             "slug": "bnb",
//             "num_market_pairs": 2600,
//             "date_added": "2017-07-25T00:00:00.000Z",
//             "tags": [
//                 "marketplace",
//                 "centralized-exchange",
//                 "payments",
//                 "smart-contracts",
//                 "alameda-research-portfolio",
//                 "multicoin-capital-portfolio",
//                 "bnb-chain-ecosystem",
//                 "layer-1",
//                 "alleged-sec-securities",
//                 "celsius-bankruptcy-estate",
//                 "binance-ecosystem",
//                 "binance-listing"
//             ],
//             "max_supply": null,
//             "circulating_supply": 140885256.67000002,
//             "total_supply": 140885256.67000002,
//             "infinite_supply": false,
//             "platform": null,
//             "cmc_rank": 5,
//             "self_reported_circulating_supply": null,
//             "self_reported_market_cap": null,
//             "tvl_ratio": null,
//             "last_updated": "2025-07-04T14:28:00.000Z",
//             "quote": {
//                 "EUR": {
//                     "price": 556.1171002889766,
//                     "volume_24h": 1190394910.3793411,
//                     "volume_change_24h": -13.5658,
//                     "percent_change_1h": -0.44522331,
//                     "percent_change_24h": -1.18112836,
//                     "percent_change_7d": 1.55155763,
//                     "percent_change_30d": -1.8105282,
//                     "percent_change_60d": 10.0690464,
//                     "percent_change_90d": 10.31980385,
//                     "market_cap": 78348700412.7886,
//                     "market_cap_dominance": 2.7804,
//                     "fully_diluted_market_cap": 78348700412.78967,
//                     "tvl": null,
//                     "last_updated": "2025-07-04T14:28:04.000Z"
//                 }
//             }
//         }
//     ]