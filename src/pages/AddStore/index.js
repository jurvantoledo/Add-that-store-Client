import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AddStoreForm from "../../components/AddStoreForm/index"
import { selectStores } from "../../store/stores/selectors";
import { selectUser } from "../../store/user/selectors";

export default function AddStore() {
    const history = useHistory()

    return (
        <div>
         <p>Hello</p>
         <AddStoreForm />
        </div>
    )
}