import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>CSR ASSET TRACKER</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-asset" style={{ 
          color: 'white', 
          padding: '10px',
          backgroundColor: '#f1356d',
          borderRadius: '8px',
        }}>Add CSR Asset</Link>
        <Link to="/track-asset" style={{ 
          color: 'white', 
          padding: '10px',
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>Track CSR Asset</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;