import React from "react";

class Joker extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            pergunta: "abreu"
        }

    } // fim do constructor


    options = [
        { "key": "a", "text": "Jack" },
        { "key": "b", "text": "Mushu" },
        { "key": "c", "text": "Liu" },
        { "key": "d", "text": "Lee" }
    ]

    perguntas = [
        {pergunta: "Como se chama a amiga de Wall-E?"},
        {pergunta: "ewrtyuikjythr"},
        {pergunta: "wrettyuyiytre se chama a amiga de Wall-E?"},
        {pergunta: "Como se chwreytuytuytre Wall-E?"},
        {pergunta: "Compapabento-E?"},
    ]
    
    obtemPergunta() {
        const pAleatoria = Math.floor(Math.random * 5)
        let pergunta = this.perguntas[pAleatoria].pergunta


        this.setState((state) => {
            state.pergunta = pergunta
        })
    }

    render() {
        return (
            <div>
                <section className="titulo"></section>

                <section className="jokers"></section>

                <section className="perguntas">
                    <p>{this.state.pergunta}</p>
                    {
                        this.options.map(o => (
                            <button key={o.key} onClick={() => this.obtemPergunta()}>{o.text}</button>
                        ))
                    }
                </section>

                <section className="pontos"></section>  

            </div>
        )
    }
}

export default Joker