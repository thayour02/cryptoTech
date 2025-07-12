




export async function GET(request:Request){

    // const response = await fetch (
    //     `https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2025-07-11&interval=1d`,
    // )

    // const res = await response.json()
     return Response.json(data);
}


const data = {
"timestamp":	"2025-07-11T00:00:00Z",
"price"	:"116970.8",
"volume_24h":	"50859709613:",
"market_cap":	"2326631922202"
}