import * as React from 'react';

export const Employee = (props: any) => {
    const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemeber", "October", "November", "December"];
    return (
        <div className="col-md-3 col-sm mb-2">
            <div className="card">
                <img src={`${props.absoluteUrl}/_layouts/15/userphoto.aspx?size=L&username=${props.Email}`}
                    className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-text">Happy Birthday, {props.name}</p>
                    <p className="card-text">{MONTH[props.month]} {props.date}</p>
                </div>
            </div>
        </div>
    )
}