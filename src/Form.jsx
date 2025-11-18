import {
	InputAdornment,
	Card,
	CardContent,
	TextField,
	Tooltip,
	IconButton,
	MenuItem,
    Button,
    Stack,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function Form({
    purchase,
    setPurchase,
    deposit,
    setDeposit,
    principal,
    setPrincipal,
    interest,
    setInterest,
    years,
    setYears,
    mortgage,
    setMortgage,
    mortgageTypes
}) {

    const handleInputChange = (e) => {
        const newInput = Number(e.target.value);
        if (newInput < 0) {
            return 0;
        } else {
            return newInput;
        }
    }

    const handleReset = () => {
        setPurchase(0);
        setDeposit(0);
        setPrincipal(0);
        setInterest(0);
        setYears(1);
        setMortgage("Fixed");
    } 

    return (
        
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <TextField
                label="Purchase Price"
                type="number"
                value={purchase}
                onChange={(e) => {
                    setPurchase(handleInputChange(e));
                    localStorage.setItem("purchase", handleInputChange(e));
                }}
                variant="outlined"
                fullWidth
                />

                <TextField
                label="Deposit (£)"
                type="number"
                value={deposit}
                onChange={(e) => {
                    setDeposit(handleInputChange(e));
                    setPrincipal({purchase}-{deposit});
                    localStorage.setItem("deposit", handleInputChange(e));
                    localStorage.setItem("principal", {purchase}-{deposit});
                }}
                fullWidth
                margin="normal"
                />

                <TextField
                label="Loan Amount (£) "
                type="number"
                value={principal}
                onChange={(e) => {
                    setPrincipal(handleInputChange(e));
                    setDeposit({purchase}-{principal});
                    localStorage.setItem("principal", handleInputChange(e));
                    localStorage.setItem("deposit", {purchase}-{principal});
                }}
                fullWidth
                margin="normal"
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <Tooltip
                        title="The loan amount you need to borrow after subtracting your deposit from the purchase price."
                        placement="top"
                        arrow
                        >
                        <IconButton size="small">
                            <InfoOutlinedIcon fontSize="small" color="action" />
                        </IconButton>
                        </Tooltip>
                    </InputAdornment>
                    ),
                }}
                />

                <TextField
                label="Interest Rate (%)"
                type="number"
                value={interest}
                onChange={(e) => {
                    setInterest(handleInputChange(e));
                    localStorage.setItem("interest", handleInputChange(e));
                }}
                inputProps={{ step: "0.01", min: "0" }}
                variant="outlined"
                fullWidth
                margin="normal"
                />

                <TextField
                label="Loan Term (Years)"
                type="number"
                value={years}
                onChange={(e) => {
                    setYears(handleInputChange(e));
                    localStorage.setItem("years", handleInputChange(e));
                }}
                variant="outlined"
                fullWidth
                margin="normal"
                />

                <TextField
                id="outlined-select-type"
                select
                label="Mortgage Type"
                defaultValue={mortgage}
                fullWidth
                margin="normal"
                value={mortgage}
                onChange={(e) => {
                    setMortgage(e.target.value);
                    localStorage.setItem("mortgage", e.target.value);
                }}
                >
                {mortgageTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>

                <Stack direction="row" sx={{ justifyContent: "flex-end", mt: 2 }}>
                    <Button variant="contained" size="medium" color="error" onClick={handleReset}>Reset All</Button>
                </Stack>

            </CardContent>
        </Card>
    )
}