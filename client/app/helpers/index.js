const colors = ['#66994D', '#4D8000', '#999933'];

export const getColors = (s) => {
  const index = Math.floor(Math.random() * colors.length);

  return colors[index];
};

const dateOpt = {
  timeZone: 'UTC',
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export const dateFormat = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', dateOpt);
};

export const selectOptionsFormat = (data, empty = false, from) => {
  let newSelectOptions = [];

  if (data && data.length > 0) {
    data.map((option) => {
      let newOption = {};
      newOption.value = option._id;
      newOption.label = option.name;
      newSelectOptions.push(newOption);
    });
  }
  if (empty) {
    const emptyOption = {
      value: 0,
      label: 'Select option',
    };
    newSelectOptions.unshift(emptyOption);
  }

  return newSelectOptions;
};

export const selectOptionsUnFormat = (data) => {
  if (!data) return null;

  let newSelectOptions = [];

  if (data && data.length > 0) {
    data.map((option) => {
      let newOption = {};
      newOption._id = option.value;
      newSelectOptions.push(newOption._id);
    });
  }

  return newSelectOptions;
};
