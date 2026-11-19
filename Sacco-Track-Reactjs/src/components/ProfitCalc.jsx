import { Link } from "react-router-dom"
import { useState } from "react";

export default function ProfitCalc () {
    const [vehicles, setVehicles] = useState(10);
    const [dailyTarget, setDailyTarget] = useState(2500);
    const [dailyExpenses, setDailyExpenses] = useState(500);
    const [workingDays, setWorkingDays] = useState(26);
    const [leakage, setLeakage] = useState(10);

  
    const totalRevenue = vehicles * dailyTarget * workingDays

    
    const lostIncome = totalRevenue * (leakage/100);

    const totalExpenses = vehicles * dailyExpenses * workingDays;

    const currentProfit = totalRevenue - lostIncome - totalExpenses;

    
    const zeroLeakageProfit = totalRevenue - totalExpenses;
    
   
    const formatMoney = (amount) =>
        amount.toLocaleString("en-KE", {
            style: "currency",
            currency: "KES"
        });
    return (
       <div className="calculator-page">
        <Link to="/" className="back-link">Back to Home</Link>
        <h1>PROFIT CALCULATOR</h1>
        <p>Calculate your Sacco's estimated profit</p>
     <div className="calculator-layout">
        <div className="calculator-workspace">
       <div className="calculator-form">
         <label>Number of Vehicles</label>
         <input
           type="number"
           min="0"
           value={vehicles}
           onChange={(e) => setVehicles(Number(e.target.value))}
         />
        <label>Daily target per vehicle(KES)</label>
        <input
          type="number"
          min="0"
          value={dailyExpenses}
          onChange={(e)=>setDailyExpenses(Number(e.target.value))}
        />
        <label>Estimated leakage(%)</label>
        <input
          type="number"
          max="100"
          value={leakage}
          onChange={(e)=>setLeakage(Number(e.target.value))}
        />
        </div>
        <div className="calculator-results">
            <h2>Financial Summary</h2>
            <p>
                Anticipated Revenue:
                <strong>{formatMoney(totalRevenue)}</strong>
            </p>
            <p>
                Approximate Leakage:
                <strong>{formatMoney(lostIncome)}</strong>
            </p>
            <p>
                Total Expenses:
                <strong>{formatMoney(totalExpenses)}</strong>
            </p>
            <hr />
            <p>
                Approximate profit after leakage:
                <strong>{formatMoney(currentProfit)}</strong>
            </p>
            <p>
                Profit without leakages:
                <strong>{formatMoney(zeroLeakageProfit)}</strong>
            </p>
        </div>

        </div>

        <div className="calculator-instructions">
            <h2>How the profit calculator works:</h2>
            <p>This calculator estimates your Sacco's revenue, expenditure, leakages and potential profit<br /> 
                <strong>Zero Leakages is a best-case scenario and is not guaranteed</strong>
            </p>
            <h3>How to use it:</h3>
            <p>1. Enter the number of vehicles in your fleet</p>
            <p>2. Set your daily revenue target for each vehicle</p>
            <p>3. Enter estimated income leakage percentage</p>
            <p>4. Review your financial summary</p>
        </div>
        </div>

       </div>
    );
}