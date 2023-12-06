import { WalletButton } from "../lib/components/WalletButton";
import { Button } from "../lib/main";

function App() {
  return (
    <div className="flex flex-col gap-2 h-screen p-2">
      <div className="flex flex-row gap-2">
        <Button size="sm">Submit</Button>
        <Button size="sm" variant="primary">
          Submit
        </Button>
        <Button size="sm" variant="secondary">
          Submit
        </Button>
        <Button size="sm" disabled>
          Submit
        </Button>
        <Button size="sm" loading>
          Submit
        </Button>
      </div>
      <div className="flex flex-row gap-2">
        <Button>Submit</Button>
        <Button variant="primary">Submit</Button>
        <Button variant="secondary">Submit</Button>
        <Button disabled>Submit</Button>
        <Button loading>Submit</Button>
      </div>
      <div className="flex flex-row gap-2">
        <WalletButton address="0x2D232d68E797C2cB7430000bF2Eff2a9A9F908f1" />
      </div>
    </div>
  );
}

export default App;
