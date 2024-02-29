import React from 'react'
import article from "../components/layouts/aboutMe.json";

const Article = () => {

  const title = article[0].title;
  const imgPath = article[0].image;
  const imgLabel = article[0].imageLabel;
  const imgStats = article[0].imageStats;
  const statsEmpty = !imgStats || Object.keys(imgStats).length === 0;
  const textBody = article[1].articleBody;

  console.log(article)

  const renderStatItems = (items) => {
    if (Array.isArray(items)) {
      return items.map((item, index) => {
        const splitItem = item.split('\n').map((line, lineIndex) => (
          <React.Fragment key={lineIndex}>
            {line}
            <br />
          </React.Fragment>
        ));
        return <li key={index}>{splitItem}</li>;
      });
    }
    if (typeof items === 'string' && items.includes('\n')) {
      return items.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
    }
    return <li>{items}</li>;
  };

  return (
    <>
      <div className="container">
        <h2 className="pt-2">{title}</h2>
        <div className="row">
          <div className="col-7 d-flex flex-column align-items-center py-2">
            <hr width="90%"/>
            <p className="py-1 article-body">{renderStatItems(textBody)}</p>
          </div>
          <div className="col-5 d-flex flex-column align-items-center stats-box py-2">
            <h2 className="w-100">{imgLabel}</h2>
            <div className="img-container p-2">
              <img src={`./src/assets/${imgPath}`} alt={imgLabel} />
            </div>
            {!statsEmpty ? (
              Object.entries(imgStats).map(([key, value]) => (
                <div key={key} className="row stat-item w-100">
                  <div className="col-4">
                    <p class="text-end">
                      <strong>{key}</strong>
                    </p>
                  </div>
                  <div className="col-8">
                    <ul>{renderStatItems(value)}</ul>
                  </div>
                </div>
              ))
            ) : (
              <p>No stats available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
