import OpenGraphHead from "../components/Misc/OpenGraphHead";
import Landing from "../components/Landing";
import Campaigns from "../components/Campaigns";

const fundETH = () => {
  return (
    <>
      <OpenGraphHead
        title="Home | FundEth Blockchain Crowdfunding with Ethereum"
        type="website"
        url="https://fundeth.in/"
      />
      <Landing />
      <Campaigns />
    </>
  );
};

export default fundETH;
