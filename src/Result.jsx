import {
    Button,
	Card,
	CardContent,
	Divider,
	Stack,
} from "@mui/material";

export default function Result({total}) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <div style={{textAlign: "center"}}>
                    <h2>Monthly Payment</h2>
                    <p style={{fontSize: 2.5 + "em", fontWeight: "bold", margin: 0}}>£{total.totalMonthly.toFixed(2) || "Invalid"}</p>
                    <p>An approximate monthly repayment amount</p>
                </div>
            
                <Divider />

                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mt: 2}}>
                    <h3 style={{margin: 0}}>Total Interest Paid</h3>
                    <span style={{fontSize: 1.17 + "em"}}><b>£{total.totalInterest.toFixed(2)}</b></span>
                </Stack>

                <p style={{mt: 0.5 + "em"}}>Interest Cost Over the Loan Terms</p>

                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mt: 5 }}>
                    <h3 style={{margin: 0}}>Total Loan Paid</h3>
                    <span style={{fontSize: 1.17 + "em"}}><b>£{total.totalLoan.toFixed(2)}</b></span>
                </Stack>
                
                <p style={{mt: 0.5 + "em"}}>Total amount paid over the loan term</p>

            </CardContent>
        </Card>
    )
}