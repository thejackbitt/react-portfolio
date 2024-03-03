const Project = (item) => {
    return(
    <>
    <div className="portfolio-item m-3">
        <a href={item.link}>
            <h4>{item.title}</h4>
        </a>
        <a href={item.repo}>
            <h5>{item.repoTitle}</h5>
        </a>
        <a href={item.link}>
        <img src={`./src/assets/${item.thumbnail}`}/>
        </a>
    </div>
    </>
    )
}

export default Project;