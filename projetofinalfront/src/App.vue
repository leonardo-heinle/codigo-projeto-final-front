<template>
  <div id="app">

  <nav>
    <div class="nav-wrapper blue darken-1">
      <a href="#" class="brand-logo center">Cadastro de Ações</a>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#formulario">Cadastrar</a></li>
        <li><a href="#dados">Tabela de Ações</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </div>
  </nav>
    <img alt="Vue logo" src="./assets/logo.png">

    <div id="sobre">
      <h1>Sobre a ferramenta</h1>
      <p>Com o Cadastro de Ações você consegue cadastrar qualquer ação de qualquer empresa ou classe
      de ativos listados na B3 e salvá-los em um banco de dados temporariamente e vizualizá-los em uma tabela.</p>
      <p>É possível inserir dados específicos como o Código de Negociação, o Setor que a empresa atua e
      a porcentagem de Dividend Yield que a empresa distribui aos seus acionistas, bem como é possível
      filtrar e alterar os dados de maneira simples e rápida!</p>
    </div>
    <!--SAVE-->
    <!--SAVE-->

    <form id="formulario" @submit.prevent="saveAndUpdateStock">
      <h1>Cadastro de Ações</h1>
      <div>
        <input type="text" v-model="stock.company" placeholder="Digite o nome da empresa">
      </div>
      <div>
        <input type="text" v-model="stock.negociationCode" placeholder="Digite o código de negociação B3">
      </div>
      <div>
        <input type="text" v-model="stock.sector" placeholder="Digite o setor que a empresa atua">
      </div>
      <div>
        <input type="text" v-model="stock.stockType" placeholder="Informe a classe de Ação">
      </div>
      <div>
        <input type="number" step="0.01" min="0" v-model="stock.dividendYield"  placeholder="Informe o Dividend Yield">
      </div>
      <button class="waves-effect waves-light btn-small light-blue accent-3">Salvar</button>
      <button v-show="stock.id" @click="cancelUpdate" class="waves-effect waves-light btn-small light-blue accent-3">Cancelar</button>
    </form>

    <!--SAVE-->
    <!--SAVE-->

    <!--FINDBYID-->
    <!--FINDBYID-->
    {{stock.id}}
    <form @submit.prevent="findById">
      <div>
        <input type="text" v-model="stock.id"  placeholder="Digite o ID que deseja buscar">
      </div>
      <button class="waves-effect waves-light btn-small light-blue accent-3 ">Filtrar</button>
    </form>

    <div v-show="findStock.id">
      <h1>Ativo encontrado</h1>
      <p>
        ID: {{findStock.id}} <br>
        Empresa: {{findStock.company}} <br>
        Código de negociação: {{findStock.negociationCode}} <br>
        Setor: {{findStock.sector}} <br>
        Tipo de Ação: {{findStock.stockType}} <br>
        Dividend Yield: {{findStock.dividendYield}} % <br>
      </p>
    </div>
    <!--FINDBYID-->
    <!--FINDBYID-->

<!--FINDALL-->
<!--FINDALL-->
    <p>Quantidade de ações: {{stocks.length}}</p>
    <table v-show="stocks.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Empresa</th>
          <th>Código de Negociação</th>
          <th>Setor</th>
          <th>Tipo de Ação</th>
          <th>Dividend Yield</th>
          <th>Excluir</th>
          <th>Alterar</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>ID</th>
          <th>Empresa</th>
          <th>Código de Negociação</th>
          <th>Setor</th>
          <th>Tipo de Ação</th>
          <th>Dividend Yield</th>
          <th>Excluir</th>
          <th>Alterar</th>
        </tr>
      </tfoot>
      <tbody id="dados">
        <tr v-for="stock in stocks" :key="stock.id">
          <td>{{stock.id}}</td>
          <td>{{stock.company}}</td>
          <td>{{stock.negociationCode}}</td>
          <td>{{stock.sector}}</td>
          <td>{{stock.stockType}}</td>
          <td>{{stock.dividendYield}} %</td>
          <td>
            <button type="button" @click="deleteStock(stock)" class="waves-effect waves-light btn-small blue darken-4">Excluir</button>
          </td>
          <td>
            <button type="button" @click="updateStock(stock)" class="waves-effect waves-light btn-small light-blue accent-3">Alterar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!--FINDALL-->
    <!--FINDALL-->

    <div id="about">
      <h2>Autor</h2>
      <p>Leonardo Heinle</p>
      <p>Desenvolverdor Web</p>
      <p>E-mail: contatoplayerx@gmail.com</p>
      <p><a href="https://github.com/leonardo-heinle" class="waves-effect btn-small light-blue accent-">GITHUB</a></p>

    </div>
  </div>
</template>

<script>
import StockServices from './services/stockservices'

export default {
  data() {
    return {
      stock : {
        id: '',
        company: '',
        negociationCode: '',
        sector: '',
        stockType: '',
        dividendYield: ''
      },
      findStock : {
        id: '',
        company: '',
        negociationCode: '',
        sector: '',
        stockType: '',
        dividendYield: ''
      },
      stocks: []
    }
  },
  name: 'App',
  components: {
  },
  mounted() {
    this.listStocks();
  },
  methods: {
    listStocks() {
      StockServices.findAll().then(response => {
        this.stocks = response.data;
      });
    },
    saveAndUpdateStock() {
      if(!this.stock.id) {
        StockServices.save(this.stock).then(response => {
          this.listStocks();
          this.stock = {};
          alert("Ativo adicionado com sucesso!");
          return response;
        });
      } else {
        //atualizar
        StockServices.update(this.stock).then(response => {
          this.listStocks();
          this.stock = {};
          alert("Ativo atualizado com sucesso!");
          return response;
        });
      }
    },
    deleteStock(stock) {
      if(confirm("Deseja excluir o ativo?")) {
        StockServices.delete(stock).then(response => {
          this.listStocks();
          alert("Ativo excluido com sucesso!");
          return response;
        });
      }
    },
    findById() {
      StockServices.findById(this.stock).then(response => {
        this.findStock = response.data;
      });
    },
    updateStock(stock) {
      this.stock = stock;
    },
    cancelUpdate() {
      this.stock = {};
      this.listStocks();
      alert("Alteração cancelada!");
    }
  }
}
</script>

<style>
#sobre {
  margin-left: 300px;
  margin-top: 10px;
  margin-right: 300px;
  background-color: #f5f5f5;
  border-radius: 5px;
}
#about {
  margin-left: 300px;
  margin-top: 10px;
  margin-right: 300px;
  background-color: #f5f5f5;
  border-radius: 5px;
}
h1 {
  font-size: 20px;
}
h2 {
  font-size: 32px;
}
button {
  margin: 10px;
}
form {
  margin-left: 400px;
  margin-top: 10px;
  margin-right: 400px;
  background-color: #f5f5f5;
  border-radius: 5px;
}
td {
  background-color: #f5f5f5;
}
thead, tfoot {
  background-color: #bdbdbd;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #00146e;
}
</style>
