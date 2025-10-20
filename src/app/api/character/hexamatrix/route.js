import { NextResponse } from 'next/server'

const BASE_URL = 'https://open.api.nexon.com'
const API_VERSION = 'maplestorytw/v1'

const getAPIKey = () => {
  return process.env.MAPLE_API_KEY
}

async function makeMapleAPIRequest(endpoint, params = {}) {
  const apiKey = getAPIKey()
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API Key not configured' },
      { status: 500 }
    )
  }

  const url = new URL(`${BASE_URL}/${API_VERSION}${endpoint}`)
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, value)
    }
  })

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-nxopen-api-key': apiKey,
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { 
          error: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          code: errorData.error?.name 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: `Network error: ${error.message}` },
      { status: 500 }
    )
  }
}

// GET /api/character/hexamatrix?ocid=xxx&date=yyyy-MM-dd
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const ocid = searchParams.get('ocid')
  const date = searchParams.get('date')

  if (!ocid) {
    return NextResponse.json(
      { error: 'OCID is required' },
      { status: 400 }
    )
  }

  return makeMapleAPIRequest('/character/hexamatrix', { ocid, date })
}