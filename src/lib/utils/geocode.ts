
export async function addrToCordinates(address: string) {
  const apiKey = ""
  const url = `https://geocode.maps.co/search?q=${address}&api_key=${apiKey}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("error fetching cordinates")
    }

    const cordinates = await response.json()

    return cordinates
  }
  catch (err) {
    console.error("error fetching:", err)
  }
}


