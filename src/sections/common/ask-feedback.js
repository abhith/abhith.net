import React from "react";
import LiveEdit from "@components/live-edit";

const AskFeedback = () => {
  const askForCommentsCode = `
  function AskForFeedback() {
    const [isHelpful, setIsHelpful] = React.useState();
    let note;
    if (isHelpful === "yes") {
      note = (
        <div className="notification is-success is-light">
          <h5>
            👊 that ⭐️ button on the official{" "}
            <a
              href="https://github.com/Abhith/abhith.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repo
            </a>
          </h5>
          <p>
            It'd be awesome if you could leave a comment below! <br />
            &#123; thank you ♥ &#125; is enough
          </p>
        </div>
      );
    } else if (isHelpful === "no") {
      note = (
        <div className="notification is-warning is-light">
          <h4>Sorry about that!</h4>
          <p> TODO(abhith): let me know how can I improve it?</p>
        </div>
      );
    } else {
      note = (
        <>
          <p>👈 This is a live react editor. </p>
        </>
      );
    }
    return (
      <div className="content">
        <h3>Was this helpful?</h3>
        <div className="buttons is-centered">
          <button
            className="button is-success is-light"
            onClick={() => setIsHelpful("yes")}
          >
            👍 Yes
          </button>
          <button
            className="button is-warning is-light"
            onClick={() => setIsHelpful("no")}
          >
            👎 No
          </button>
        </div>
        {note}
      </div>
    );
  }
  `.trim();
  return <LiveEdit code={askForCommentsCode} noInline={false} />;
};
export default AskFeedback;
