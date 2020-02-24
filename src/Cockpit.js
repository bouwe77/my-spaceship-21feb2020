import React, { useState, useEffect } from "react";
import useServer from "./server/useServer";
import { getSpaceObjects } from "./server/api";

export default function Cockpit({ engineMode, setEngineMode }) {
  const [setCourse] = useServer("Minotuar");
  const [spaceObjects, setSpaceObjects] = useState([]);
  const [selectedSpaceObjectName, setSelectedSpaceObjectName] = useState();
  const [destinationX, setDestinationX] = useState();
  const [destinationY, setDestinationY] = useState();

  const IDLE = "idle";
  const THRUSTERS = "thrusters";
  const IMPULSE = "impulse";

  function go() {
    setCourse({ x: destinationX, y: destinationY }, 100);
  }

  useEffect(() => {
    async function fetch() {
      const result = await getSpaceObjects();
      setSpaceObjects(result);
    }
    fetch();
  }, []);

  function handleSpaceObjectChanged(event) {
    // Determine the value of the selected item, which is the space object name.
    const selectedSpaceObjectName = event.target.value;
    setSelectedSpaceObjectName(selectedSpaceObjectName);

    // If nothing was selected, quit further processing.
    if (!selectedSpaceObjectName) return;

    // A space object was selected, find it in the spaceObjects array.
    const selectedSpaceObject = spaceObjects.find(s => s.name === selectedSpaceObjectName);

    // Update the destination according to the selected space object's destination.
    setDestinationX(selectedSpaceObject.destinationX);
    setDestinationY(selectedSpaceObject.destinationY);
  }

  return (
    <div className="cockpit">
      <div className="engineModePanel">
        <div>Engine mode:</div>
        <div>
          <input
            type="radio"
            onChange={() => setEngineMode(IDLE)}
            value={IDLE}
            checked={engineMode === IDLE}
            id={IDLE}
          />
          <label htmlFor={IDLE}>{IDLE}</label>
        </div>
        <div>
          <input
            type="radio"
            onChange={() => setEngineMode(THRUSTERS)}
            value={THRUSTERS}
            checked={engineMode === THRUSTERS}
            id={THRUSTERS}
          />
          <label htmlFor={THRUSTERS}>Thrusters</label>
        </div>
        <div>
          <input
            type="radio"
            onChange={() => setEngineMode(IMPULSE)}
            value={IMPULSE}
            checked={engineMode === IMPULSE}
            id={IMPULSE}
          />
          <label htmlFor={IMPULSE}>Impulse</label>
        </div>
      </div>
      <div className="navigationPanel">
        <div>
          <select value={selectedSpaceObjectName} onChange={handleSpaceObjectChanged}>
            <option key="-" value="" />
            {spaceObjects.map(spaceObject => (
              <option key={spaceObject.name} value={spaceObject.name}>
                {spaceObject.name} ({spaceObject.type})
              </option>
            ))}
          </select>
        </div>
        <div>
          {destinationX},{destinationY}
        </div>
        <button onClick={go}>Go</button>
      </div>
      <div className="locationPanel" />
    </div>
  );
}
