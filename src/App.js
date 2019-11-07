import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
    const [techs, setTechs] = useState([]);
    const [newTech, setNewTech] = useState('');

    // evitar a recriação de funções sempre que o estado mudar.
    const handleAdd = useCallback(() => {
        setTechs([...techs, newTech]);
        setNewTech('');
    }, [newTech, techs]);

    // executado na montagem do componente.
    useEffect(() => {
        const techsArray = localStorage.getItem('techs');

        if (techsArray) {
            setTechs(JSON.parse(techsArray));
        }
    }, []);

    // executado na montagem e sempre que o array techs mudar
    useEffect(() => {
        localStorage.setItem('techs', JSON.stringify(techs));
    }, [techs]);

    // valor recalculado sempre que techs mudar;
    const techsSize = useMemo(() => techs.length, [techs]);

    return (
        <>
            <ul>
                {techs.map(tech => (
                    <li key={tech}>{tech}</li>
                ))}
            </ul>
            <strong>Você tem {techsSize} tecnologias</strong>
            <br />
            <input value={newTech} onChange={e => setNewTech(e.target.value)} />
            <button type="button" onClick={handleAdd}>
                Adicionar
            </button>
        </>
    );
}

export default App;
