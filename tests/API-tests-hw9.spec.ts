import { test, expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

const BASE_URL = 'https://backend.tallinn-learning.ee'

test('Login with correct username and password should return 200 and API key', async ({
  request,
}) => {
  const username = 'Annnn'
  const password = '123456A'
  const response = await request.get(
    `${BASE_URL}/test-orders?username=${username}&password=${password}`,
  )

  expect(response.status()).toBe(StatusCodes.OK)

  const body = await response.json()
  console.log('Response body:', body)
})

test('Get an order by correct ID (1-10) should return 200', async ({ request }) => {
  const orderId = 10
  const response = await request.get(`${BASE_URL}/test-orders/${orderId}`)

  expect(response.status()).toBe(StatusCodes.OK)

  const body = await response.json()
  console.log(body)
})

test('Get an order by incorrect ID less then 1 or highest then 10 should return 400', async ({
  request,
}) => {
  const response0 = await request.get(`${BASE_URL}/test-orders/0`)
  const response15 = await request.get(`${BASE_URL}/test-orders/15`)

  expect(response0.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(response15.status()).toBe(StatusCodes.BAD_REQUEST)

  const body0 = await response0.json()
  console.log('Response for ID 0:', body0)

  const body15 = await response15.json()
  console.log('Response for ID 15:', body15)
})

test('Get order info and current time with correct data should return 200', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/test-orders/time/7`, {
    headers: {
      'x-application-name': 'tld',
      'x-session-id': 'jwtEysp',
    },
  })

  expect(response.status()).toBe(StatusCodes.OK)

  const body = await response.json()
  console.log('Order info and time:', body)
})

test('Get order payment status with correct data should return 200', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/test-orders/payment/8`, {
    headers: {
      'x-application-name': 'tld',
      'x-session-id': 'jwtEysp',
    },
  })

  expect(response.status()).toBe(StatusCodes.OK)

  const body = await response.json()
  console.log('Order info and payment status', body)
})

test('Update an order by correct ID (1-10) and API key should return 200', async ({ request }) => {
  const response = await request.put(`${BASE_URL}/test-orders/8`, {
    headers: {
      api_key: '1234567890123456',
      'Content-Type': 'application/json',
    },
    data: {
      status: 'OPEN',
      courierId: 0,
      customerName: 'Tallinn',
      customerPhone: '12345',
      comment: 'string',
      id: 0,
    },
  })

  expect(response.status()).toBe(StatusCodes.OK)

  const body = await response.json()
  console.log('Updated order:', body)
})

test('Update an order with empty body should return 400', async ({ request }) => {
  const response = await request.put(`${BASE_URL}/test-orders/7`, {
    headers: {
      api_key: '1234567890123456',
      'Content-Type': 'application/json',
    },
  })

  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Delete an order by correct ID (1-10) should return 204', async ({ request }) => {
  const response = await request.delete(`${BASE_URL}/test-orders/8`, {
    headers: {
      api_key: '1234567890123456',
    },
  })

  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})
