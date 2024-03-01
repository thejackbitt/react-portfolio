import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import document from "./layouts/resume.json";

const Document = () => {
  const title = document[0].title;
  const subhead = document[0].subhead;
  const references = document[0].references;
  const body = document[0].body;
  const dropdowns = document[0].dropdowns;

  console.log(dropdowns);

  const renderReferences = (items) => {
    return Object.entries(items).map(([key, value], index) => (
      <React.Fragment key={key}>
        <b>{key}: </b>
        {urlChecker(value) ? (
          <a href={value} target="_blank">
            {urlShortener(value)}
          </a>
        ) : (
          <span>{value}</span>
        )}
        {index !== Object.entries(items).length - 1 ? (
          <span> | </span>
        ) : (
          <span></span>
        )}
      </React.Fragment>
    ));
  };

  const renderDropdowns = (items) => {
    return Object.entries(items).map(([key, value], index) => (
      <React.Fragment key={index}>
        <br />
        <h4 className="dropDownHeader">
          <a
            className="noDecHover"
            data-bs-toggle="collapse"
            href={`#collapseE${index}`}
            role="button"
            aria-expanded="false"
            aria-controls={`collapseE${index}`}
          >
            {key}:<span> (click to expand)</span>
          </a>
        </h4>
        <div className="collapse" id={`collapseE${index}`}>
          <div className="card card-body">
            {typeof value === "string" ? (
              <p>{value}</p>
            ) : Array.isArray(value) ? (
              value.map((item, itemIndex) => (
                <div key={itemIndex}>
                  {Array.isArray(item.title) ? (
                    item.title
                      .map((title, titleIndex) => (
                        <div
                          key={titleIndex}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ flex: 1, textAlign: "left", margin: 0 }}>
                            {titleIndex % 2 === 0 && <b>{title}</b>}
                          </p>
                          {item.title[titleIndex + 1] && (
                            <p
                              style={{ flex: 1, textAlign: "right", margin: 0 }}
                            >
                              {titleIndex % 2 === 0 && (
                                <b>{item.title[titleIndex + 1]}</b>
                              )}
                            </p>
                          )}
                        </div>
                      ))
                      .filter((_, filterIndex) => filterIndex % 2 === 0)
                  ) : (
                    <p>
                      <b>{item.title}</b>
                    </p>
                  )}
                  {item.links &&
                    Object.entries(item.links).map(
                      ([linkKey, linkValue], linkIndex) => (
                        <span>
                          <a key={linkIndex} href={linkValue} target="_blank">
                            {linkKey}
                          </a>
                          {linkIndex !==
                          Object.entries(item.links).length - 1 ? (
                            <span> | </span>
                          ) : (
                            <span></span>
                          )}
                        </span>
                      )
                    )}
                  {item.text &&
                    item.text.split("\n").map((line, lineIndex, arr) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  {item.list && (
                    <div>
                      <br />
                      <ul>
                        {item.list.map((listItem, listIndex) => (
                          <li key={listIndex}>{listItem}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : null}
          </div>
        </div>
        <hr />
      </React.Fragment>
    ));
  };

  const urlChecker = (url) => {
    const firstPart = url.substring(0, 8);
    if (firstPart === "https://") {
      return true;
    } else {
      return false;
    }
  };

  const urlShortener = (url) => {
    return url.replace(/https:\/\/(www\.)?/, "").split("/")[0];
  };

  return (
    <>
      <div className="container">
        <h2 className="pt-2">{title}</h2>
        <div className="row d-flex flex-column align-items-center">
          <div className="col-8 text-center">
            <h2>{subhead}</h2>
            <br />
            <span>{renderReferences(references)}</span>
            <br />
            <br />
            <div className="text-start">
              <p>{body}</p>
              {renderDropdowns(dropdowns)}
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Document;
