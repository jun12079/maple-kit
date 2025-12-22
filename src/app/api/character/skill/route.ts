import { NextRequest } from 'next/server'
import { makeNexonAPIRequest, validateRequiredParams } from '@/services/nexonAPI'

export const runtime = 'nodejs'

// GET /api/character/skill?ocid=xxx&date=yyyy-MM-dd&character_skill_grade=6
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ocid = searchParams.get('ocid')
  const date = searchParams.get('date')
  const characterSkillGrade = searchParams.get('character_skill_grade') || '6'

  const validationError = validateRequiredParams({ ocid })
  if (validationError) return validationError

  return makeNexonAPIRequest('/character/skill', { 
    ocid, 
    date, 
    character_skill_grade: characterSkillGrade 
  })
}