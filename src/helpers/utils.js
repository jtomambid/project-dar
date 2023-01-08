const getOptionValue = field => {
	return field?.map(result => ({
		label: result.name,
		value: result.id,
	}));
};

const getKeyValue = ({ obj, key }) => {
	return obj[key];
};

export { getOptionValue, getKeyValue };
