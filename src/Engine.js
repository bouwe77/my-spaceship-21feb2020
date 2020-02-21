import React from "react";

export default function Engine({ engineMode }) {
  return (
    <div className="engine">
      <div className="engineMonitor">
        <h1>Engine mode:</h1>
        &gt;&gt; {engineMode}
      </div>
    </div>
  );
}
