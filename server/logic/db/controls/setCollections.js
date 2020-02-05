async function setCollections(models) {
  if (!models)
    return null;

  try {
    for (let model in models) {
      await models[model].createCollection();
    }
  } catch (error) {
    throw error;
  }
}

module.exports = setCollections;
