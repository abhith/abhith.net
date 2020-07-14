import ServicesRoll from "@components/services-roll";
import TitleBar from "@components/title-bar";
import React from "react";

const RelatedTools = ({ relatedServices }) => {
  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <section className="section">
      <div className="container is-fluid">
        <div className="columns">
          <div className="column is-full">
            <TitleBar title={`Related Tools & Services`} />
            <ServicesRoll services={relatedServices} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedTools;
