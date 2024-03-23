import React from 'react'
import { Button, Card, CardBody, ProgressBar, Stack } from 'react-bootstrap'
import { currencyFormatter } from '../utilis'

const BudgetCard = ({name, amount, maxAmount, gray, onAddExpenseClick, onViewExpenseClick, hideButtons}) => {
    const className=[]
    if(amount > maxAmount){
        className.push("bg-danger", "bg-opacity-10")
    } else if(gray) {
        className.push("bg-light")
    }

  return (
    <div>
        <Card className={className.join(" ")} >
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}

                        {maxAmount && <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(maxAmount)}</span>}
                    </div>
                </Card.Title>
                {maxAmount && <ProgressBar 
                    className="rounded-pill" 
                    variant={getProgressBar(amount, maxAmount)}
                    min={0}
                    max={maxAmount}
                    now={amount}
                    />
                }
                {!hideButtons && (
                    <Stack direction="horizontal" gap="2" className="mt-4">
                    <Button variant='outline-primary' className="ms-auto" onClick={onAddExpenseClick}>Add Expense</Button>
                    <Button variant="outline-secondary" onClick={onViewExpenseClick}>View Expenses</Button>
                </Stack>
                )}
                
            </Card.Body>
        </Card>

    </div>
  )
}

function getProgressBar(amount, maxAmount){
    const ratio= amount/maxAmount
    if(ratio < 0.5)return "primary"
    if(ratio <0.75) return "warning"
    return "danger"
}

export default BudgetCard