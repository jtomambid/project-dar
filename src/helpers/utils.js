const getOptionValue = field => {
	return field?.map(result => ({
		label: result.name,
		value: result.id,
	}));
};

export { getOptionValue };
