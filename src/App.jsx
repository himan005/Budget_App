import { useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import Container  from 'react-bootstrap/Container'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal'
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from './context/BudgetContext'
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const {budgets, getBudgetExpenses} = useBudgets()

  function openAddExpenseModal(budgetId){
     setShowAddExpenseModal(true)
     setAddExpenseModalBudgetId(budgetId)
  }

  
  return (
    <>
      <Container className="my-4">
        <Stack direction='horizontal' gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary"  onClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}>Add Expense</Button>
        </Stack>
        <div style={{
          display:'grid', 
          gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',
          gap:"1rem",
          alignItems:'flex-start'}}>
          {budgets.map(budget =>{
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) =>total + expense.amount, 0)
            return (
            <BudgetCard 
              key={budget.id} 
              name={budget?.name} 
              gray 
              amount={amount} 
              maxAmount={budget?.maxAmount}
              onAddExpenseClick={() => openAddExpenseModal(budget.id) }
              onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id) }              
            />
          )})}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpenseClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID) } />
          <TotalBudgetCard />

        </div>
      </Container>
      <AddBudgetModal 
        show={showAddBudgetModal} 
        handleClose={()=> setShowAddBudgetModal(false)} 
      />
      <AddExpenseModal 
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId} 
        handleClose={()=> setShowAddExpenseModal(false)} />
      <ViewExpensesModal 
        budgetId={viewExpensesModalBudgetId} 
        handleClose={() => setViewExpensesModalBudgetId()}/>
    </>
  )
}

export default App
