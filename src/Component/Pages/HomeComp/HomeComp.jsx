import React, {useContext} from "react";
import { Redirect } from "react-router";
import { Jumbotron, Button } from "reactstrap";
import { AuthContext } from "../../../App";

export default function HomeComp() {

  const { state } = useContext(AuthContext);
  
  if(!state.isAuthenticated){
    return <Redirect to="/masuk"/>
  }
  if(state.role == 1){
    return <Redirect to="/admin"/>
  }if(state.role == 2){
    return <Redirect to="/kaprim"/>
  }if(state.role == 3){
    return <Redirect to="/kasatker"/>
  }if(state.role == 4){
    return <Redirect to="/member"/>
  }
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Hello, {state.user}!</h1>
        <p className="lead">
          This is a simple hero unit, a simple Jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-2" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>
    </div>
  );
}