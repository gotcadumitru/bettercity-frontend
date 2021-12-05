import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timisoaraRegionsPath, timisoaraRegionsText, timisoaraZones } from '../../../common/defaults/defaults.map';
import { fetchAllIssuesThunk } from '../../../common/state/thunk/issue.thunk';
const SvgMap = () => {
  const [hoveredRegion, setHoeredElement] = useState(null);

  const allIssues = useSelector((state) => state.issue.allIssues);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllIssuesThunk());
    // eslint-disable-next-line
  }, []);

  const colors = {
    0: '#01ff70',
    1: '#2ecc40',
    2: '#3d9970',
    3: '#ffdc00',
    4: '#ff851b',
    5: '#ff4136',
    6: '#f012be',
    7: '#85144b',
  };

  return (
    <div className="section">
      <div className="section__title">{timisoaraZones.find((zone) => zone.id === hoveredRegion)?.name}</div>
      <div className="section__title">
        Issues:
        {allIssues.filter((issue) => issue.address.includes(timisoaraZones.find((zone) => zone.id === hoveredRegion)?.name)).length}
      </div>
      <svg viewBox="-50 0 500 500" xmlns="http://www.w3.org/2000/svg" className="c-map">
        {timisoaraRegionsPath.map((region) => (
          <path
            onTouchStart={() => setHoeredElement(region.regionNo)}
            onMouseEnter={() => setHoeredElement(region.regionNo)}
            key={region.regionNo}
            d={region.coord}
            style={{
              fill: colors[
                allIssues.filter((issue) => issue.address.includes(timisoaraZones.find((zone) => zone.id === region.regionNo).name)).length
              ],
            }}
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
    </div>
  );
};
export default SvgMap;
