import {useRef} from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { useBudgets } from '../context/BudgetContext'

const AddBudgetModal = ({show, handleClose}) => {

    const nameRef = useRef()
    const maxAmountRef = useRef()
    const {addBudget} = useBudgets()

    function handleSubmit(e){
        e.preventDefault()
        addBudget(
            {
                name:nameRef.current.value,
                maxAmount:parseFloat(maxAmountRef.current.value)
            }
        )
        handleClose()
    }
  return (
    <div>
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='max'>
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control type="number" ref={maxAmountRef} required min={0} step={0.01} />
                    </Form.Group>
                    <div className="d-flex justify-content-end mt-2">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    </div>
  )
}

export default AddBudgetModal