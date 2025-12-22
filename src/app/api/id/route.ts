import { NextRequest } from 'next/server'
import { makeNexonAPIRequest, validateRequiredParams } from '@/services/nexonAPI'

export const runtime = 'nodejs'

// GET /api/id - 角色 OCID 查詢
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const characterName = searchParams.get('character_name')

  const validationError = validateRequiredParams({ character_name: characterName })
  if (validationError) return validationError

  return makeNexonAPIRequest('/id', { character_name: characterName }, 86400) // Cache OCID for 24 hours
}