export const loanSchema = {
  type: 'object',
  properties: {
    riskScore: { type: 'number' },
    riskLevel: { type: 'string' },
    riskDecision: { type: 'string' },
    riskPeriods: {
      type: 'array',
      items: { type: 'number' },
    },
    applicationId: { type: 'string' },
  },
  required: ['riskScore', 'riskLevel', 'riskDecision', 'riskPeriods', 'applicationId'],
}
