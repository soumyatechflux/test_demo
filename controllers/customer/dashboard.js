const Disease = require("../../models/User/disease");

exports.getDisease = async (req, res) => {
  try {
    const { userId } = req.userData;
    // const userId = 3;
    const datas = await Disease.getAllDisease();
    const new_array = [];
    for (data of datas) {
      // Check If data already exist
      const is_selected = await Disease.getLinkData(userId, data.id);

      // ENd
      new_array.push({
        id: data.id,
        name: data.name,
        is_selected: is_selected,
      });
    }
    //   const properDataGet = await Disease.getLinkData(userId, data);
    res.status(200).json({ new_array });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateDiseaseSelection = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { diseaseId, isSelected } = req.body;
    // console.log(userId, " ", req.body);
    await Disease.updateLinkData(userId, diseaseId, isSelected);

    res.status(200).json({ message: "Selection status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// app.get('/countSelectedDiseases', async (req, res) => {
exports.countSelectedDiseases = async (req, res) => {
  const { diseaseId } = req.body;
  const diseasecount = await Disease.getdiseaseCount(diseaseId);
  const usercount = await Disease.getAlluserCount();
//   console.log(usercount);
//   console.log(diseasecount);
  if (!diseaseId) {
    return res
      .status(400)
      .json({ error: "disease_id query parameter is required" });
  }
  const diseasepersent = (diseasecount / usercount) * 100;
  if (!diseasecount) {
    return res.status(404).json({ error: "No data found" });
  }
  return res.status(200).json({ data: diseasepersent });
};
