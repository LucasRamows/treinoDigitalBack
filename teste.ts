import { create } from "domain"
import createExercise from "./src/modules/post/createExercise"

const data = [
  {
    "name": "Supino Reto",
    "description": "Exercício para peitoral maior, realizado deitado com barra ou halteres."
  },
  {
    "name": "Supino Inclinado",
    "description": "Trabalha a parte superior do peitoral com barra ou halteres."
  },
  {
    "name": "Supino Declinado",
    "description": "Foca a parte inferior do peitoral."
  },
  {
    "name": "Crucifixo",
    "description": "Isolamento de peitoral realizado com halteres no banco."
  },
  {
    "name": "Crossover",
    "description": "Exercício no cabo para isolamento do peitoral."
  },
  {
    "name": "Agachamento Livre",
    "description": "Exercício composto para quadríceps, glúteos e posteriores."
  },
  {
    "name": "Leg Press",
    "description": "Empurrada de peso com as pernas em máquina, foco em quadríceps e glúteos."
  },
  {
    "name": "Cadeira Extensora",
    "description": "Isolamento para quadríceps."
  },
  {
    "name": "Mesa Flexora",
    "description": "Isolamento para posteriores da coxa."
  },
  {
    "name": "Stiff",
    "description": "Exercício para posteriores e glúteos com barra ou halteres."
  },
  {
    "name": "Desenvolvimento Militar",
    "description": "Exercício para ombros com barra ou halteres acima da cabeça."
  },
  {
    "name": "Elevação Lateral",
    "description": "Isolamento de deltoides laterais."
  },
  {
    "name": "Elevação Frontal",
    "description": "Isolamento de deltoides anteriores."
  },
  {
    "name": "Remada Alta",
    "description": "Trabalha trapézio e deltoides."
  },
  {
    "name": "Rosca Direta",
    "description": "Exercício clássico de bíceps com barra ou halteres."
  },
  {
    "name": "Rosca Martelo",
    "description": "Foco em bíceps braquial e braquiorradial."
  },
  {
    "name": "Rosca Scott",
    "description": "Isolamento de bíceps em banco Scott."
  },
  {
    "name": "Tríceps Corda",
    "description": "Exercício no pulley com corda para tríceps."
  },
  {
    "name": "Tríceps Testa",
    "description": "Exercício de tríceps com barra ou halteres."
  },
  {
    "name": "Mergulho (Dips)",
    "description": "Exercício composto de tríceps e peitoral inferior."
  },
  {
    "name": "Puxada Aberta",
    "description": "Exercício para dorsais na polia alta."
  },
  {
    "name": "Puxada Fechada",
    "description": "Foco no latíssimo com pegada neutra ou supinada."
  },
  {
    "name": "Remada Curvada",
    "description": "Exercício composto para costas, feito com barra."
  },
  {
    "name": "Remada Unilateral",
    "description": "Remada com halteres, foco unilateral."
  },
  {
    "name": "Levantamento Terra",
    "description": "Exercício composto para toda a cadeia posterior."
  },
  {
    "name": "Abdominal Supra",
    "description": "Exercício clássico para reto abdominal."
  },
  {
    "name": "Prancha",
    "description": "Exercício isométrico para core."
  },
  {
    "name": "Abdominal Infra",
    "description": "Exercício para porção inferior do abdômen."
  },
  {
    "name": "Abdominal Oblíquo",
    "description": "Foco nos músculos oblíquos do abdômen."
  },
  {
    "name": "Panturrilha em Pé",
    "description": "Exercício para gastrocnêmio e sóleo."
  },
  {
    "name": "Panturrilha Sentado",
    "description": "Foco maior no sóleo."
  }
]


for (let index = 0; index < data.length; index++) {
    createExercise(data[index].name, data[index].description)
}