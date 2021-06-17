import React from "react";

class Contador extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            contador: 0,
        }
        this.ws = new WebSocket('ws://localhost:8081')

    } // fim do constructor

    componentDidMount() {
        this.fetchContador()
        // this.intervalId = setInterval(this.fetchMessages, 2000)
    
        this.ws.addEventListener('message', (event) => {
          if (event.data === 'update') {
            this.fetchContador()
          }

        });
      }

    handleButtonClick() {


        fetch('/api/contador', { method: 'POST' })

    }
    
    fetchContador() {
        fetch('/api/contador', { method: 'GET' })

                .then(response => response.json())
                .then(json => this.setState({
                    contador: json.contador
                }))
    }

    render() {
        return (
            <div>
                <p>{this.state.contador}</p>
                <button onClick={() => this.handleButtonClick()}>Incrementa</button>
            </div>
        )
    }
}

export default Contador


/*

1- clica botao
2- api express vai incrementar em 1
3- api express vai procurar o valor na base de dados e retornar
4- this.setstate (contador: o valor retornado)

*/