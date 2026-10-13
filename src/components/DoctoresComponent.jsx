import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'
import DetallesComponent from './DetallesComponent';

export default class DoctoresComponent extends Component {

    url = Global.urlApiDoctores;

    state = {
        doctores: [],
        idDoctorSeleccionado: 0
    }

    loadDoctoresHospital = () => {
        let request = "api/doctores/doctoreshospital/" + this.props.idhospital;

        axios.get(this.url + request).then((response) => {
            console.log("Leyendo doctores");

            this.setState({
                doctores: response.data
            })
        })
    }

    /* También se puede hacer así (y cambiar el botón del return)
    buscarDoctor = (idDoctor) => {
        this.setState({
            idDoctorSeleccionado: idDoctor
        })
    }*/

    componentDidMount = () => {
        this.loadDoctoresHospital();
    }

    componentDidUpdate = (oldProps) => {
        if (oldProps.idhospital != this.props.idhospital) {
            this.loadDoctoresHospital();
        }
    }

    render() {
        return (
            <div>
                <h1>
                    Doctores del hospital {this.props.idhospital}
                </h1>
                <table className="table">
                    <thead className="table-primary">
                        <tr>
                            <th>Apellido</th>
                            <th>Especialidad</th>
                            <th>Salario</th>
                            <th>Hospital</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.doctores.map((doc, index) => {
                                return (<tr key={index}>
                                    <td>{doc.apellido}</td>
                                    <td>{doc.especialidad}</td>
                                    <td>{doc.salario}</td>
                                    <td>{doc.idHospital}</td>
                                    <td>
                                        {/** Este botón es para la función de buscarDoctor
                                        <button
                                            onClick={() => this.buscarDoctor(doc.idDoctor)}
                                        >Detalles</button>*/}
                                        <button onClick={() => {
                                            this.setState({ idDoctorSeleccionado: doc.idDoctor })
                                        }} className="btn btn-secondary btn-sm">Detalles</button>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table >
                {
                    this.state.idDoctorSeleccionado !== 0 &&
                    <DetallesComponent idDoctor={this.state.idDoctorSeleccionado} />
                }
            </div >
        )
    }
}