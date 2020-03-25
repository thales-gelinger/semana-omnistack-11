import React, { useEffect, useState } from 'react'
import { FiPower, FiTrash2 } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";

import './styles.css'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Profile() {

    const [incidents, setIncidents] = useState([])
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    const history = useHistory()
    const headers = {
        Authorization: ongId
    }

    useEffect(async () => {
        const { data } = await api.get('/profiles', { headers })
        console.log(data)
        setIncidents(data)

    }, [ongId])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`/incidents/${id}`, { headers })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert('Erro ao deletar o caso, tente novamente')
        }
    }

    function handleLogout() {
        localStorage.clear()

        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="logo"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
               {incidents.map( incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>incident.description</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
               ))}
            </ul>
        </div>
    )
}
