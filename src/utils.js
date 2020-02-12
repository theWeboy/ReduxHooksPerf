export const customFilterFunction = (arr, filterObj) => {
  const key = Object.keys(filterObj)[0];
  const value = filterObj[key];
  if (key === 'id') {
    if (value === 'ODD') {
      return arr.filter(el => el[key] % 2 === 1);
    }
    return arr.filter(el => el[key] % 2 === 0);
  }
  return arr.filter(el => el[key] === value);
};

export const getFilteredIds = (data, filterCriteria) => {
  let intersection = data;
  for (let i = 0; i < filterCriteria.length; i++) {
    const filteredArr = customFilterFunction(data, filterCriteria[i]);
    intersection = intersection.filter(x => filteredArr.includes(x));
  }
  const filteredIds = intersection.map(user => user.id);
  return filteredIds;
};

export const modifyFilterCriteria = filterCriteria => {
  const modFilterCriteria = filterCriteria.map(filter => {
    const obj = {};
    switch (filter) {
      case 'Female':
      case 'Male': {
        obj['gender'] = filter;
        return obj;
      }
      case 'Even Ids': {
        obj['id'] = 'EVEN';
        return obj;
      }
      case 'Odd Ids': {
        obj['id'] = 'ODD';
        return obj;
      }
      default:
        return obj;
    }
  });
  return modFilterCriteria;
};
