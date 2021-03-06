import React from 'react';
import PropTypes from 'prop-types';
import { RESOLUTION_TYPES } from 'common/actionTypes/voting';


const SelectResolutionType = ({ resolutionType, handleResolutionTypeChange }) => (
  <select
    onChange={e => handleResolutionTypeChange(e.target.value)}
    value={resolutionType}
  >
    <option value={RESOLUTION_TYPES.regular.key}>
      {RESOLUTION_TYPES.regular.name} ({RESOLUTION_TYPES.regular.voteDemandText})
    </option>
    <option value={RESOLUTION_TYPES.qualified.key}>
      {RESOLUTION_TYPES.qualified.name} ({RESOLUTION_TYPES.qualified.voteDemandText})
    </option>
  </select>
);

SelectResolutionType.propTypes = {
  handleResolutionTypeChange: PropTypes.func.isRequired,
  resolutionType: PropTypes.string.isRequired,
};

export default SelectResolutionType;
