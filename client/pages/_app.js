import 'bootstrap/dist/css/bootstrap.css';

import buildClient from '../api/build-client';
import HeaderComponent from '../components/header.component';

const AppComponent = ({ Component, pageProps, data: { currentUser } }) => {
  console.log('from App componenet as current user ');
  return (
    <div>
      {console.log(currentUser)}
      <HeaderComponent currentUser={currentUser} />

      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const objToReturn = {};
  try {
    const { data } = await buildClient(appContext.ctx).get(
      '/api/users/currentuser'
    );

    objToReturn.data = data;
  } catch (err) {
    objToReturn.err = err.response.data.errors[0].message;
    objToReturn.data = {};
  }
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  objToReturn.pageProps = pageProps;
  console.log(objToReturn);

  return objToReturn;
};

export default AppComponent;
