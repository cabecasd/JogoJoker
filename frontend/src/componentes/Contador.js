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
    
        this.ws.addEventListener('open',  () => {
          this.ws.send('something');
        });
    
        this.ws.addEventListener('message', (event) => {
          if (event.data === 'update') {
            this.fetchContador()
          }

        });
      }

    handleButtonClick() {


        fetch('/api/contador', { method: 'POST' })

            .then(() => this.fetchContador())
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