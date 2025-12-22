import { NextRequest } from 'next/server'
import { makeNexonAPIRequest, validateRequiredParams } from '@/services/nexonAPI'

export const runtime = 'nodejs'

// GET /api/character/android-equipment?ocid=xxx&date=yyyy-MM-dd
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ocid = searchParams.get('ocid')
  const date = searchParams.get('date')

  const validationError = validateRequiredParams({ ocid })
  if (validationError) return validationError

  return makeNexonAPIRequest('/character/android-equipment', { ocid, date })
}