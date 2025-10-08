import updateUserExercise from "./updateUserExercise";


const updateManyExercises = async (data: any) => {
  for (let i=0; i <data.length;i++) {

    const newData = data[i].split(":")
    try {
      const res = await updateUserExercise(newData[0], parseInt(newData[1]));
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }
};

export default updateManyExercises;
