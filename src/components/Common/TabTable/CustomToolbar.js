import { useState, useEffect } from "react";
import { Toolbar, Grid, MenuItem, TextField, alpha } from "@mui/material";
import { useTranslation } from "react-i18next";
import useFetch from "../../../hooks/useFetch";

const CustomToolbar = (props) => {
	const { toolBar, rows, setRows, url } = props;
	const {t} = useTranslation()
	const [values, setValues] = useState({});
	useEffect(() => {
		const obj = toolBar.reduce((accumulator, value) => {
			return { ...accumulator, [value.field]: "" };
		}, {});
		setValues(obj);
	}, [toolBar]);

	const handleChange = (e) => {
		setValues(({ ...values }) => {
			values[e.target.name] = e.target.value;
			return values;
		});
	};
	console.log((values))

	const urlgen = () => {
		const urls=[url]
		const l = toolBar.map(({field})=>{
			 urls.push(field+'='+values[field])
		})
		return urls.join('&')
	} 

	console.log(urlgen())

	const [data, loading] = useFetch(urlgen())
	useEffect(()=>{
		setRows(data)
	},[data])

	return (
		<Toolbar
			sx={{
				mb: 2,
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				bgcolor: (theme) =>
				alpha(
					theme.palette.primary.main,
					theme.palette.action.activatedOpacity
				),
			}}
		>
			<Grid container spacing={2}>
				{toolBar.map((val, index) => {
				return (
					<Grid
						item
						lg={12 / toolBar.length}
						xs={toolBar.length > 3 ? 4 : 12 / toolBar.length}
						sx={{ mt: { lg: 2, md: 1, xs: 1 }, mb: { lg: 2, md: 1, xs: 1 } }}
						key={index}
					>
						<TextField
							fullWidth
							id="outlined-select-currency"
							select={val.type === "select"}
							label={t(`labels.${val.placeholder}`)}
							name={val.field}
							value={values[val.field] || ""}
							onChange={(e) => {
								handleChange(e);
							}}
						>
							{val.type === "select" &&
							val.options.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
				);
				})}
			</Grid>
		</Toolbar>
  	);
};
export default CustomToolbar;
