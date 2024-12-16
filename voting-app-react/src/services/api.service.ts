// api.service.ts

/*
This file is where API fetching is done. We have a function for each API endpoint we need to fetch data from.
The endpoints are:
- localhost:5000/register with a POST request
- localhost:5000/login with a POST request
- localhost:5000/delete-user with a POST request
- localhost:5000/submit-vote with a POST request
- localhost:5000/get-scores with a GET request
*/

const API_URL = 'http://localhost:5000'
 
export async function registerUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  return response.json()
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  return response.json()
}

export async function deleteUser(email: string) {
  const response = await fetch(`${API_URL}/delete-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
  return response.json()
}

export async function submitVote(email: string, siteId: number, criteriaId: number, score: number) {
  const response = await fetch(`${API_URL}/submit-vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, siteId, criteriaId, score })
  })
  return response.json()
}

export async function getScores() {
  const response = await fetch(`${API_URL}/get-scores`)
  return response.json()
}