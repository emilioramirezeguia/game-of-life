import React from "react";

/* styles */
import "../styles/rules.scss";

function Rules() {
  return (
    <div className="main">
      <h2>Rules</h2>
      <p>Choose how to start the simulation.</p>
      <ol>
        <li>
          Press <span>Random</span> if you're feeling spontaneous.
        </li>
        <li>Click on individual boxes for a custom set up.</li>
        <li>Click on any of the popular figures below.</li>
      </ol>
      <p>
        Afterwards, press <span>Start</span> to start the simulation or{" "}
        <span>Stop</span> to stop it.
      </p>
      <p>
        If you need to get a fresh new canvas, press <span>Clear</span>
      </p>
    </div>
  );
}

export default Rules;
