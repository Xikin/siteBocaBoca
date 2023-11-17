import Place from '../../../models/Place.js'
const checkOwner = async (req) => {
  try {
    const place = await Place.findOne({
      _id: req.params.placeId,
      uid: req.user.id,
    });
    if (place) return true;
    return false;
  } catch (error) {
    console.log(error);
    return 'error';
  }
};

export default checkOwner;