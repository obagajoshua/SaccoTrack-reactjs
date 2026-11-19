import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Vehicles() {

    const [vehicles, setVehicles] = useState([]);
    const [registration, setRegistration] = useState("");
    const [model, setModel] = useState("");
    useEffect(() => {
        fetch("http://localhost:3000/vehicles")
        .then((response) => response.json())
        .then((data) => setVehicles(data))
        .catch((error) => console.log(error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const newVehicle = {
            registration: registration,
            model: model
        };

        fetch("http://localhost:3000/vehicles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newVehicle)
        })
            .then((response) => response.json())
            .then((data) => {
                setVehicles([...vehicles, data]);
                setRegistration("");
                setModel("");
            })
            .catch((error) => console.log(error));
    }

    function handleDelete(id) {
        fetch(`http://localhost:3000/vehicles/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setVehicles((currentVehicles) =>
                    currentVehicles.filter((vehicle) => vehicle.id !== id)
                );
            })
            .catch((error) => console.log(error));
    }

    return (
    <div className="vehicle-page">
        <Link className="back-link-delete" to="/">Back to Home</Link>
            <h1 className="vehicles-header">Vehicles Registration</h1>
        <div className="vehicle-layout">
            <div className="vehicle-form">
            <form onSubmit={handleSubmit}>
                <input 
                   type="text"
                   placeholder="Plate Number"
                   value={registration}
                   onChange={(e)  => setRegistration(e.target.value)}
                />
                <input 
                   type="text"
                   placeholder="Vehicle Make"
                   value={model}
                   onChange={(e)  => setModel(e.target.value)}
                />
                <button type="submit">ADD VEHICLE</button>
            </form>
        </div>

        <div className="vehicle-instructions">
            <h2>How vehicle registration works</h2>
            <p>Register and manage your fleet here</p>
            <h3>Steps on how it works:</h3>
            <p>1. Enter vehicle plate number</p>
            <p>2. Enter vehicle make</p>
            <p>3. Tap 'ADD VEHICLE' to regiter it</p>
            <p>4. View your registered vehicles below</p>
        </div>
    </div>
           {vehicles.map((vehicle) => (
            <div className="vehicle-records" key={vehicle.id}>
                <h3>{vehicle.registration}</h3>
                <p>{vehicle.model}</p>
                <button className="delete-button" type="button" onClick={() => handleDelete(vehicle.id)}>
                    DELETE
                </button>
            </div>
           ))}
        </div>
    );
}