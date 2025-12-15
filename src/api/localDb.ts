import type { SearchResult } from "../types/types.ts";
import { httpWrapper } from "../utils/httpWrapper.ts";
const baseUrl = 'http://localhost:3000/'
const fetchHeaders = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'), accept: 'application/json',
  },
}

export async function fetchWatchList() {
  const res = await fetch(`${baseUrl}favorites/`, fetchHeaders)
  if (!res.ok) throw new Error(`Failed to fetch favorites: ${res.status}`)
  return res.json()
}
export async function fetchWatchListItem(id: number) {
  const res = await httpWrapper(`${baseUrl}favorites/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch favorites: ${res.status}`)
  return res.json()
}

export async function addWatchList(data: Partial<SearchResult>) {
  const res = await httpWrapper(`${baseUrl}favorites`, {
    method: 'POST',
    body: JSON.stringify(data || {}),
  })
  if (!res.ok) throw new Error(`Failed to fetch favorites: ${res.status}`)
  return await res.json()
}

export async function removeFromWatchList(data: Partial<SearchResult>) {
  const res = await fetch(`${baseUrl}favorites/${data.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'), accept: 'application/json',
    }

  })
  if (!res.ok) throw new Error(`Failed to fetch watchlist: ${res.status}`)
  return res.json()
}

export async function fakeLogin() {
  const res = await fetch(`${baseUrl}login`, {
    method: 'POST',
    body: JSON.stringify({username: 'guest'}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  if (!res.ok) throw new Error(`Failed to fetch favorites: ${res.status}`)
  return res.json()
}