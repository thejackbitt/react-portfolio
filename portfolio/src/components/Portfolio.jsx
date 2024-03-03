import React, { useState, useEffect } from 'react';
import Project from '../components/Project'

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {
        fetch('./layouts/portfolio.json')
            .then(response => response.json())
            .then(data => setPortfolio(data))
            .catch(err => console.error("Ruh roh, Raggy:", error))
    }, []);

    let title = ''
    let items = []

    if (portfolio && portfolio.length > 0) {
        title = portfolio[0].title
        items = portfolio[0].items
    }

    return (
        <>
            <div className="container">
                <h2>{title}</h2>
                <div className="row justify-content-center">
                    <div className="col-8 d-flex justify-content-center flex-wrap">
                        {items.map((item, index) => (
                            <Project
                                key={index}
                                title={item.title}
                                link={item.link}
                                repoTitle={item.repoTitle}
                                repo={item.repo}
                                thumbnail={item.thumbnail}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Portfolio;
