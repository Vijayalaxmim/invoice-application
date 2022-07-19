import React,{ useState }  from "react";
import { v4 as uuid } from 'uuid';
const ModalForm = (props)=>{
    const [name, setName] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    const [status, setStatus]= useState("open")
    const [lineItems, setLineItems] = useState([{
        id: uuid(),
        description:"",
        quantity :0,
        price:0
    }])
    const handleSubmit=(event)=>{
        event.preventDefault()
        props.onSubmit({name:name, status:status, lineItems :lineItems, clientEmail:clientEmail})
    }
    const handleChange=(event)=>{
        event.preventDefault()
        let field = event.target.name;
        let value = event.target.value;
        if(field === "name"){
         setName(value);
        }else if(field === "clientEmail"){
         setClientEmail(value);
        }         

    }
    const handleAddItem=(event)=>{
        event.preventDefault()
        const lineItem = {
            id: uuid(),
            description:"",
            quantity :0,
            price:0
        }
        const newLineItems = lineItems.slice();
        newLineItems.push(lineItem)
        setLineItems(newLineItems)
       
    }
    const handleItemChange=(event)=>{
        event.preventDefault()
        const id = event.target.getAttribute("id")
        const updateListItems = lineItems.map(each => {
            if (each.id === id) {
              return {...each, [event.target.name]: event.target.value};
            }   
            return each;
          });
        setLineItems(updateListItems)
    }
    const handleDeleteItem=(event)=>{
        event.preventDefault()
        const id = event.target.getAttribute("id")
        const newListItem = lineItems.filter(each=>each.id!==id)
        setLineItems(newListItem)
    }
    return(
       
        <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={props.onClose}>
            &times;
          </span>
          <div>
            <form>
            <h3>Add new invoice</h3>
             <label>Client Name</label> 
             <input type="text" name={"name"} value={name} onChange={handleChange}/>
             <label>Client Email address</label> 
             <input type="text" name={"clientEmail"} value={clientEmail} onChange={handleChange}/>
             <h4>Line Items</h4>
             <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {lineItems && lineItems.map(each =>
                        <tr key={each.id}>
                            <td><input id={each.id} name="name" type="text" value={each.name} onChange={handleItemChange} /></td>
                            <td><input id={each.id} name="description" type="text" value={each.description} onChange={handleItemChange} /></td>
                            <td><input id={each.id} name="quantity" type="number" value={each.quantity} onChange={handleItemChange}/></td>
                            <td><input id={each.id} name="price" type="number" value={each.price} onChange={handleItemChange}/></td>
                            <td><button id={each.id} onClick={handleDeleteItem}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
             <button onClick={handleAddItem}>Add new line item</button>
             <button type="submit" onClick={handleSubmit}>Save</button>
            </form>
           
        </div>
        </div>
        </div>
        
    )
}
export default ModalForm