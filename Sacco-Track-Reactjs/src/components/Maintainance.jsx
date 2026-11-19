import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Maintenance() {
    const [records, setRecords] = useState([]);
    const [vehicle, setVehicle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [cost, setCost] = useState("");
    const [nextService, setNextService] = useState("");
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/maintenance")
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

    function addMaintenance(e) {
        e.preventDefault();

        const newRecord = {
            vehicle,
            description,
            date,
            cost: Number(cost),
            nextService
        };

        fetch("http://localhost:3000/maintenance", {
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
                setDescription("");
                setDate("");
                setCost("");
                setNextService("");
            })
            .catch((error) => console.log(error));
    }

    function deleteRecord(id) {
        fetch(`http://localhost:3000/maintenance/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setRecords((currentRecords) =>
                    currentRecords.filter((record) => record.id !== id)
                );
            })
            .catch((error) => console.log(error));
    }

    const totalCost = records.reduce(
        (total, record) => total + Number(record.cost), 0
    );
    return (
        <div className="maintenance-page">
             <Link className="back-link" to="/">Back to Home</Link>
            <h1>MAINTENANCE MANAGEMENT</h1>
            <p>Manage your Sacco vehicle maintenance efficiently with our comprehensive maintenance management system. </p>
           
            <h2>RECORD MAINTENANCE</h2>
            <form onSubmit={addMaintenance}>
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
                  type="text"
                  placeholder="Maintenance description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <label>MAINTENANCE DATE</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Maintenance cost(KES)"
                  min="0"
                  step="0.01"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  required
                />
                <label>Next service date</label>
                <input
                  type="date"
                  value={nextService}
                  onChange={(e) => setNextService(e.target.value)}
                  required
                />
           
            <button type="submit">Add Maintenance Record</button>
            </form>
                <div className="maintenance-summary">
                <p>{records.length}</p>
            <h3>Total maintenance cost</h3>
            <p>KES {totalCost.toLocaleString("en-KE")}</p>
            </div>
            <div className="maintenance-layout">
                <div className="maintenance-workspace">
            <h2>MAINTENANCE RECORDS</h2>
            {records.length === 0 ? (
                <p>No records yet</p>
            ):(
                records.map((record) => (
                    <div
                      key={record.id}
                      className="maintenance-card">
                        <h3>{record.vehicle}</h3>
                        <p>Work: {record.description}</p>
                        <p>Date: {record.date}</p>
                        <p>Cost: KES {record.cost.toLocaleString("en-KE")}</p>
                        <p>Next service: {record.nextService}</p>
                        <button
                             className="delete-button"
                             type="button"
                             onClick={() => deleteRecord(record.id)}>
                                DELETE
                        </button>
                    </div>
                ))
            )}
        </div>
    
            
    </div>
        </div>
    );
}