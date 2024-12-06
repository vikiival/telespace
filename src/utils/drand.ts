import { Hex } from "ox"

type EntropyResponse = {
  randomness: string
  round: number
}

export type EntropyState = EntropyResponse & {
  entropy: number
}

const BASE_URL = 'https://drand.cloudflare.com/52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971/public/latest'

export function entropyFromSeed(randomness: string): number {
  return Math.abs(Math.sin(Hex.toNumber(`0x${randomness}`)))
}

export async function getRand(): Promise<EntropyState> {
  return fetch(BASE_URL)
  .then(res => res.json() as Promise<EntropyResponse>)
  .then(
    v => ({ 
      ...v,
      entropy: entropyFromSeed(v.randomness)
    })
  )
}