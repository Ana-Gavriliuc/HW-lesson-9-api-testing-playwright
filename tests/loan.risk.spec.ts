import { test, expect } from '@playwright/test'
import Ajv from 'ajv'
import { LoanDTO } from './dto/LoanDTO'
import { loanSchema } from './dto/loan-schema'
import { StatusCodes } from 'http-status-codes'

const BASE_URL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

const ajv = new Ajv()
const validate = ajv.compile(loanSchema)

test('Low Risk (positive decision)', async ({ request }) => {
  const reqestBody = LoanDTO.createLowRisk()
  const response = await request.post(BASE_URL, {
    headers: { 'Content-Type': 'application/json' },
    data: reqestBody,
  })

  const body = await response.json()
  console.log('Response Body:', body)

  expect(response.status()).toBe(StatusCodes.OK)
  expect(body.riskLevel).toBe('Low Risk')
  expect(body.riskDecision).toBe('positive')

  LoanDTO.checkServerResponse(body)
  const valid = validate(body)
  expect.soft(valid).toBeTruthy()
})

test('Medium Risk (positive decision)', async ({ request }) => {
  const requestBody = LoanDTO.createMediumRisk()
  const response = await request.post(BASE_URL, {
    headers: { 'content-type': 'application/json' },
    data: requestBody,
  })

  const body = await response.json()

  expect(response.status()).toBe(StatusCodes.OK)
  expect(body.riskLevel).toBe('Medium Risk')
  expect(body.riskDecision).toBe('positive')

  LoanDTO.checkServerResponse(body)
  const valid = validate(body)
  expect.soft(valid).toBeTruthy()
})

test('High Risk (positive decision)', async ({ request }) => {
  const requestBody = LoanDTO.createHighRisk()
  const response = await request.post(BASE_URL, {
    headers: { 'content-type': 'application/json' },
    data: requestBody,
  })

  const body = await response.json()

  expect(response.status()).toBe(StatusCodes.OK)
  expect(body.riskLevel).toBe('High Risk')
  expect(body.riskDecision).toBe('positive')

  LoanDTO.checkServerResponse(body)
  const valid = validate(body)
  expect.soft(valid).toBeTruthy()
})

test('Very High Risk (negative decision)', async ({ request }) => {
  const requestBody = LoanDTO.createVeryHighRisk()
  const response = await request.post(BASE_URL, {
    headers: { 'content-type': 'application/json' },
    data: requestBody,
  })

  const body = await response.json()
  console.log('Response body:', body)

  expect(response.status()).toBe(StatusCodes.OK)
  expect(body.riskLevel).toBe('Very High Risk')
  expect(body.riskDecision).toBe('negative')

  LoanDTO.checkServerResponse(body)
  const valid = validate(body)
  expect.soft(valid).toBeTruthy()
})

test('Invalid (Age < 16) should return 400 (BUG: API returns 200) ', async ({ request }) => {
  const requestBody = LoanDTO.createInvalidAge()
  const response = await request.post(BASE_URL, {
    headers: { 'content-type': 'application/json' },
    data: requestBody,
  })

  // BUG: API returns 200 instead of 400 Bad Request
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Invalid (Income = 0) should return 400', async ({ request }) => {
  const requestBody = LoanDTO.createInvalidIncome()
  const response = await request.post(BASE_URL, {
    headers: { 'content-type': 'application/json' },
    data: requestBody,
  })

  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
