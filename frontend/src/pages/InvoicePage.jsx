import React,{ useState, useEffect }  from "react";
import Store from "../Store.js"
import MaterialTable from '@material-table/core'
import {Send, Add} from "@material-ui/icons"
import ModalForm from "./ModalForm"
const InvoicePage = () =>{
    const [invoices, setInvoices]= useState([]);
    const [loading, setLoading]= useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false)

    //Material table data
    const headers = [
        {title: 'Client Name', field: 'name', type: 'string', editable:'never'},
        {title: 'Created Date', field: 'createdAt',editable:'never'},
        {title: 'Status', field: 'status', lookup: { "open": 'Open', "paid": 'Paid',"closed":"Closed" }},
    ];
    const options = {pageSize: 10, headerStyle: {fontWeight: "bold"}, actionsColumnIndex: -1,};

    useEffect(()=>{
        Store.getInvoiceList().then(result=>{
            setInvoices(result.data)
            setLoading(false)
        }).catch(err=>{
            setError("Error while loading invoice data")
        })
        
    },[])


    const handleCreateInvoice = ()=>{
        window.alert("new invoice page");
        setShowModal(true)
    }
    const handleFormSubmit=(data)=>{
        console.log(data)
        if(data){
            Store.addInvoice(data).then(savedData=>{
                const newInvoiceList = invoices.slice();
                newInvoiceList.push(savedData)
                setInvoices(newInvoiceList)
                window.alert("Data saved");
                setShowModal(false);

            })
        }
        
    }
    const handleSendInvoice = async(event, rowData) => {
       window.alert(rowData._key);
        await Store.generatePdf(rowData)
    };
     const handleUpdateStatus= async(rowData)=>{
        console.log(rowData)
         await Store.updateStatus(rowData.id, rowData.status)
    }
    const handleClose = ()=>{
        setShowModal(false)
    }
    if(loading){
        return(
            <div>
                <h1>Loading Invoice List</h1>
            </div>
        )
    }
    return(
        <div>
            <div>
            <MaterialTable options={options}
                       title="Invoice Overview"
                       columns={headers}
                       data={invoices}
                       cellEditable={{
                        onCellEditApproved: async(newValue, oldValue, rowData, columnDef) => {
                            rowData['status']=newValue
                            await handleUpdateStatus(rowData)
                        }
                      }}
                       actions={[
                        {
                          icon: Send,
                          tooltip: 'Send Invoice',
                          onClick: handleSendInvoice
                        },
                        {
                            icon: Add,
                            tooltip: "Add Invoice",
                            isFreeAction: true,
                            onClick: handleCreateInvoice,
                          },]}
        />
        </div>
        {showModal?<ModalForm onClose={handleClose} onSubmit= {handleFormSubmit}/>:null}
        
        </div>
        
    )
}
export default InvoicePage