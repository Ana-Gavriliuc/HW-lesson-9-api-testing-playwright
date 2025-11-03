import {expect} from '@playwright/test'

export class LoanDTO {
  income : number
  debt : number
  age : number
  employed : boolean
  loanAmount : number
  loanPeriod : number

  constructor(
    income : number,
    debt : number,
    age : number,
    employed : boolean,
    loanAmount : number,
    loanPeriod : number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static createLowRisk(): LoanDTO {
    return new LoanDTO(8500, 500, 25, true, 1500, 12)
  }

  static createMediumRisk(): LoanDTO {
    return new LoanDTO(3000, 500, 25, true, 1500, 12)
  }

  static createHighRisk(): LoanDTO {
    return new LoanDTO(1000, 1500, 25, false, 1500, 6)
  }

  static createVeryHighRisk(): LoanDTO {
    return new LoanDTO(100, 500, 25, true, 500, 12)
  }

  static createInvalidAge(): LoanDTO {
    return new LoanDTO(8500, 500, 13, false, 1500, 12)
  }

  static createInvalidIncome(): LoanDTO {
    return new LoanDTO(0, 500, 25, true, 1500, 12)
  }
}