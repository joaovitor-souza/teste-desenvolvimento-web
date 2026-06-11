<script setup>
import { ref } from 'vue'
import { obterDados } from '../services/api'
// console.log('Olá')

const carros = ref([])
const motores = ref([])
// console.log(carros)
obterDados().then(dados => {
  carros.value = dados.carros
  motores.value = dados.motores
})

function getMotor(motor_id) {
  return motores.value.find(motor => motor.id === motor_id)
}

function excluirCarro(carro) {
  carros.value = carros.value.filter(
    item => item.id !== carro.id
  )

  motores.value = motores.value.filter(
    motor => motor.id !== carro.motor_id
  )
}
// inclusao

const marca = ref('')
const modelo = ref('')
const cor = ref('')

const litragem = ref('')
const cilindros = ref('')

function adicionarCarro() {
  if (
    !marca.value ||
    !modelo.value ||
    !cor.value ||
    !litragem.value ||
    !cilindros.value
  ) {
    alert('Preencha todos os campos')
    return
  }
  const novoMotor = {
    id: motores.value.length + 1,
    posicionamento_cilindros: 'linha',
    cilindros: Number(cilindros.value),
    litragem: Number(litragem.value),
    observacao: null
  }

  motores.value.push(novoMotor)

  const novoCarro = {
    id: carros.value.length + 1,
    marca: marca.value,
    modelo: modelo.value,
    cor: cor.value,
    motor_id: novoMotor.id
  }

  carros.value.push(novoCarro)
  marca.value = ''
  modelo.value = ''
  cor.value = ''

  litragem.value = ''
  cilindros.value = ''
}

</script>

<template>
  <div class="greetings">
    <div>
      <div>
        <input v-model="marca" placeholder="Marca" required>

        <input v-model="modelo" placeholder="Modelo" required>

        <input v-model="cor" placeholder="Cor" required>

        <input v-model="litragem" placeholder="Litragem" required>

        <input v-model="cilindros" placeholder="Cilindros" required>

        <button @click="adicionarCarro">
          Adicionar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Cor</th>
            <th>Motor</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="carro in carros" :key="carro.id">
            <td>
              {{ carro.marca }}
            </td>
            <td>
              {{ carro.modelo }}
            </td>
            <td>
              {{ carro.cor }}
            </td>
            <td v-if="getMotor(carro.motor_id)">
              Motor: {{ getMotor(carro.motor_id).litragem }}cc -
              {{ getMotor(carro.motor_id).cilindros }} cilindros
            </td>
            <td>
              <button @click="excluirCarro(carro)">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
