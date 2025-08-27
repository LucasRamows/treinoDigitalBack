import updateUserExercise from "./updateUserExercise";


const updateManyExercises = async (data: any) => {
  for (let i=0; i <data.length;i++) {

    const newData = data[i].split(":")
    console.log("nos dados",newData[0],newData[1])
    try {
      const res = await updateUserExercise(newData[0], parseInt(newData[1]));
      console.log("Atualizado:", res);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }
};

export default updateManyExercises;
