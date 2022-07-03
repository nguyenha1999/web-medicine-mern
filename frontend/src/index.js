import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
