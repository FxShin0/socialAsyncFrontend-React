import { Provider } from "react-redux";
import Routes from "./routes/Routes";
import { GlobalStyles } from "./styles/GlobalStyles";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes></Routes>
        <GlobalStyles></GlobalStyles>
      </Provider>
    </>
  );
}

export default App;
