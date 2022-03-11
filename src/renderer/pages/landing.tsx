import Typography from '@mui/material/Typography';
import logo from '../../../assets/logo.svg';
import Trybutton from '../components/try';
import Paths from './paths';

export default function Landing() {
  return (
    <>
      <div>
        <div style={{ position: 'absolute', left: 32, top: 32 }}>
          <img width="64px" alt="logo" src={logo} />
        </div>
        <div style={{ position: 'absolute', right: 32, top: 32 }}>
          <Trybutton routepath={Paths.LOGIN} buttonText="Sign In" />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography color="#000000" variant="h3" component="div" gutterBottom>
            Own Your Content, Own Yourself
          </Typography>
          <div style={{ width: 425 }}>
            <Typography
              color="#000000"
              variant="h5"
              gutterBottom
              component="div"
            >
              The essential Web3 platform for writing and reading anything
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: 350,
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            <Trybutton routepath={Paths.SIGNUP} buttonText="Try Prism" />
            <Trybutton routepath={Paths.SEARCH} buttonText="Search Now" />
          </div>
        </div>
      </div>
    </>
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
