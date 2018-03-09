// eslint-disable-next-line import/prefer-default-export
export const get = async (req, res, next) => {
  try {
    const referenceType = req.swagger.params.type.value;
    const referenceDataService = req.app.get('referenceDataService');
    const refTypeData = await referenceDataService.getReferenceData(
      referenceType,
    );
    res.status(200).json(refTypeData);
  } catch (err) {
    console.log(`This didn't help! ${err}`);
    res.status(500).send();
  }
};
