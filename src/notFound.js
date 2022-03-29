import { Link } from 'react-router-dom';

const NotFound = () => {
	document.title = 'Tracker | Not Found';
	
	return (
		<div>
			<center>
				<h1 style = {{
					marginBottom: '10px'
				}}><b>404 !! Not Found...</b></h1>
				<Link to="/" style = {{
					fontSize: '25px'
				}}>Home Page</Link>
			</center>
		</div>
	)
}

export default NotFound;