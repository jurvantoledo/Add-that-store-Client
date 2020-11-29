import React from "react"
import { useHistory } from "react-router-dom";
import AddStoreForm from "../../components/AddStoreForm/index"

export default function AddStore() {
    const history = useHistory()

    return (
        <div>
         <AddStoreForm />
        </div>
    )
}