import Place from "../models/Place.js";
import tryCatch from "./utils/tryCatch.js";

export const createPlace = tryCatch(async (req, res) => {
  //testing resource access
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;
  const newPlace = new Place({ ...req.body, uid, uName, uPhoto });
  await newPlace.save();
  res.status(201).json({ success: true, result: newPlace });
})

export const getPlace = tryCatch(async (req, res) => {
  const place = await Place.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: place });
})

export const deletePlace = tryCatch(async (req, res) => {
  const { _id } = await Place.findByIdAndDelete(req.params.placeId);
  res.status(200).json({ success: true, result: { _id } });
});