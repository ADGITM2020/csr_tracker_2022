import Navbar from './Navbar';
import NotFound from './notFound';
import Home from './Home';
import AddParcel from './components/addParcel';
import TrackAsset from './components/TrackAsset';
import ParcelDetail from './components/parcelDetail';
import RealtimeTrack from './components/realtimeTrack';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
        <img src={'/static/logo.png'} alt="sih_logo" width="400" height="120" style={{marginLeft:'475px', marginTop:'25px'}} />
      <div className="content">
      <Switch>
      	<Route exact path="/">
      		<Home />
      	</Route>
      	<Route path="/add-asset">
      		<AddParcel />
      	</Route>
        <Route path="/get-detail/:keyId">
      		<ParcelDetail />
      	</Route>
        <Route path="/track-asset">
      		<TrackAsset />
      	</Route>
        <Route path="/real-time-track">
      		<RealtimeTrack />
      	</Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
