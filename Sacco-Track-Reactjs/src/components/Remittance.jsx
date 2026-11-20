import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Remittances() {
    const [records, setRecords] = useState([]);
    const [vehicle, setVehicle] = useState("");
    const [expected, setExpected] = useState("");
    const [actual, setActual] = useState("");
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/remittances")
        .then((response) => response.json())
        .then((data) => setRecords(data))
        .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        fetch("http://localhost:3000/vehicles")
        .then((response) => response.json())
        .then((data) => setVehicles(data))
        .catch((error) => console.log(error));
    }, []);

    

    function addRemittance(e) {
        e.preventDefault();

        const difference = Number(expected) - Number(actual);
        const newRecord = {
            id: Date.now(),
            vehicleId: vehicle,
            expected: Number(expected),
            actual: Number(actual),
            difference
        };

        fetch("http://localhost:3000/remittances", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecord)
        })
        .then((response) => response.json())
        .then((data) => {
            setRecords((currentRecords) => [...currentRecords, data]);
            setVehicle("");
            setExpected("");
            setActual("");
        })
        .catch((error) => console.log(error));
    }

    function deleteRemittance(id) {
        fetch(`http://localhost:3000/remittances/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            setRecords((currentRecords) =>
                currentRecords.filter((record) => record.id !== id)
            );
        })
        .catch((error) => console.log(error));
    }

    return (
        <div className="remittance-page">
            <Link to="/">Back to Home</Link>
            <h1>REMITTANCE MANAGEMENT</h1>
            <p>Manage your daily Sacco remittances efficiently with our comprehensive remittance management system!</p>
            <div className="remittance-layout">
                <div className="remittance-worksapce">
                    <form onSubmit={addRemittance}>
                        <select  
                          value={vehicle}
                          onChange={(e) => setVehicle(e.target.value)}
                          required>
                        <option value="">Select registered vehicle</option>
                        {vehicles.map((item) => (
                            <option key={item.id} 
                                    value={item.id}>
                                        {item.registration}
                                    </option>
                        ))}
                        </select>

                        <input
                            type="number"
                            placeholder="Anticipated return"
                            min="0"
                            value={expected}
                            onChange={(e) => setExpected(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Actual income received"
                            min="0"
                            value={actual}
                            onChange={(e) => setActual(e.target.value)}
                            required
                        />

                        <button type="submit">RECORD REMITTANCE</button>
                    </form>
                </div>
                <div className="remmittance-instructions">
                    <h2>HOW REMITTANCE WORKS</h2>
                    <p>Remittance tracking helps your Sacco monitor daily collections from your fleet enhancing accountability</p>
                    <h3>Remittance guide</h3>
                    <p>1. Enter the vehicle plate number</p>
                    <p>2. Enter the anticipated daily remittance</p>
                    <p>3. Enter the actual amount received</p>
                    <p>4. Tap 'RECORD REMITTANCE'</p>

                    <h3>Understanding the results; </h3>
                    <p>Shortfall means the vehicle remitted less than anticipated</p>
                    <p>Excess means the vehicle remitted more than anticipated</p>
                    <p>Fully remitted means the anticipated amount was received.</p>
                </div>
            </div>
            <h2>Remittance records</h2>
            {records.map((record) => (
                <div key={record.id} className="remittance-card">
                    <h3>{vehicles.find( v => v.id === record.vehicleId)?.registration 
                               || "vehicle not found"}</h3>
                    <p>Anticipated: KES{record.expected}</p>
                    <p>Received: KES{record.actual}</p>
                    <p>
                        {record.difference > 0 ? `Shortfall: KES ${record.difference}`
                        : record.difference < 0 ? `Excess: KES ${Math.abs(record.difference)}`
                        : "Fully remitted"}
                    </p>

                    <button onClick={() => deleteRemittance(record.id)}>DELETE</button>
                </div>
            ))}
        </div>
    );
}
