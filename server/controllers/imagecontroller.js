//appel du model
const Images = require('../models/Images.js')

//afficher tous les Digit
const getImages = (req, res) => {
    Images.find()
        .then(Image => res.status(200).json(Image))
        .catch(err => res.status(404).json({ notFound: 'Image non trouvé' }))
};

//afficher une Image par id
const getImageId = (req, res) => {
    const id = req.params.id;
    Images.findOne({ id: id })
        .then(Image => res.status(200).json(Image))
        .catch(err => res.status(404).json({ notFound: 'Image non trouvé' }))
};

//ajouter Image
const addImage = (req, res) => {
    Images.create(req.body)
        .then(Image => res.status(200).json({ result: 'Image ajouté' }))
        .catch(err => res.status(404).json({ error: 'Image non ajouté' }))
};

// Supprimer une Image avec id
const deleteImage = (req, res) => {
    const id = req.params.id;
    Images.findOneAndDelete({ id: id })
        .then(Image => res.status(200).json({ result: 'Image supprimé' }))
        .catch(err => res.status(404).json({ error: 'Image non supprimé' }));
};


module.exports = { getImages, addImage, getImageId, deleteImage }