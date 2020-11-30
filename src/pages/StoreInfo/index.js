import React, { useEffect } from "react"
import { Button, Container, Jumbotron } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../../store/user/selectors";
import { fetchUserById } from "../../store/userInfo/actions";
import { selectUserInfo } from "../../store/userInfo/selectors";


export default function StoreInfo() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const userInfo = useSelector(selectUserInfo)

    console.log("is this it", userInfo)

    useEffect(() => {
        dispatch(fetchUserById(id));
      }, [dispatch, id]);

    return (
    <>    
        {userInfo.map(user => {
            return (
            <Container key={user.id}>
             <Jumbotron>
              <div className="info-title">     
                 <h1>Hello {user.name}</h1>
             </div>
             </Jumbotron>
             <Jumbotron> 
                <div className="info-store-title">
                 <h1>{user.store.name}</h1>
                </div>
                <div className="info-image">
                 <img src={user.store.image} alt="info-image"/>
                </div>
                <div className="info-address">
                 <p><strong>country:</strong>
                 {user.store.country} <br />
                 <strong>city:</strong>
                 {user.store.city} <br />
                 <strong>address:</strong>
                 {user.store.address}<br />
                 <strong>zip code:</strong>
                 {user.store.postCode}</p>
                </div>
                <div className="info-description">
                 <p><strong>description:</strong><br />
                 {user.store.description} </p>
                </div>
             </Jumbotron>
            </Container>  
                )   
            })}        
    </>        
    )
}