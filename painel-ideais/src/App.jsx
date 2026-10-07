import { useState } from "react"

export default function App() {
    const [ideias, setIdeias] = useState([])
    const [novaIdeia,setNovaIdeia] = useState("")
    const [erro, setErro] = useState("")

    function adicionarIdeia(){
        const ideiaCriada = {id: Date.now(), texto: novaIdeia, feita: false}

        setIdeias([...ideias, ideiaCriada])
    }

    // valida o campo e só adiciona se houver texto
    function aoEnviar(event){
        event.preventDefault()
        
        if (novaIdeia.trim() === "") {
            setErro("Digite sua ideia antes de adicionar.")
            return
        }

        adicionarIdeia()
        setNovaIdeia("")
        setErro("")
    }

    // cria um array novo, sem mutar o estado
    function mudarParaFeita(id){
        setIdeias(ideias.map(ideia => {
            if(ideia.id === id){
                return {...ideia, feita: !ideia.feita}
            }

            return ideia
        }))
    }

    function removerIdeia(id){
        setIdeias(ideias.filter(ideia => ideia.id !== id))
    }

    return (
        <>    
            <h1>Painel de Ideias</h1>

            <form onSubmit={aoEnviar}>
                <input 
                    type="text"
                    value={novaIdeia}
                    onChange={(event) => {
                        setNovaIdeia(event.target.value)
                        setErro("")
                    }}
                />

                <button type="submit">Enviar</button>
            </form>

            {erro && <p className="erro">{erro}</p>}

            <ul>
                    {ideias.map(ideia => (
                        <li key={ideia.id}>
                            <input 
                                type="checkbox"
                                checked={ideia.feita}
                                onChange={() => mudarParaFeita(ideia.id)}
                            />

                            <span className={ideia.feita ? "riscado" : ""}>{ideia.texto}</span>

                            <button onClick={() => removerIdeia(ideia.id)}>✕</button>
                        </li>
                    ))}
            </ul>

            <p>{`${ideias.length} ideias no painel · ${ideias.filter(ideia => ideia.feita).length} concluídas`}</p>
        </>
    )
}
