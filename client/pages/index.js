import buildClient from '../api/build-client';

const landingPage = ({ currentUser, err }) => {
  // console.log(err);
  return currentUser ? (
    <h1> You are signed in </h1>
  ) : (
    <h1> You are not signed in you are {err}</h1>
  );
};

landingPage.getInitialProps = async (context) => {
  console.log('from index ');
  try {
    const { data } = await buildClient(context).get('/api/users/currentuser');
    return data;
  } catch (err) {
    console.log(err.response.data.errors[0].message);
    return { err: err.response.data.errors[0].message };
  }
};

export default landingPage;
