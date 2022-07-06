import { useState, useEffect } from "react";
import { Toolbar, Grid, MenuItem, TextField, alpha, Card, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import Search from "@mui/icons-material/Search";
import { fDateShort } from "src/components/Controls/formatUtils";

import { useDispatch, useSelector } from "src/redux/Store";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import LoopIcon from '@mui/icons-material/Loop';

import { useSearchParams } from 'react-router-dom';

const CustomToolbar = (props) => {
	const { toolBar, rows, setRows, url, filterUrl = '/Customer', fn, page= 1, limit= 10 } = props;
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

	const dispatch = useDispatch()

	const handleSearchClick = () => {
		dispatch(fn(process.env.REACT_APP_API+`${filterUrl}?clientId=1`+urlgen()))
	}
	
	const handleResetClick = () => {
		setValues({})
		dispatch(fn(process.env.REACT_APP_API+`${filterUrl}?clientId=1`))
	}
	//&page=${page}&limit=${limit}

	const urlgen = () => {
		const urls=[url]
		const l = toolBar.map(({field})=>{
			 urls.push(field+'='+values[field])
		})
		return urls.join('&')
	} 


	// const tryUrl = new URL(process.env.REACT_APP_API+filterUrl)
	// console.log(tryUrl.searchParams.append('page', page))

	return (
		<Card
			sx={{
				mb: 2,
				// pl: { sm: 2 },
				// pr: { xs: 1, sm: 1 },
				p: 2
				// bgcolor: (theme) =>
				// alpha(
				// 	theme.palette.primary.main,
				// 	theme.palette.action.activatedOpacity
				// ),
			}}
		>
			<Grid container spacing={2} >
				{toolBar.map((val, index) => {
				return (
					<Grid
						item
						lg={toolBar.length > 4 ? 3 : 10 / toolBar.length}
						md={toolBar.length > 3 ? 4 : 10 / toolBar.length}
						sm={toolBar.length > 2 ? 6 : 10 / toolBar.length}
						xs={12}
						// sx={{ mt: { lg: 2, md: 1, xs: 1 }, mb: { lg: 2, md: 1, xs: 1 } }}
						key={index}
					>
						{
						val.type != 'date' ?
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
							size='small'
							// variant='standard'
							
						>
							{val.type === "select" &&
							val.options.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						:
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<DesktopDatePicker
                                inputFormat="yyyy-MM-DD"
                                value={values[val.field] || new Date()}
                                name={val.field}
                                onChange={
                                    (e)=>{
                                        setValues(
                                            ({...values})=>{
                                                values[val.field]=fDateShort(e)
                                                return values
                                            }
                                        )
                                    }
                                }
                                renderInput={(params) => 
                                    <TextField 
                                        size="small" 
                                        fullWidth 
                                        {...params} 
                                    />
                                }
                            />
						</LocalizationProvider>
						}
					</Grid>
				);
				})}
				<Grid xs={toolBar.length % 2 == 0 ? 6 : 3}  sm={'auto'}  item>
					<Button
						variant="contained"
						size='small'
						sx={{height: '100%', width: '100%'}}
						endIcon={<Search  />}
						onClick={handleSearchClick}
					>
						Search
					</Button>
				</Grid>
				<Grid xs={toolBar.length % 2 == 0 ? 6 : 3}  sm={'auto'}  item>
					<Button
						variant="contained"
						size='small'
						sx={{height: '100%', width: '100%'}}
						endIcon={<LoopIcon  />}
						onClick={handleResetClick}
					>
						Reset
					</Button>
				</Grid>
			</Grid>
		</Card>
  	);
};
export default CustomToolbar;
