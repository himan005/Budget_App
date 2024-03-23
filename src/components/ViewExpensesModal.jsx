import React from 'react'
import { Button, Modal, Stack} from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../context/BudgetContext'
import { currencyFormatter } from '../utilis'

const ViewExpensesModal = ({budgetId, handleClose}) => {
    console.log("Budget Id", budgetId)
    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useBudgets()
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? {name:"UNCATEGORIZED", Id: UNCATEGORIZED_BUDGET_ID} : budgets.find(budget => budget.id === budgetId)
    const expenses = getBudgetExpenses(budgetId)
    return (
        <>
            <Modal show={budgetId != null} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses- {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button variant='outline-danger' 
                                onClick={()=>{ 
                                    deleteBudget(budget) 
                                    handleClose()
                                }}>Delete</Button>
                        )}
                    </Stack>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction="vertical" gap="3">
                        {expenses.map(expense =>(
                            <Stack direction="horizontal" gap="2" key={expense.id}>
                                <div className="me-auto fs-4"> {expense.description}</div>
                                <div className="fs-4"> {currencyFormatter.format(expense.amount)}</div>
                                <Button size='sm' variant="outline-danger" onClick={()=>deleteExpense(expense)}>&times;</Button>
                            </Stack>
                        ))
                        }
                    </Stack>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default ViewExpensesModal