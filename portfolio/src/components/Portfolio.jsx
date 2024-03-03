import React from 'react';
import portfolio from "../components/layouts/portfolio.json";
import Project from '../components/Project'

const Portfolio = () => {
    const title = portfolio[0].title;
    const items = portfolio[0].items;

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
