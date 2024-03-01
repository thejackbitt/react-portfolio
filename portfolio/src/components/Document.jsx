import React from 'react'
import document from "./layouts/resume.json";

const Document = () => {
    const title = document[0].title;
    const subhead = document[0].subhead;
    const references = document[0].references;

    console.log(Object.keys(references)[0])

    const renderReferences = (items) => {
        
    }

    return (
        <>
            <div className="container">
                <h2 className="pt-2">{title}</h2>
                <div className="row d-flex flex-column align-items-center">
                    <div className="col-8 text-center">
                        <h2>{subhead}</h2>
                        <p></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Document