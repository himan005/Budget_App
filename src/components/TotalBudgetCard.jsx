import React from 'react'
import { useBudgets } from '../context/BudgetContext'
import BudgetCard from './BudgetCard'

const TotalBudgetCard = ({props}) => {
    const {budgets, expenses} = useBudgets()
    const amount = expenses.reduce((total, expense) => total+= expense.amount, 0)
    const maxAmount = budgets.reduce((total, budget) => total += budget.maxAmount, 0)
  return (
    <div>
        <BudgetCard amount={amount} maxAmount={maxAmount} name="Total" gray hideButtons />
    </div>
  )
}

export default TotalBudgetCard