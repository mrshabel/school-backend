exports.setStudentParents = async (req, res, next) => {
  req.body = {
    name: req.body.name,
    class: req.body.class,
    displayImage: req.file?.filename,
    dob: req.body.dob,
    gender: req.body.gender,
    parent: {
      name: req.body.parentName,
      address: req.body.address,
      email: req.body.parentEmail,
      phone: req.body.phone,
      occupation: req.body.parentOccupation,
      gender: req.body.parentGender,
    },
  };
  next();
};
