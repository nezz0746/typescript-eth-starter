import classNames from "classnames";
import React, { useEffect, useState } from "react";
import useGreeter from "../hooks/useGreeter";
import withLiveContracts, { WithLiveContractsProps } from "./WithLiveContracts";

const Greeter = ({ chainId }: WithLiveContractsProps) => {
  const {
    greet: { value, update, loading },
  } = useGreeter(chainId);
  const [val, setVal] = useState(value?.toString());

  const submit = async () => {
    if (val) {
      await update(val);
    }
  };

  useEffect(() => {
    if (value) {
      setVal(value.toString());
    }
  }, [value]);

  return (
    <div>
      <div className="border p-4 rounded-md bg-white shadow-xl flex flex-row">
        <input
          type="text"
          value={val}
          placeholder="Type here"
          onChange={(e) => {
            setVal(e.target.value);
          }}
          className="input input-bordered w-full max-w-xs"
        />
        <button
          type="submit"
          className={classNames({
            "btn btn-primary ml-2": true,
            loading,
          })}
          onClick={submit}
        >
          Greet
        </button>
      </div>
    </div>
  );
};

export default withLiveContracts(Greeter);
