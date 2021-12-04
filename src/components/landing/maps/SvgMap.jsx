import React, { useState } from 'react';
import { timisoaraRegionsPath, timisoaraRegionsText } from '../../../common/defaults/defaults.map';
const SvgMap = () => {
  const [hoveredRegion, setHoeredElement] = useState(null);
  return (
    <svg viewBox="-50 0 500 500" xmlns="http://www.w3.org/2000/svg" className="c-map">
      {timisoaraRegionsPath.map((region) => (
        <path
          onTouchStart={() => setHoeredElement(region.regionNo)}
          onMouseEnter={() => setHoeredElement(region.regionNo)}
          key={region.regionNo}
          d={region.coord}
          className={`c-map__region ${hoveredRegion === region.regionNo ? 'c-map__region--active' : ''}`}
        />
      ))}
      {timisoaraRegionsText.map((region) => (
        <text
          onTouchStart={() => setHoeredElement(region.regionNo)}
          onMouseEnter={() => setHoeredElement(region.regionNo)}
          key={region.regionNo}
          x={region.coord.x}
          y={region.coord.y}
          className="c-map__region-no"
        >
          {region.regionNo}
        </text>
      ))}
    </svg>
  );
};
export default SvgMap;
