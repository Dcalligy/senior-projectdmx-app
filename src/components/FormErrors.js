import React from "react";

function FormErrors(props){
    if(props.formErrors && (props.formErrors.blankField || props.formErrors.passwordMatch)){
        return(
            <div className="error container help is-danger">
                <div className="row justify-content-center">
                    {props.formErrors.passwordMatch
                    ? "Password value does not match confirm password value" : ""}
                </div>
                <div className="row justify-content-center help is-danger">
                    {props.formErrors.blankField ? "All fields are required" : ""}
                </div>
            </div>
        );
    } else if(props.apierrors){
        return(
            <div className="error container help is-danger">
                <div className="row justify-content-center">
                    {props.formErrors.cognito.message}
                </div>
            </div>
        );
    } else{
        return <div/>;
    }
}
export default FormErrors;