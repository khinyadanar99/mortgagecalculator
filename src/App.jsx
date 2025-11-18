import { Container, Grid } from "@mui/material";

import { useState, useEffect } from "react";

import Form from "./Form";
import Result from "./Result";

export default function App() {
	const [purchase, setPurchase] = useState(0);
	const [deposit, setDeposit] = useState(0);
	const [principal, setPrincipal] = useState(0);
	const [interest, setInterest] = useState(1);
	const [years, setYears] = useState(1);
	const [mortgage, setMortgage] = useState("Fixed");

	const mortgageTypes = [
		{
		value: "Fixed",
		label: "Fixed Rate",
		},
		{
		value: "Adjustable",
		label: "Adjustable Rate",
		},
		{
		value: "Interest",
		label: "Interest-Only",
		},
	];

	function calculatePayment(principal, interest, years, mortgage) {
		const monthlyRate = interest / 100 / 12;
		const numberOfPayments = years * 12;

		let totalMonthly = 0;
		let totalInterest = 0;
		let totalLoan = 0;

		if (mortgage === "Interest") {
		totalMonthly = principal * monthlyRate;
		totalInterest = totalMonthly * numberOfPayments;
		totalLoan = principal + totalInterest;
		} else {
		totalMonthly =
			(principal * monthlyRate) /
			(1 - Math.pow(1 + monthlyRate, -numberOfPayments));
		totalLoan = totalMonthly * numberOfPayments;
		totalInterest = totalLoan - principal;
		}

		return {
		totalMonthly: totalMonthly || 0,
		totalInterest: totalInterest || 0,
		totalLoan: totalLoan || 0,
		};
  	}

  const total = calculatePayment(principal, interest, years, mortgage);

  useEffect(() => {
    setPrincipal(purchase - deposit);
  }, [purchase, deposit]);

  useEffect(() => {
	const savedPurchase = localStorage.getItem("purchase");
	const savedDeposit = localStorage.getItem("deposit");
	const savedPrincipal = localStorage.getItem("principal");
	const savedInterest = localStorage.getItem("interest");
	const savedYears = localStorage.getItem("years");
	const savedMortgage = localStorage.getItem("mortgage");
	if(savedPurchase) setPurchase(savedPurchase);
	if(savedDeposit) setDeposit(savedDeposit);
	if(savedPrincipal) setPrincipal(savedPrincipal);
	if(savedInterest) setInterest(savedInterest);
	if(savedYears) setYears(savedYears);
	if(savedMortgage) setMortgage(savedMortgage);
  }, []);

//   const handlePrincipalChange = (e) => {
//     const newPrincipal = Number(e.target.value);
//     setPrincipal(newPrincipal);
//     setDeposit(purchase - newPrincipal);
//   };

//   const handleDepositChange = (e) => {
//     const newDeposit = Number(e.target.value);
//     if (newDeposit < 0) {
//       setDeposit(0);
//     } else {
//       setDeposit(newDeposit);
// 	  setPrincipal
//     }
//   };

  return (
    <div>
	
    <Container maxWidth="md">
        <h1 style={{textAlign: "center"}}>Mortgage Calculator</h1>
        <Grid container spacing={2}>
          	<Grid size={{ xs: 12, md: 6 }}>
				<Form
					purchase = {purchase}
					setPurchase = {setPurchase}
					deposit = {deposit}
					setDeposit = {setDeposit}
					principal = {principal}
					setPrincipal = {setPrincipal}
					interest = {interest}
					setInterest = {setInterest}
					years = {years}
					setYears = {setYears}
					mortgage = {mortgage}
					setMortgage = {setMortgage}
					mortgageTypes = {mortgageTypes}>
				</Form>
          	</Grid>
          	<Grid size={{ xs: 12, md: 6 }}>
				<Result total = {total}></Result>
          	</Grid>
        </Grid>
      </Container>
    </div>
  );
}
