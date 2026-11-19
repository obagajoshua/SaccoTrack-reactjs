import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSacco } from "../context/SaccoContext";
export default function Vehicles() {
    
    const { saccos, setSaccos } = useSacco();
    const [vehicles, setVehicles] = useState([]);
    const [registration, setRegistration] = useState("");
    const [model, setModel] = useState("");
    const [saccoName, setSaccoName] = useState("");
    const [saccoReg, setSaccoReg] = useState("");
    const [selectedSacco, setSelectedSacco] = useState("");

    
    useEffect(() => {
        fetch("http://localhost:3000/vehicles")
        .then((response) => response.json())
        .then((data) => setVehicles(data))
        .catch((error) => console.log(error));
    }, []);


    function handleSaccoSubmit(e) {
        e.preventDefault();
        const saccoData = {
            name: saccoName,
            registrationNumber: saccoReg
        };
        fetch("http://localhost:3000/sacco", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(saccoData)
        })
        .then((response) => response.json())
        .then((data) => {
            setSaccos((current) =>[...current, data]);

            setSaccoName("")
            setSaccoReg("")
            alert("Your Sacco details are saved!");
        })
        .catch((error) => console.log(error));
    }
    function handleSubmit(e) {
        e.preventDefault();

        const newVehicle = {
            registration: registration,
            model: model,
            saccoId: selectedSacco
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
                setSelectedSacco("");
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
        <h1>Sacco registration</h1>
        <div className="sacco-profile">
        
            <h2>Sacco info</h2>
            <form onSubmit={handleSaccoSubmit}>
                <input
                 type="text"
                 placeholder="Name of Sacco"
                 onChange={(e) => setSaccoName(e.target.value)}
                 required/>

                <input 
                 type="text"
                 placeholder="Your Sacco registration number"
                 onChange={(e) => setSaccoReg(e.target.value)}
                 required
                 />

                 <button type="submit">Save Sacco Details</button>
            </form>
        </div>
            <h1 className="vehicles-header">Vehicles Registration</h1>
        <div className="vehicle-layout">
            <div className="vehicle-form">
                
            <form onSubmit={handleSubmit}>
                
                <select 
                  value={selectedSacco}
                  onChange={(e) => setSelectedSacco(e.target.value)}
                  required
                  >
                    <option value="">Select a registered Sacco</option>
                    {saccos.map((sacco) => (
                        <option key={sacco.id} value={sacco.id}>
                            {sacco.name}
                        </option>
                    ))}
                  </select>
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

                <button type="submit">ADD SACCO & VEHICLE</button>
            </form>
        </div>

        <div className="vehicle-instructions">
            <h2>How Sacco & vehicle registration works</h2>
            <p>Register and manage your fleet here</p>
            <h3>Steps on how it works:</h3>
            <p>1. Register your Sacco by it's name and it's registration number</p>
            <p>2. Enter vehicle plate number</p>
            <p>3. Enter vehicle make</p>
            <p>4. Tap 'ADD VEHICLE' to register it</p>
            <p>5. View your registered vehicles below</p>
        </div>
    </div>
           {vehicles.map((vehicle) => (
            <div className="vehicle-records" key={vehicle.id}>
                <h3>{vehicle.registration}</h3>
                <p>{vehicle.model}</p>
                <p>SACCO: {saccos.find((sacco) => String(sacco.id) ===
                   String(vehicle.saccoId))?.name || "not assigned"}</p>
                <button className="delete-button" type="button" onClick={() => handleDelete(vehicle.id)}>
                    DELETE
                </button>
            </div>
           ))}
        </div>
    );
}