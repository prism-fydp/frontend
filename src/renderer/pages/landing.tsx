import Typography from '@mui/material/Typography';
import NavOverlay from '../components/nav_overlay';
import logo from '../../../assets/logo.svg';
// import Signup from './signup';
import Trybutton from '../components/try';
import SearchBar from '../components/search';
import Paths from './paths';

export default function Home() {
  return (
    <NavOverlay hideHomeButton>
      <div>
        <div className="Hello">
          <img width="200px" alt="logo" src={logo} />
        </div>
        <SearchBar />
        <Typography color="#000000" variant="h1" component="div" gutterBottom>
          Own your content, Own Yourself
        </Typography>
        <Typography color="#000000" variant="h3" gutterBottom component="div">
          The essential Web3 platform for writing and reading anything
        </Typography>
        <Trybutton routepath={Paths.SIGNUP} buttonText="Try PRISM" />
        <Trybutton routepath={Paths.LOGIN} buttonText="Log In" />
        {/* <Signup /> */}
      </div>
    </NavOverlay>
  );
}
// .search {
// 	padding: 0 30px;
// 	font-size: 18px;
// 	width: 60%;
// 	max-width: 400px;
// 	height: 80px;
// 	border: 1px solid darken(white, 30%);
// 	border-radius: 20px 0 0 20px;
// }

// className={styles.button}
// onClick={() => connect(setUserAddress)}
